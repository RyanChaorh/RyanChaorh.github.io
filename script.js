import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

//***********加载字体class
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
//***********加载文字图形class
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'



/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')

//font loader
//初始化 FontLoader class
const fontLoader = new FontLoader()

//加载字体进来
fontLoader.load(
    '/fonts/Berkeley Mono Variable Italic_Regular.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'hello Three JS', {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5, //利用线框图查看图形是否太多poly，降低这个segment值来提升性能
                bevelEnabled: true, //斜角
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4 //利用线框图查看图形是否太多poly，降低这个segment值来提升性能
            }
        )

        // textGeometry.computeBoundingBox()
        // textGeometry.translate(-(textGeometry.boundingBox.max.x - 0.02) * 0.5, -(textGeometry.boundingBox.max.y - 0.02) * 0.5, -(textGeometry.boundingBox.max.z - 0.02) * 0.5, )
        //     //textGeometry.boudingBox.max.x|y|z 相当于它本身的一半,所以移动它的负值就可以居中了
        //     //减去的0.02代表的bevelSize，斜角大小，这是为了精确
        //     //console.log(textGeometry.boundingBox) 可以利用这个看他的max和min值确认位置

        textGeometry.center() //这一个center方法代表上面的所有步骤

        // const material = new THREE.MeshMatcapMaterial({
        //     matcap: matcapTexture
        // })
        const material = new THREE.MeshNormalMaterial()
        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)

        //添加圈
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)

        for (let i = 0; i < 100; i++) {

            const donut = new THREE.Mesh(donutGeometry, material)
                //随机位置
            donut.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10)
                //随机旋转角度
            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI
                //随机大小
            const scale = Math.random()
            donut.scale.set(scale, scale, scale)
            scene.add(donut)
        }
    }
)

/**
 * Object
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
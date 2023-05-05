#!/bin/bash

# 指定需要修改文件名的目录
dir_path="/path/to/directory"

# 进入目录
cd "$dir_path"

# 遍历目录下所有文件
for file in *; do
  # 判断是否为文件
  if [ -f "$file" ]; then
    # 获取文件名和扩展名
    filename=$(basename "$file")
    extension="${filename##*.}"
    # 修改文件名
    mv "$file" "${filename%.*}_tn.$extension"
  fi
done

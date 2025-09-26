#!/bin/bash

# Cấu hình
PROJECT_ROOT="$(pwd)"
SRC_DIR="$PROJECT_ROOT/src"
OUTPUT_FILE="$PROJECT_ROOT/PROJECT_CODE.md"
GITIGNORE_FILE="$PROJECT_ROOT/.gitignore"

# Các extension file code cần quét (có thể thêm/bớt theo nhu cầu)
CODE_EXTENSIONS=("js" "jsx" "ts" "tsx" "vue" "py" "java" "php" "rb" "go" "rs" "cpp" "c" "h" "css" "scss" "sass" "less" "html" "xml" "json" "yaml" "yml" "sh" "sql" "md")

# Các file quan trọng ở thư mục gốc cần đọc thêm (loại bỏ những file không cần thiết)
ROOT_FILES=("server.js" "app.js" "index.js" "main.js" "package.json" "tsconfig.json" "webpack.config.js" "vite.config.js" "next.config.js" "nuxt.config.js" "vue.config.js" "angular.json" "composer.json" "requirements.txt" "Dockerfile" "docker-compose.yml" "README.md")

# Đọc .gitignore và tạo danh sách pattern để bỏ qua
declare -a GITIGNORE_PATTERNS=()

read_gitignore() {
    if [ -f "$GITIGNORE_FILE" ]; then
        echo "📋 Đọc .gitignore để bỏ qua các file không cần thiết..."

        while IFS= read -r line || [[ -n "$line" ]]; do
            # Bỏ qua dòng trống và comment
            if [[ -n "$line" && ! "$line" =~ ^[[:space:]]*# && ! "$line" =~ ^[[:space:]]*$ ]]; then
                # Loại bỏ khoảng trắng đầu cuối
                line=$(echo "$line" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
                GITIGNORE_PATTERNS+=("$line")
                echo "  🚫 Bỏ qua pattern: $line"
            fi
        done < "$GITIGNORE_FILE"
    else
        echo "ℹ️  Không tìm thấy file .gitignore"
    fi
}

# Hàm kiểm tra xem file có bị gitignore không
is_ignored() {
    local file_path="$1"
    local relative_path="${file_path#$PROJECT_ROOT/}"

    # Bỏ qua một số file/folder phổ biến luôn
    case "$relative_path" in
        "node_modules/"*|"node_modules") return 0 ;;
        ".git/"*|".git") return 0 ;;
        "dist/"*|"build/"*|"out/"*) return 0 ;;
        ".env"|".env.local"|".env.production"|".env.development") return 0 ;;
        "package-lock.json"|"yarn.lock"|"pnpm-lock.yaml") return 0 ;;
        "*.log"|"*.tmp"|"*.cache") return 0 ;;
        ".DS_Store"|"Thumbs.db") return 0 ;;
    esac

    # Kiểm tra với các pattern trong .gitignore
    for pattern in "${GITIGNORE_PATTERNS[@]}"; do
        # Xử lý pattern đơn giản với wildcards
        if [[ "$relative_path" == $pattern ]] || [[ "$relative_path" =~ ^${pattern//\*/.*}$ ]] || [[ "$relative_path" == *"$pattern"* ]]; then
            return 0
        fi

        # Kiểm tra nếu file nằm trong thư mục bị ignore
        if [[ "$pattern" == */ ]] && [[ "$relative_path" == ${pattern}* ]]; then
            return 0
        fi
    done

    return 1
}

# Hàm lấy language cho syntax highlighting dựa trên extension
get_language() {
    local file_ext="$1"
    case "$file_ext" in
        "js"|"jsx") echo "javascript" ;;
        "ts"|"tsx") echo "typescript" ;;
        "py") echo "python" ;;
        "java") echo "java" ;;
        "php") echo "php" ;;
        "rb") echo "ruby" ;;
        "go") echo "go" ;;
        "rs") echo "rust" ;;
        "cpp"|"c"|"h") echo "cpp" ;;
        "css") echo "css" ;;
        "scss"|"sass") echo "scss" ;;
        "less") echo "less" ;;
        "html") echo "html" ;;
        "xml") echo "xml" ;;
        "json") echo "json" ;;
        "yaml"|"yml") echo "yaml" ;;
        "sh") echo "bash" ;;
        "sql") echo "sql" ;;
        "md") echo "markdown" ;;
        "vue") echo "vue" ;;
        *) echo "text" ;;
    esac
}

# Hàm kiểm tra xem file có phải là file code không
is_code_file() {
    local file="$1"
    local extension="${file##*.}"

    # Kiểm tra extension có trong danh sách không
    for ext in "${CODE_EXTENSIONS[@]}"; do
        if [ "$extension" = "$ext" ]; then
            return 0
        fi
    done
    return 1
}

# Hàm xử lý file ở thư mục gốc
process_root_files() {
    echo "📂 Đang xử lý các file quan trọng ở thư mục gốc..."

    # Thêm section header cho root files
    {
        echo "## 📁 Root Files"
        echo
        echo "> Các file cấu hình và entry points quan trọng của dự án"
        echo
    } >> "$OUTPUT_FILE"

    local root_file_count=0

    for root_file in "${ROOT_FILES[@]}"; do
        local file_path="$PROJECT_ROOT/$root_file"

        if [ -f "$file_path" ] && ! is_ignored "$file_path"; then
            echo "📄 Đang xử lý root file: $root_file"

            # Lấy extension để xác định ngôn ngữ
            local extension="${root_file##*.}"
            local language=$(get_language "$extension")

            # Xử lý các trường hợp đặc biệt
            case "$root_file" in
                "package.json"|"composer.json"|"tsconfig.json"|"*.json") language="json" ;;
                "requirements.txt") language="text" ;;
                "Dockerfile") language="dockerfile" ;;
                "docker-compose.yml"|"*.yml"|"*.yaml") language="yaml" ;;
                "README.md") language="markdown" ;;
            esac

            # Thêm vào file markdown
            {
                echo "### $root_file"
                echo
                echo "\`\`\`$language"
                cat "$file_path"
                echo
                echo "\`\`\`"
                echo
            } >> "$OUTPUT_FILE"

            ((root_file_count++))
        elif [ -f "$file_path" ]; then
            echo "🚫 Bỏ qua root file (gitignore): $root_file"
        fi
    done

    if [ $root_file_count -eq 0 ]; then
        {
            echo "*Không tìm thấy file nào trong danh sách root files (hoặc tất cả đã bị gitignore).*"
            echo
        } >> "$OUTPUT_FILE"
    fi

    return $root_file_count
}

# Tạo header cho file markdown
create_header() {
    cat > "$OUTPUT_FILE" << EOF
# Project Code Documentation

> 📄 File này được tạo tự động từ script \`generate_project_code.sh\`
>
> 🕐 Thời gian tạo: $(date '+%Y-%m-%d %H:%M:%S')
>
> 🚫 Tự động bỏ qua các file trong .gitignore và các file không cần thiết

---

EOF
}

echo "🚀 Bắt đầu quét code trong dự án: $PROJECT_ROOT"
echo "📝 Tạo file: $OUTPUT_FILE"

# Đọc .gitignore trước
read_gitignore

# Tạo header
create_header

# Xử lý các file ở thư mục gốc trước
process_root_files
root_files_processed=$?

# Kiểm tra thư mục src có tồn tại không
if [ ! -d "$SRC_DIR" ]; then
    echo "⚠️  Không tìm thấy thư mục src, chỉ xử lý root files"
    src_exists=false
else
    src_exists=true
    # Thêm section header cho src files
    {
        echo "## 📁 Source Code (src/)"
        echo
        echo "> Code chính của dự án trong thư mục src"
        echo
    } >> "$OUTPUT_FILE"
fi

# Đếm số file đã xử lý
file_count=0
ignored_count=0

# Chỉ quét src nếu thư mục tồn tại
if [ "$src_exists" = true ]; then
    echo "📂 Đang quét code trong thư mục: $SRC_DIR"

    # Quét tất cả file trong thư mục src (bao gồm thư mục con)
    while IFS= read -r -d '' file; do
        # Kiểm tra xem file có bị gitignore không
        if is_ignored "$file"; then
            ((ignored_count++))
            continue
        fi

        # Kiểm tra xem có phải file code không
        if is_code_file "$file"; then
            # Lấy đường dẫn tương đối từ project root
            relative_path="${file#$PROJECT_ROOT/}"

            # Lấy extension để xác định ngôn ngữ
            extension="${file##*.}"
            language=$(get_language "$extension")

            echo "📄 Đang xử lý: $relative_path"

            # Thêm vào file markdown
            {
                echo "### $relative_path"
                echo
                echo "\`\`\`$language"
                cat "$file"
                echo
                echo "\`\`\`"
                echo
            } >> "$OUTPUT_FILE"

            ((file_count++))
        fi
    done < <(find "$SRC_DIR" -type f -print0 | sort -z)
fi

# Thêm footer
{
    echo "---"
    echo
    echo "📊 **Tổng kết:**"
    echo "- 📁 Root files: $root_files_processed file"
    echo "- 📂 Source files: $file_count file"
    echo "- 🚫 Files bỏ qua: $ignored_count file"
    echo "- 🔢 **Tổng cộng xử lý: $((root_files_processed + file_count)) file**"
    echo
    echo "🔄 Để cập nhật file này, chạy lại: \`./generate_project_code.sh\`"
} >> "$OUTPUT_FILE"

total_files=$((root_files_processed + file_count))
echo "✅ Hoàn thành! Đã tạo $OUTPUT_FILE với $total_files file ($root_files_processed root + $file_count src)"
echo "🚫 Đã bỏ qua $ignored_count file theo .gitignore và rules"
echo "📖 Mở file để xem: code $OUTPUT_FILE"
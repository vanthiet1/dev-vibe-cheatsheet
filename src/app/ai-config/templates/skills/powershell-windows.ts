export function getPowershellWindowsTemplate(
  formattedSlug: string,
  languageLabel: string,
  isVi: boolean
): string {
  if (isVi) {
    return `# Kỹ năng Tự động hóa qua PowerShell Windows (${formattedSlug})

## 1. Nguyên lý Thiết kế Cốt lõi
- **Verb-Noun Syntax:** Luôn tuân thủ quy chuẩn đặt tên lệnh chuẩn của Microsoft: Động từ - Danh từ (ví dụ: \`Get-Process\`, \`Get-Service\`).
- **Pipeline-First:** Tận dụng tối đa pipeline để truyền nhận dữ liệu dạng đối tượng (objects) thay vì phân tích chuỗi text thô.
- **Không phá hủy (Idempotency):** Đảm bảo script có thể chạy đi chạy lại nhiều lần một cách an toàn mà không làm hỏng cấu trúc hệ thống.

## 2. Tiêu chuẩn Cú pháp & Định kiểu
- Khai báo tham số tường minh qua khối \`Param()\` và sử dụng thuộc tính định kiểu chặt chẽ (ví dụ: \`[string]\`, \`[int]\`).
- Sử dụng các chú thích trợ giúp chuẩn XML (Comment-Based Help) cho mọi hàm để người dùng dễ dàng xem hướng dẫn bằng lệnh \`Get-Help\`.
- Tránh viết tắt alias (như \`ls\`, \`dir\`, \`wget\`) trong script chính để đảm bảo tính dễ đọc và tương thích cao.

## 3. Xử lý Bất đồng bộ & Luồng Dữ liệu
- Sử dụng PowerShell Jobs (\`Start-Job\`) hoặc các Runspaces bất đồng bộ cho các tác vụ tốn thời gian để tránh treo terminal.
- Quản lý luồng xuất dữ liệu (Pipeline streams) rõ ràng: phân tách Output, Error, Warning, và Verbose streams.
- Luôn kiểm soát việc đóng các luồng dữ liệu (Streams, File Readers) và session sau khi thực thi xong.

## 4. Tối ưu hóa Hiệu năng Chuyên sâu
- Lọc dữ liệu sớm nhất có thể ngay tại nguồn (ví dụ: dùng bộ lọc trong \`Get-Content\` thay vì truyền toàn bộ qua pipeline rồi mới lọc).
- Sử dụng cấu trúc mảng \`[System.Collections.Generic.List[T]]\` thay vì cộng mảng thủ công \`+=\` để tối ưu hóa bộ nhớ RAM.
- Giới hạn kích thước dữ liệu tải về khi gọi các API hệ thống bằng các tham số phân trang.

## 5. Cơ chế Bảo mật & Làm sạch Đầu vào
- Thiết lập Execution Policy an toàn (\`Set-ExecutionPolicy RemoteSigned\`) và ký số script trước khi phân phối trong doanh nghiệp.
- Không bao giờ hardcode mật khẩu, token bí mật dưới dạng văn bản thô. Bắt buộc dùng \`SecureString\` hoặc lưu trữ qua Azure Key Vault.
- Làm sạch và kiểm tra chặt chẽ các tham số truyền từ bên ngoài để phòng tránh lỗ hổng chèn lệnh độc hại (Script Injection).

## 6. Kiến trúc & Bố trí Thư mục
- Tổ chức script theo mô hình Module PowerShell chuẩn chỉ để dễ dàng đóng gói, tái sử dụng và chia sẻ:
  \`\`\`
  ├── MyModule/
  │   ├── MyModule.psd1     # Tệp tin Manifest chứa Metadata
  │   ├── MyModule.psm1     # Tệp tin Script chứa Code chính
  │   └── Private/          # Các hàm phụ trợ nội bộ
  \`\`\`

## 7. Mẫu Code Ví dụ Thực tế chuẩn Production
\`\`\`powershell
#<
.SYNOPSIS
    Script PowerShell tự động hóa sao lưu thư mục dự án và kiểm tra sức khỏe hệ thống.
.DESCRIPTION
    Script này thực hiện nén dữ liệu dự án, kiểm tra dung lượng ổ đĩa khả dụng và xuất báo cáo trạng thái.
.PARAMETER SourcePath
    Đường dẫn thư mục nguồn cần sao lưu.
.PARAMETER DestinationPath
    Đường dẫn thư mục lưu trữ file backup (.zip).
#>
Param (
    [Parameter(Mandatory=$true)]
    [ValidateScript({Test-Path $_ -PathType Container})]
    [string]$SourcePath,

    [Parameter(Mandatory=$true)]
    [string]$DestinationPath
)

$ErrorActionPreference = "Stop"

Try {
    Write-Verbose "Starting health check: Inspecting disk space..."
    $Drive = Get-PSDrive -Name ($DestinationPath.Split(":")[0])
    $FreeSpaceGB = [Math]::Round($Drive.Free / 1GB, 2)

    if ($FreeSpaceGB -lt 5) {
        Write-Warning "Low disk space alert! Only $FreeSpaceGB GB remaining on target drive."
    }

    # Tạo thư mục đích nếu chưa tồn tại
    if (-not (Test-Path $DestinationPath)) {
        New-Item -ItemType Directory -Path $DestinationPath -Force | Out-Null
    }

    $Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $ZipFile = Join-Path $DestinationPath "Backup_$Timestamp.zip"

    Write-Host "Compressing directory $SourcePath to $ZipFile..." -ForegroundColor Cyan
    Compress-Archive -Path $SourcePath -DestinationPath $ZipFile -Force

    Write-Host "Backup completed successfully!" -ForegroundColor Green
    return [PSCustomObject]@{
        Success = $true
        ArchiveFile = $ZipFile
        FreeSpaceGB = $FreeSpaceGB
    }
} Catch {
    Write-Error "Backup processing failed: $_"
    return [PSCustomObject]@{
        Success = $false
        Error = $_.Exception.Message
    }
}
\`\`\`

## 8. Quy trình Kiểm thử & Mocking
- Viết test suites kiểm thử tự động cho PowerShell script bằng Pester framework (\`*.Tests.ps1\`).
- Mock các lệnh tương tác hệ thống phức tạp (như \`Restart-Computer\` hoặc \`Remove-Item\`) để đảm bảo an toàn khi chạy thử nghiệm.
- Kiểm tra tính đúng đắn của cấu trúc dữ liệu trả về sau khi thực thi hàm.

## 9. Kiểm soát Ngoại lệ & Sửa lỗi
- Sử dụng khối Try/Catch bắt buộc để bọc mọi tác vụ tương tác hệ thống nhạy cảm (Disk, Registry, Network).
- Cấu hình biến đặc biệt \`$ErrorActionPreference = "Stop"\` ở đầu script để biến các lỗi non-terminating thành terminating exceptions dễ kiểm soát.
- Xuất chi tiết thông tin lỗi thông qua biến toàn cục \`$Error[0]\` và ghi nhật ký lỗi vào Event Viewer của Windows.

## 10. Tự động hóa qua Dòng lệnh CLI & CI/CD
- Chạy phân tích cú pháp tĩnh và kiểm tra chất lượng script PowerShell bằng PSScriptAnalyzer qua CLI:
  \`\`\`powershell
  Invoke-ScriptAnalyzer -Path .\MyScript.ps1
  \`\`\`
- Tích hợp kiểm thử tự động qua GitHub Actions bằng Windows Runner để tự động xác minh script trước khi phân phối.`;
  } else {
    return `# PowerShell Windows Automation Guidelines (${formattedSlug})

## 1. Core Design Principles
- **Verb-Noun Syntax:** Strictly follow standard Microsoft cmdlet naming patterns: Verb-Noun (e.g. \`Get-Process\`, \`New-Item\`).
- **Pipeline-First:** Prioritize sending rich object pipelines between cmdlets rather than printing raw text blocks.
- **Idempotency:** Write automated scripts to run repeatedly without causing side effects or system degradation.

## 2. Syntax & Typing Standards
- Enforce parameters definitions inside standard \`Param()\` blocks, typing inputs strictly (e.g. \`[string]\`, \`[int]\`).
- Embed XML Comment-Based Help patterns above every function to natively support \`Get-Help\` commands.
- Ban shorthand command aliases (like \`ls\`, \`dir\`, \`wget\`) inside production files to maintain readability.

## 3. Async & Data Flow Management
- Leverage PowerShell Jobs (\`Start-Job\`) or asynchronous Runspaces for time-consuming background operations.
- Separate pipeline streams cleanly, isolating standard Output, Error, Warning, and Verbose pipes.
- Close connection pools, system handles, and active sessions securely inside finally blocks.

## 4. Deep Performance Optimization
- Filter early in pipeline pipelines, constraining resources at sources (e.g., using cmdlet filters rather than filtering downstream).
- Rely on modern collection types \`[System.Collections.Generic.List[T]]\` instead of array reassignment (\`+=\`) to conserve memory.
- Enforce page restrictions when retrieving datasets from remote enterprise directory domains.

## 5. Security & Input Sanitization
- Secure script operations via RemoteSigned script Execution Policies, digitally signing script files for enterprise deployments.
- Ban hardcoded system passwords, storing credentials as encrypted \`SecureString\` variables or using vaults.
- Sanitize arguments strictly to block malicious command injections in command contexts.

## 6. Layout Architecture & Folder Structure
- Maintain clean modular file structures, partitioning configurations using standard manifests:
  \`\`\`
  ├── MyModule/
  │   ├── MyModule.psd1     # Module manifest metadata
  │   ├── MyModule.psm1     # Module primary execution logic
  │   └── Private/          # Subroutine scripts folder
  \`\`\`

## 7. Production-Ready Code Example
\`\`\`powershell
#<
.SYNOPSIS
    High-fidelity PowerShell script for directory backup and Windows health auditing.
.DESCRIPTION
    Performs compressed backups, checks target drive storage limits, and prints results.
.PARAMETER SourcePath
    Absolute path to directory being backed up.
.PARAMETER DestinationPath
    Directory output path storing the compressed backup (.zip).
#>
Param (
    [Parameter(Mandatory=$true)]
    [ValidateScript({Test-Path $_ -PathType Container})]
    [string]$SourcePath,

    [Parameter(Mandatory=$true)]
    [string]$DestinationPath
)

$ErrorActionPreference = "Stop"

Try {
    Write-Verbose "Starting health check: Inspecting disk space..."
    $Drive = Get-PSDrive -Name ($DestinationPath.Split(":")[0])
    $FreeSpaceGB = [Math]::Round($Drive.Free / 1GB, 2)

    if ($FreeSpaceGB -lt 5) {
        Write-Warning "Low disk space alert! Only $FreeSpaceGB GB remaining on target drive."
    }

    # Ensure target output directory exists
    if (-not (Test-Path $DestinationPath)) {
        New-Item -ItemType Directory -Path $DestinationPath -Force | Out-Null
    }

    $Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $ZipFile = Join-Path $DestinationPath "Backup_$Timestamp.zip"

    Write-Host "Compressing directory $SourcePath to $ZipFile..." -ForegroundColor Cyan
    Compress-Archive -Path $SourcePath -DestinationPath $ZipFile -Force

    Write-Host "Backup completed successfully!" -ForegroundColor Green
    return [PSCustomObject]@{
        Success = $true
        ArchiveFile = $ZipFile
        FreeSpaceGB = $FreeSpaceGB
    }
} Catch {
    Write-Error "Backup processing failed: $_"
    return [PSCustomObject]@{
        Success = $false
        Error = $_.Exception.Message
    }
}
\`\`\`

## 8. Testing & Mocking Strategy
- Construct testing scripts utilizing the standard Pester framework (\`*.Tests.ps1\`).
- Mock active operating system actions (such as \`Restart-Computer\` or file modifications) to run tests safely.
- Verify pipeline object structures and returned attributes under mock test runs.

## 9. Robust Exception Handling & Debug Flow
- Embed structural Try-Catch blocks around system I/O, registry modifications, or network socket triggers.
- Enforce \`$ErrorActionPreference = "Stop"\` globally to instantly escalate system failures to catch blocks.
- Output detailed exception diagnostic reports utilizing \`$Error[0]\` to local Windows Event Logs.

## 10. CLI & CI/CD Automation Flow
- Analyze script quality and static syntax styles using PSScriptAnalyzer via CLI runs:
  \`\`\`powershell
  Invoke-ScriptAnalyzer -Path .\MyScript.ps1
  \`\`\`
- Trigger automated script checking tests on target commits inside Windows runners in pipelines.`;
  }
}

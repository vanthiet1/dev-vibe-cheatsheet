import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Category, ICategory } from '@/models/Category';
import { Command } from '@/models/Command';
import { invalidateCache } from '@/lib/dataCache';
import { getClientIp, rateLimit } from '@/lib/rateLimiter';
import { validateApiKey } from '@/lib/security';

export async function GET(request: Request) {
  try {
    const ip = getClientIp(request);
    const limitResult = rateLimit(ip, 'seed', 2, 60 * 1000);

    const rlHeaders = {
      'X-RateLimit-Limit': limitResult.limit.toString(),
      'X-RateLimit-Remaining': limitResult.remaining.toString(),
      'X-RateLimit-Reset': limitResult.resetTime.toString(),
    };

    if (!limitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Thao tác quá nhanh! Vui lòng đợi 1 phút trước khi bấm Đặt lại Database.' },
        { status: 429, headers: rlHeaders }
      );
    }
    // Secure the seed API for both Development and Production environments
    if (!validateApiKey(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: API Key không hợp lệ hoặc bị thiếu!' },
        { status: 401, headers: rlHeaders }
      );
    }

    await dbConnect();

    // 1. Clear existing database collections
    await Category.deleteMany({});
    await Command.deleteMany({});

    // 2. Create categories
    const categories = await Category.create([
      {
        name: 'Git Setup',
        slug: 'git-setup',
        description: 'Cài đặt Git, kiểm tra phiên bản trên các hệ điều hành.',
        icon: 'DownloadOutlined',
        color: '#F05032',
        order: 1
      },
      {
        name: 'Git Config',
        slug: 'git-config',
        description: 'Cấu hình thiết lập ban đầu (username/email, proxy, aliases).',
        icon: 'SettingOutlined',
        color: '#E24A35',
        order: 2
      },
      {
        name: 'GitHub Authentication',
        slug: 'github-auth',
        description: 'Xác thực tài khoản GitHub, quản lý token, SSH và Windows Credential.',
        icon: 'LockOutlined',
        color: '#24292e',
        order: 3
      },
      {
        name: 'Git Remote',
        slug: 'git-remote',
        description: 'Làm việc với kho lưu trữ từ xa (remote repositories) GitHub/GitLab.',
        icon: 'CloudOutlined',
        color: '#1890ff',
        order: 4
      },
      {
        name: 'Git Branch',
        slug: 'git-branch',
        description: 'Quản lý quy trình chia nhánh, gộp nhánh và tái sắp xếp commits (merge/rebase).',
        icon: 'BranchesOutlined',
        color: '#52c41a',
        order: 5
      },
      {
        name: 'Git Stash',
        slug: 'git-stash',
        description: 'Lưu trữ tạm thời (stash) công việc đang dang dở để chuyển nhánh khẩn cấp.',
        icon: 'FolderOpenOutlined',
        color: '#fa8c16',
        order: 6
      },
      {
        name: 'Git Conflicts',
        slug: 'git-conflict',
        description: 'Cách nhận diện và giải quyết xung đột mã nguồn khi gộp nhánh, kéo code.',
        icon: 'AlertOutlined',
        color: '#f5222d',
        order: 7
      },
      {
        name: 'Undo & Reset',
        slug: 'git-undo-reset',
        description: 'Hoàn tác các thay đổi, reset, revert commits và phục hồi code bị mất.',
        icon: 'UndoOutlined',
        color: '#eb2f96',
        order: 8
      },
      {
        name: 'Git Ignore',
        slug: 'git-ignore',
        description: 'Bỏ qua các tệp tin không mong muốn (.gitignore) và xử lý cache Git.',
        icon: 'EyeInvisibleOutlined',
        color: '#8c8c8c',
        order: 9
      },
      {
        name: 'Git Logs & Diff',
        slug: 'git-logs',
        description: 'Truy vết lịch sử commits, so sánh khác biệt mã nguồn và truy tìm tác giả.',
        icon: 'HistoryOutlined',
        color: '#13c2c2',
        order: 10
      },
      {
        name: 'VSCode Integration',
        slug: 'vscode-git',
        description: 'Cách cấu hình, đồng bộ và xử lý lỗi Git trên trình soạn thảo VSCode.',
        icon: 'CodeOutlined',
        color: '#007acc',
        order: 11
      },
      {
        name: 'Common Git Errors',
        slug: 'git-errors',
        description: 'Các lỗi Git thường gặp trong thực tế và cách khắc phục nhanh chóng.',
        icon: 'WarningOutlined',
        color: '#faad14',
        order: 12
      },
      {
        name: 'Practical Workflows',
        slug: 'git-workflows',
        description: 'Quy trình làm việc nhóm chuẩn, quy tắc đặt tên, commit convention và PR.',
        icon: 'BuildOutlined',
        color: '#fa541c',
        order: 13
      },
      {
        name: 'Terminal Basics',
        slug: 'terminal-basics',
        description: 'CMD, PowerShell, Git Bash - các lệnh cơ bản và quản lý hệ thống Windows.',
        icon: 'TerminalOutlined',
        color: '#722ed1',
        order: 14
      },
      {
        name: 'Antigravity CLI',
        slug: 'antigravity-cli',
        description: 'Bảng tra cứu các lệnh gạch chéo (/) cốt lõi trong Antigravity CLI.',
        icon: 'ThunderboltOutlined',
        color: '#13c2c2',
        order: 15
      },
      {
        name: 'Antigravity IDE',
        slug: 'antigravity-ide',
        description: 'Quản lý, cấu hình và phát triển Kỹ năng (Skills) của các Agent trong Antigravity.',
        icon: 'CodeOutlined',
        color: '#00f2fe',
        order: 16
      }
    ]);

    const catMap = categories.reduce((acc: Record<string, string>, cat: ICategory) => {
      acc[cat.slug] = String(cat._id);
      return acc;
    },
      {} as Record<string, string>);

    // 3. Create commands
    const seededCommands = await Command.create([
      // --- Git Setup ---
      {
        categoryId: catMap['git-setup'],
        title: 'Kiểm tra phiên bản Git hiện tại',
        slug: 'git-version',
        command: 'git --version',
        description: 'In ra thông tin phiên bản Git đang được cài đặt trên hệ điều hành của bạn.',
        explanations: [],
        examples: [
          { title: 'Kiểm tra phiên bản', command: 'git --version' }
        ],
        tags: ['git', 'version', 'info', 'setup'],
        viewCount: 92
      },
      {
        categoryId: catMap['git-setup'],
        title: 'Khởi tạo kho chứa Git mới (Git Init)',
        slug: 'git-init-basics',
        command: 'git init',
        description: 'Tạo một kho chứa (repository) Git trống mới hoặc khởi tạo lại một kho chứa đã có trong thư mục hiện tại để bắt đầu theo dõi code.',
        explanations: [],
        examples: [
          { title: 'Khởi tạo Git tại thư mục hiện tại', command: 'git init' }
        ],
        tags: ['git', 'setup', 'init', 'basics'],
        viewCount: 150
      },
      {
        categoryId: catMap['git-setup'],
        title: 'Sao chép kho chứa từ xa về máy cục bộ (Git Clone)',
        slug: 'git-clone-basics',
        command: 'git clone [repository_url]',
        description: 'Tải toàn bộ mã nguồn, các nhánh và lịch sử commits của một dự án từ GitHub/GitLab về thư mục làm việc mới trên máy tính của bạn.',
        explanations: [
          { param: '[repository_url]', description: 'Địa chỉ đường dẫn HTTPS hoặc SSH của kho chứa từ xa cần sao chép.' }
        ],
        examples: [
          { title: 'Clone dự án qua HTTPS', command: 'git clone https://github.com/facebook/react.git' }
        ],
        tags: ['git', 'setup', 'clone', 'download'],
        viewCount: 280
      },
      {
        categoryId: catMap['git-setup'],
        title: 'Kiểm tra trạng thái thay đổi mã nguồn (Git Status)',
        slug: 'git-status-basics',
        command: 'git status',
        description: 'Hiển thị các tệp tin đã bị thay đổi trong thư mục làm việc, các tệp đã được đưa vào Staging Area và các tệp chưa được theo dõi (untracked).',
        explanations: [],
        examples: [
          { title: 'Kiểm tra trạng thái thay đổi', command: 'git status' }
        ],
        tags: ['git', 'status', 'info', 'basics'],
        viewCount: 310
      },
      {
        categoryId: catMap['git-setup'],
        title: 'Thêm tệp tin vào hàng chờ chuẩn bị Commit (Git Add)',
        slug: 'git-add-basics',
        command: 'git add [file_pattern]',
        description: 'Đưa các thay đổi từ thư mục làm việc (Working Directory) vào khu vực đệm (Staging Area) để chuẩn bị cho việc tạo commit.',
        explanations: [
          { param: '[file_pattern]', description: 'Tên tệp tin cụ thể, hoặc dấu chấm (.) để thêm tất cả thay đổi trong thư mục hiện tại.' }
        ],
        examples: [
          { title: 'Thêm toàn bộ thay đổi', command: 'git add .' },
      { title: 'Chỉ thêm một file cụ thể', command: 'git add src/index.js' }
        ],
        tags: ['git', 'add', 'stage', 'basics'],
        viewCount: 295
      },
      {
        categoryId: catMap['git-setup'],
        title: 'Ghi lại các thay đổi vào lịch sử Repository (Git Commit)',
        slug: 'git-commit-basics',
        command: 'git commit -m "[commit_message]"',
        description: 'Lưu lại ảnh chụp (snapshot) của các tệp tin đã đưa vào Staging Area kèm theo một thông điệp giải thích ngắn gọn về thay đổi đó.',
        explanations: [
          { param: '-m', description: 'Chỉ định trực tiếp thông điệp commit (message) ngay trên dòng lệnh.' }
        ],
        examples: [
          { title: 'Tạo commit cơ bản', command: 'git commit -m "feat: add user login component"' }
        ],
        tags: ['git', 'commit', 'save', 'basics'],
        viewCount: 320
      },
      {
        categoryId: catMap['git-setup'],
        title: 'Đẩy các commit lên kho chứa từ xa (Git Push)',
        slug: 'git-push-basics',
        command: 'git push [remote_name] [branch_name]',
        description: 'Cập nhật các commit từ kho chứa cục bộ (local branch) lên kho chứa từ xa (remote branch) trên GitHub/GitLab.',
        explanations: [
          { param: '[remote_name]', description: 'Tên định danh của remote server, mặc định thường là origin.' },
      { param: '[branch_name]', description: 'Tên nhánh muốn đẩy code lên, ví dụ main, develop.' }
        ],
        examples: [
          { title: 'Đẩy commit lên nhánh main', command: 'git push origin main' }
        ],
        tags: ['git', 'push', 'upload', 'basics'],
        viewCount: 275
      },
      {
        categoryId: catMap['git-setup'],
        title: 'Tải và cập nhật code mới từ kho chứa từ xa (Git Pull)',
        slug: 'git-pull-basics',
        command: 'git pull [remote_name] [branch_name]',
        description: 'Tải về các thay đổi mới nhất từ remote branch và tự động gộp (merge) thẳng vào local branch hiện tại.',
        explanations: [],
        examples: [
          { title: 'Kéo code mới nhất từ origin main', command: 'git pull origin main' }
        ],
        tags: ['git', 'pull', 'sync', 'download', 'basics'],
        viewCount: 260
      },
      {
        categoryId: catMap['git-setup'],
        title: 'Kiểm tra trạng thái thay đổi ở dạng rút gọn (git status -s)',
        slug: 'git-status-short',
        command: 'git status -s',
        description: 'Hiển thị trạng thái các thay đổi dưới dạng ký hiệu cực kỳ ngắn gọn (M = Modified, A = Added, ?? = Untracked).',
        explanations: [],
        examples: [
          { title: 'Kiểm tra trạng thái rút gọn', command: 'git status -s' }
        ],
        tags: ['git', 'status', 'short', 'basics'],
        viewCount: 165
      },
      {
        categoryId: catMap['git-setup'],
        title: 'Thêm tất cả thay đổi đã theo dõi và commit nhanh (git commit -am)',
        slug: 'git-commit-am',
        command: 'git commit -am "[commit_message]"',
        description: 'Phím tắt giúp tự động thêm (git add) tất cả các file đã được theo dõi (tracked files) có thay đổi và tạo commit ngay lập tức mà không cần chạy lệnh add riêng biệt. Lưu ý: Lệnh này không tự động thêm các tệp tin mới tạo (untracked files).',
        explanations: [
          { param: '-am', description: 'Kết hợp thuộc tính -a (add all tracked) và -m (message).' }
        ],
        examples: [
          { title: 'Commit nhanh các sửa đổi', command: 'git commit -am "fix: correct typo in footer component"' }
        ],
        tags: ['git', 'commit', 'quick', 'basics'],
        viewCount: 220
      },
      {
        categoryId: catMap['git-setup'],
        title: 'Kéo code từ nhánh remote mặc định hiện tại (git pull)',
        slug: 'git-pull-simple',
        command: 'git pull',
        description: 'Tải và gộp các thay đổi từ nhánh remote tương ứng (upstream branch) của nhánh hiện tại đang làm việc.',
        explanations: [],
        examples: [
          { title: 'Kéo code nhánh hiện tại', command: 'git pull' }
        ],
        tags: ['git', 'pull', 'sync', 'basics'],
        viewCount: 245
      },
      {
        categoryId: catMap['git-setup'],
        title: 'Đẩy code lên nhánh remote mặc định hiện tại (git push)',
        slug: 'git-push-simple',
        command: 'git push',
        description: 'Đẩy các commit local hiện tại lên nhánh remote tương ứng (đã được liên kết upstream) của máy chủ chứa mã nguồn.',
        explanations: [],
        examples: [
          { title: 'Đẩy code nhánh hiện tại', command: 'git push' }
        ],
        tags: ['git', 'push', 'upload', 'basics'],
        viewCount: 250
      },

      // --- Git Config ---
      {
        categoryId: catMap['git-config'],
        title: 'Set Global Git User Name',
        slug: 'git-set-username',
        command: 'git config --global user.name "[name]"',
        description: 'Cấu hình tên tác giả (username) toàn cục cho tất cả các kho chứa Git trên máy tính hiện tại.',
        explanations: [
          { param: '--global', description: 'Áp dụng cấu hình cho toàn bộ Repository của người dùng OS hiện tại.' },
      { param: 'user.name', description: 'Khóa cấu hình định nghĩa tên người viết mã nguồn (Author).' }
        ],
        examples: [
          { title: 'Thiết lập tên thông dụng', command: 'git config --global user.name "Nguyen Van Thiet"' }
        ],
        tags: ['git', 'config', 'setup', 'username'],
        viewCount: 125
      },
      {
        categoryId: catMap['git-config'],
        title: 'Set Global Git Email',
        slug: 'git-set-email',
        command: 'git config --global user.email "[email]"',
        description: 'Cấu hình địa chỉ email liên kết với các commit Git của bạn trên toàn hệ thống máy tính.',
        explanations: [
          { param: 'user.email', description: 'Địa chỉ email dùng để định danh tài khoản commit của bạn.' }
        ],
        examples: [
          { title: 'Thiết lập email cá nhân', command: 'git config --global user.email "vanthiet1@gmail.com"' }
        ],
        tags: ['git', 'config', 'setup', 'email'],
        viewCount: 110
      },
      {
        categoryId: catMap['git-config'],
        title: 'Set Global Git Proxy',
        slug: 'git-set-proxy',
        command: 'git config --global http.proxy [proxy_address]',
        description: 'Cấu hình HTTP Proxy toàn cục giúp Git kết nối mạng vượt qua tường lửa hoặc mạng nội bộ.',
        explanations: [
          { param: 'http.proxy', description: 'Địa chỉ máy chủ proxy kèm theo cổng kết nối.' }
        ],
        examples: [
          { title: 'Cấu hình HTTP Proxy cục bộ', command: 'git config --global http.proxy http://127.0.0.1:1080' }
        ],
        tags: ['git', 'proxy', 'config', 'network'],
        viewCount: 98
      },
      {
        categoryId: catMap['git-config'],
        title: 'Xem toàn bộ cấu hình Git đang áp dụng',
        slug: 'git-view-config',
        command: 'git config --list --show-origin',
        description: 'Liệt kê tất cả các thiết lập Git đang hoạt động kèm theo đường dẫn file chứa cấu hình đó.',
        explanations: [
          { param: '--list', description: 'Hiển thị tất cả giá trị cấu hình.' },
      { param: '--show-origin', description: 'Hiện rõ cấu hình đó nằm ở file local, global hay system.' }
        ],
        examples: [
          { title: 'Xem nhanh danh sách config', command: 'git config --list' }
        ],
        tags: ['git', 'config', 'list', 'info'],
        viewCount: 84
      },
      {
        categoryId: catMap['git-config'],
        title: 'Xóa cấu hình Git cụ thể',
        slug: 'git-unset-config',
        command: 'git config --global --unset [config_key]',
        description: 'Xóa bỏ một thiết lập cấu hình Git toàn cục đã cài đặt trước đó (ví dụ xóa proxy, xóa alias).',
        explanations: [
          { param: '--unset', description: 'Lệnh gỡ bỏ khóa cấu hình chỉ định.' }
        ],
        examples: [
          { title: 'Gỡ bỏ cấu hình Proxy', command: 'git config --global --unset http.proxy' }
        ],
        tags: ['git', 'config', 'unset', 'remove'],
        viewCount: 75
      },

      // --- GitHub Authentication ---
      {
        categoryId: catMap['github-auth'],
        title: 'Đăng nhập GitHub qua CLI',
        slug: 'github-cli-login',
        command: 'gh auth login',
        description: 'Sử dụng GitHub CLI để bắt đầu quá trình xác thực và đăng nhập tài khoản của bạn trên trình duyệt hoặc qua token.',
        explanations: [],
        examples: [
          { title: 'Đăng nhập CLI', command: 'gh auth login' }
        ],
        tags: ['github', 'auth', 'login', 'cli'],
        viewCount: 145
      },
      {
        categoryId: catMap['github-auth'],
        title: 'Cấu hình tự động lưu trữ Token/Mật khẩu đăng nhập',
        slug: 'git-credential-manager',
        command: 'git config --global credential.helper manager',
        description: 'Bật trình quản lý thông tin xác thực để Git tự động ghi nhớ tài khoản mật khẩu hoặc GitHub PAT trên máy.',
        explanations: [
          { param: 'manager', description: 'Sử dụng Git Credential Manager tích hợp sẵn của hệ điều hành Windows/macOS.' }
        ],
        examples: [
          { title: 'Bật Credential Manager', command: 'git config --global credential.helper manager' }
        ],
        tags: ['git', 'auth', 'token', 'credential'],
        viewCount: 160
      },
      {
        categoryId: catMap['github-auth'],
        title: 'Xóa tài khoản GitHub khỏi máy tính (Windows Credential)',
        slug: 'github-remove-credential',
        command: 'cmdkey /delete:LegacyGeneric:target=git:https://github.com',
        description: 'Lệnh Cmdkey xóa sạch thông tin tài khoản đăng nhập của https://github.com đang lưu trong Windows Credential Manager.',
        explanations: [
          { param: '/delete', description: 'Yêu cầu xóa bản ghi thông tin xác thực.' }
        ],
        examples: [
          { title: 'Xóa thông tin đăng nhập GitHub', command: 'cmdkey /delete:LegacyGeneric:target=git:https://github.com' }
        ],
        tags: ['github', 'logout', 'credential', 'windows'],
        viewCount: 180
      },
      {
        categoryId: catMap['github-auth'],
        title: 'Kiểm tra tài khoản đăng nhập SSH hiện tại',
        slug: 'github-check-ssh-auth',
        command: 'ssh -T git@github.com',
        description: 'Gửi yêu cầu thử nghiệm kết nối SSH tới GitHub để xác nhận bạn đã cấu hình SSH Key thành công và đang dùng tài khoản nào.',
        explanations: [
          { param: '-T', description: 'Tắt chế độ yêu cầu tạo màn hình shell tương tác tty.' }
        ],
        examples: [
          { title: 'Kiểm tra kết nối SSH', command: 'ssh -T git@github.com' }
        ],
        tags: ['github', 'auth', 'ssh', 'check'],
        viewCount: 135
      },
      {
        categoryId: catMap['github-auth'],
        title: 'Yêu cầu xóa tài khoản khỏi Git Credential Manager (git credential reject)',
        slug: 'git-credential-reject',
        command: 'echo url=https://github.com | git credential-manager reject',
        description: 'Buộc Git Credential Manager xóa thông tin xác thực (username/password/token) của host được chỉ định.',
        explanations: [],
        examples: [
          { title: 'Xóa token GitHub khỏi manager', command: 'echo url=https://github.com | git credential-manager reject' }
        ],
        tags: ['git', 'auth', 'credential', 'logout'],
        viewCount: 115
      },
      {
        categoryId: catMap['github-auth'],
        title: 'Gỡ bỏ trình quản lý thông tin xác thực Git (Unset Helper)',
        slug: 'git-unset-credential-helper',
        command: 'git config --global --unset credential.helper',
        description: 'Tắt tính năng tự động ghi nhớ mật khẩu của Git trên toàn bộ hệ thống.',
        explanations: [],
        examples: [
          { title: 'Tắt credential helper', command: 'git config --global --unset credential.helper' }
        ],
        tags: ['git', 'auth', 'credential', 'unset'],
        viewCount: 100
      },

      // --- Git Remote ---
      {
        categoryId: catMap['git-remote'],
        title: 'Xem danh sách Remote URL',
        slug: 'git-remote-view',
        command: 'git remote -v',
        description: 'Hiển thị danh sách các máy chủ lưu trữ từ xa đang liên kết với dự án local của bạn kèm URL chi tiết.',
        explanations: [
          { param: '-v', description: 'Verbose mode, hiển thị đầy đủ địa chỉ URL nhận và đẩy code.' }
        ],
        examples: [
          { title: 'Xem các remote', command: 'git remote -v' }
        ],
        tags: ['git', 'remote', 'info', 'url'],
        viewCount: 95
      },
      {
        categoryId: catMap['git-remote'],
        title: 'Liên kết với Remote Repository mới',
        slug: 'git-remote-add',
        command: 'git remote add origin [remote_url]',
        description: 'Thiết lập một đường dẫn từ xa mới tên là "origin" trỏ về kho lưu trữ trống trên GitHub/GitLab.',
        explanations: [
          { param: 'origin', description: 'Tên định danh mặc định cho kho chứa từ xa chính.' }
        ],
        examples: [
          { title: 'Thêm remote origin', command: 'git remote add origin https://github.com/user/repo.git' }
        ],
        tags: ['git', 'remote', 'add', 'origin'],
        viewCount: 140
      },
      {
        categoryId: catMap['git-remote'],
        title: 'Sửa lỗi Remote origin already exists',
        slug: 'git-remote-set-url',
        command: 'git remote set-url origin [new_remote_url]',
        description: 'Cập nhật lại địa chỉ URL của remote "origin" đã tồn tại thay vì phải xóa đi tạo lại.',
        explanations: [],
        examples: [
          { title: 'Thay đổi URL origin', command: 'git remote set-url origin https://github.com/user/new-repo.git' }
        ],
        tags: ['git', 'remote', 'set-url', 'fix'],
        viewCount: 175
      },
      {
        categoryId: catMap['git-remote'],
        title: 'Xóa liên kết với Remote Repository (git remote remove)',
        slug: 'git-remote-remove',
        command: 'git remote remove [remote_name]',
        description: 'Xóa bỏ hoàn toàn liên kết tới kho chứa từ xa (ví dụ origin) khỏi repository cục bộ của bạn.',
        explanations: [
          { param: '[remote_name]', description: 'Tên remote cần xóa, mặc định thường là origin.' }
        ],
        examples: [
          { title: 'Xóa remote origin', command: 'git remote remove origin' }
        ],
        tags: ['git', 'remote', 'remove', 'delete'],
        viewCount: 110
      },

      // --- Git Branch ---
      {
        categoryId: catMap['git-branch'],
        title: 'Tạo nhánh mới (Create Branch)',
        slug: 'git-branch-create',
        command: 'git branch [branch_name]',
        description: 'Khởi tạo một nhánh phát triển độc lập mới dựa trên commit hiện tại mà bạn đang đứng.',
        explanations: [],
        examples: [
          { title: 'Tạo nhánh feature-login', command: 'git branch feature-login' }
        ],
        tags: ['git', 'branch', 'create'],
        viewCount: 110
      },
      {
        categoryId: catMap['git-branch'],
        title: 'Chuyển sang nhánh khác (Checkout)',
        slug: 'git-checkout-branch',
        command: 'git checkout [branch_name]',
        description: 'Chuyển đổi không gian làm việc hiện tại sang một nhánh đã tồn tại trong dự án.',
        explanations: [],
        examples: [
          { title: 'Chuyển sang nhánh develop', command: 'git checkout develop' }
        ],
        tags: ['git', 'checkout', 'branch', 'switch'],
        viewCount: 105
      },
      {
        categoryId: catMap['git-branch'],
        title: 'Tạo nhanh và chuyển sang nhánh mới ngay lập tức',
        slug: 'git-checkout-b',
        command: 'git checkout -b [branch_name]',
        description: 'Phím tắt kết hợp việc tạo một nhánh mới và di chuyển không gian làm việc sang nhánh đó ngay lập tức.',
        explanations: [
          { param: '-b', description: 'Tạo nhánh mới trước khi thực hiện chuyển đổi.' }
        ],
        examples: [
          { title: 'Tạo và chuyển sang nhánh feature-payment', command: 'git checkout -b feature-payment' }
        ],
        tags: ['git', 'checkout', 'branch', 'create'],
        viewCount: 220
      },
      {
        categoryId: catMap['git-branch'],
        title: 'Gộp nhánh (Merge Branch)',
        slug: 'git-merge',
        command: 'git merge [branch_name]',
        description: 'Hợp nhất các thay đổi lịch sử và code của nhánh chỉ định vào nhánh hiện tại bạn đang đứng.',
        explanations: [],
        examples: [
          { title: 'Gộp feature-login vào develop', command: 'git merge feature-login' }
        ],
        tags: ['git', 'merge', 'branch'],
        viewCount: 150
      },
      {
        categoryId: catMap['git-branch'],
        title: 'Tái sắp xếp lịch sử nhánh (Rebase)',
        slug: 'git-rebase',
        command: 'git rebase [base_branch]',
        description: 'Di chuyển hoặc gộp chuỗi các commits của nhánh hiện tại lên đầu commit mới nhất của nhánh gốc (base_branch), giúp lịch sử tuyến tính.',
        explanations: [],
        examples: [
          { title: 'Rebase nhánh hiện tại lên develop', command: 'git rebase develop' }
        ],
        tags: ['git', 'rebase', 'branch', 'history'],
        viewCount: 130
      },
      {
        categoryId: catMap['git-branch'],
        title: 'Đổi tên nhánh hiện tại',
        slug: 'git-branch-rename',
        command: 'git branch -m [new_name]',
        description: 'Đổi tên của nhánh local bạn đang đứng sang một tên mới một cách an toàn.',
        explanations: [
          { param: '-m', description: 'Move/Rename nhánh.' }
        ],
        examples: [
          { title: 'Đổi tên nhánh hiện tại thành main', command: 'git branch -m main' }
        ],
        tags: ['git', 'branch', 'rename'],
        viewCount: 115
      },
      {
        categoryId: catMap['git-branch'],
        title: 'Xóa một nhánh local đã gộp',
        slug: 'git-branch-delete',
        command: 'git branch -d [branch_name]',
        description: 'Xóa bỏ nhánh local sau khi đã gộp hết các commits của nó vào nhánh chính để giữ repository sạch sẽ.',
        explanations: [
          { param: '-d', description: 'Xóa nhánh có kiểm tra trạng thái gộp (an toàn).' }
        ],
        examples: [
          { title: 'Xóa nhánh feature-done', command: 'git branch -d feature-done' }
        ],
        tags: ['git', 'branch', 'delete'],
        viewCount: 95
      },
      {
        categoryId: catMap['git-branch'],
        title: 'Push nhánh nội bộ lên Remote lần đầu',
        slug: 'git-push-u',
        command: 'git push -u origin [branch_name]',
        description: 'Đẩy nhánh local lên GitHub lần đầu tiên và tạo liên kết theo dõi (upstream track) mặc định cho các lần push/pull sau.',
        explanations: [
          { param: '-u', description: 'Set upstream link giữa local branch và remote branch.' }
        ],
        examples: [
          { title: 'Push nhánh feature lên origin', command: 'git push -u origin feature-auth' }
        ],
        tags: ['git', 'push', 'upstream', 'branch'],
        viewCount: 205
      },
      {
        categoryId: catMap['git-branch'],
        title: 'Liệt kê danh sách toàn bộ các nhánh (Git Branch -a)',
        slug: 'git-branch-list-all',
        command: 'git branch -a',
        description: 'Hiển thị danh sách tất cả các nhánh đang có ở máy local và tất cả các nhánh đã theo dõi trên remote server (origin).',
        explanations: [
          { param: '-a', description: 'Hiển thị tất cả (all) các nhánh local và remote.' }
        ],
        examples: [
          { title: 'Liệt kê mọi nhánh', command: 'git branch -a' }
        ],
        tags: ['git', 'branch', 'list', 'all'],
        viewCount: 142
      },
      {
        categoryId: catMap['git-branch'],
        title: 'Đồng bộ danh sách nhánh và commits mới nhất từ Remote (Git Fetch)',
        slug: 'git-fetch-all',
        command: 'git fetch --all --prune',
        description: 'Tải toàn bộ thông tin lịch sử và các nhánh mới từ remote server về nhưng không tự động gộp (merge) vào code hiện tại của bạn.',
        explanations: [
          { param: '--all', description: 'Lấy dữ liệu từ tất cả các remote đã cấu hình.' },
      { param: '--prune', description: 'Tự động dọn dẹp, xóa bỏ liên kết theo dõi tới các nhánh remote đã bị xóa trên server.' }
        ],
        examples: [
          { title: 'Fetch và dọn dẹp các nhánh cũ', command: 'git fetch --all --prune' }
        ],
        tags: ['git', 'fetch', 'sync', 'remote'],
        viewCount: 180
      },
      {
        categoryId: catMap['git-branch'],
        title: 'Liệt kê danh sách các nhánh cục bộ (git branch)',
        slug: 'git-branch-local',
        command: 'git branch',
        description: 'Hiển thị danh sách các nhánh local đang tồn tại trên máy tính và đánh dấu sao (*) kèm màu xanh vào nhánh hiện hành.',
        explanations: [],
        examples: [
          { title: 'Xem các nhánh local', command: 'git branch' }
        ],
        tags: ['git', 'branch', 'list', 'local'],
        viewCount: 130
      },
      {
        categoryId: catMap['git-branch'],
        title: 'Chuyển đổi giữa các nhánh an toàn (git switch)',
        slug: 'git-switch-simple',
        command: 'git switch [branch_name]',
        description: 'Thay đổi không gian làm việc sang một nhánh cụ thể (lệnh được đề xuất thay thế cho git checkout từ bản Git 2.23+).',
        explanations: [],
        examples: [
          { title: 'Chuyển sang nhánh develop', command: 'git switch develop' }
        ],
        tags: ['git', 'switch', 'checkout', 'branch'],
        viewCount: 215
      },
      {
        categoryId: catMap['git-branch'],
        title: 'Buộc xóa một nhánh chưa được gộp (git branch -D)',
        slug: 'git-branch-delete-force',
        command: 'git branch -D [branch_name]',
        description: 'Buộc xóa một nhánh local ngay cả khi nhánh đó chứa các thay đổi chưa được gộp vào nhánh chính. Cần cẩn thận vì hành động này có thể làm mất code.',
        explanations: [
          { param: '-D', description: 'Force delete, buộc xóa nhánh không qua kiểm tra an toàn.' }
        ],
        examples: [
          { title: 'Buộc xóa nhánh nháp', command: 'git branch -D feature-draft' }
        ],
        tags: ['git', 'branch', 'delete', 'force'],
        viewCount: 160
      },
      {
        categoryId: catMap['git-branch'],
        title: 'Quản lý nhãn phiên bản (Git Tag)',
        slug: 'git-tag-basics',
        command: 'git tag [tag_name]',
        description: 'Đánh dấu hoặc gắn nhãn một mốc commit quan trọng (thường là phiên bản release như v1.0.0) để dễ dàng theo dõi và truy xuất sau này.',
        explanations: [
          { param: '[tag_name]', description: 'Tên nhãn muốn gắn (ví dụ v1.0.0, v2.1-beta).' }
        ],
        examples: [
          { title: 'Tạo tag phiên bản 1.0.0', command: 'git tag v1.0.0' },
      { title: 'Liệt kê toàn bộ tag hiện có', command: 'git tag' }
        ],
        tags: ['git', 'tag', 'version', 'release'],
        viewCount: 175
      },
      {
        categoryId: catMap['git-branch'],
        title: 'Đẩy nhãn (Tag) lên kho chứa từ xa (git push tag)',
        slug: 'git-push-tag',
        command: 'git push origin [tag_name]',
        description: 'Đẩy một tag cụ thể hoặc toàn bộ tag từ local lên remote repository trên GitHub/GitLab (mặc định git push thông thường không đẩy tag).',
        explanations: [],
        examples: [
          { title: 'Đẩy tag v1.0.0 lên origin', command: 'git push origin v1.0.0' },
      { title: 'Đẩy tất cả tag local lên remote', command: 'git push origin --tags' }
        ],
        tags: ['git', 'tag', 'push', 'upload'],
        viewCount: 145
      },

      // --- Git Stash ---
      {
        categoryId: catMap['git-stash'],
        title: 'Lưu tạm nhanh các thay đổi chưa commit (git stash)',
        slug: 'git-stash-simple',
        command: 'git stash',
        description: 'Lưu trữ nhanh toàn bộ các thay đổi chưa staged và chưa commit vào stack stash để chuyển sang làm việc khác trên nhánh sạch.',
        explanations: [],
        examples: [
          { title: 'Lưu tạm nhanh', command: 'git stash' }
        ],
        tags: ['git', 'stash', 'save', 'temp'],
        viewCount: 190
      },
      {
        categoryId: catMap['git-stash'],
        title: 'Lưu tạm thời code kèm thông điệp (Stash Save)',
        slug: 'git-stash-save',
        command: 'git stash save "[message]"',
        description: 'Lưu trữ tạm thời toàn bộ các thay đổi chưa hoàn thành vào stack và khôi phục thư mục làm việc về trạng thái commit gần nhất.',
        explanations: [],
        examples: [
          { title: 'Lưu tạm thời công việc', command: 'git stash save "dang lam do feature thanh toan"' }
        ],
        tags: ['git', 'stash', 'save', 'temp'],
        viewCount: 170
      },
      {
        categoryId: catMap['git-stash'],
        title: 'Xem danh sách các bản Stash',
        slug: 'git-stash-list',
        command: 'git stash list',
        description: 'Hiển thị danh sách tất cả các bản ghi đang được lưu trữ tạm thời trong stack stash kèm theo mã số index.',
        explanations: [],
        examples: [
          { title: 'Liệt kê các stash', command: 'git stash list' }
        ],
        tags: ['git', 'stash', 'list'],
        viewCount: 112
      },
      {
        categoryId: catMap['git-stash'],
        title: 'Lấy lại code từ Stash gần nhất và xóa stash (Pop)',
        slug: 'git-stash-pop',
        command: 'git stash pop',
        description: 'Áp dụng các thay đổi từ stash gần nhất (`stash@{0}`) vào workspace hiện tại và đồng thời xóa nó khỏi stack.',
        explanations: [],
        examples: [
          { title: 'Lấy và xóa stash', command: 'git stash pop' }
        ],
        tags: ['git', 'stash', 'pop', 'restore'],
        viewCount: 195
      },
      {
        categoryId: catMap['git-stash'],
        title: 'Lấy lại code từ Stash cụ thể và giữ lại stash (Apply)',
        slug: 'git-stash-apply',
        command: 'git stash apply stash@{[index]}',
        description: 'Áp dụng thay đổi từ một stash chỉ định bằng index nhưng vẫn giữ lại bản ghi đó trong danh sách stash.',
        explanations: [],
        examples: [
          { title: 'Áp dụng stash số 1', command: 'git stash apply stash@{1}' }
        ],
        tags: ['git', 'stash', 'apply'],
        viewCount: 120
      },
      {
        categoryId: catMap['git-stash'],
        title: 'Xóa một Stash cụ thể khỏi danh sách',
        slug: 'git-stash-drop',
        command: 'git stash drop stash@{[index]}',
        description: 'Xóa bỏ hoàn toàn một bản ghi stash cụ thể khỏi stack lưu trữ tạm thời mà không áp dụng nó vào code.',
        explanations: [],
        examples: [
          { title: 'Xóa stash số 0', command: 'git stash drop stash@{0}' }
        ],
        tags: ['git', 'stash', 'drop', 'remove'],
        viewCount: 88
      },
      {
        categoryId: catMap['git-stash'],
        title: 'Xóa sạch toàn bộ các bản lưu tạm (git stash clear)',
        slug: 'git-stash-clear',
        command: 'git stash clear',
        description: 'Xóa bỏ hoàn toàn tất cả các bản ghi stash đang có trong stack lưu trữ tạm thời. Hành động này không thể hoàn tác, hãy cẩn thận!',
        explanations: [],
        examples: [
          { title: 'Xóa sạch mọi stash', command: 'git stash clear' }
        ],
        tags: ['git', 'stash', 'clear', 'delete'],
        viewCount: 110
      },

      // --- Git Conflicts ---
      {
        categoryId: catMap['git-conflict'],
        title: 'Kiểm tra xung đột sau khi lấy code từ Stash',
        slug: 'git-stash-conflict-status',
        command: 'git status',
        description: 'Khi thực hiện `git stash pop` bị lỗi xung đột (conflict), hãy dùng lệnh này để xác định những file nào đang bị tranh chấp cần sửa tay.',
        explanations: [],
        examples: [
          { title: 'Kiểm tra trạng thái conflict', command: 'git status' }
        ],
        tags: ['git', 'stash', 'conflict', 'status'],
        viewCount: 130
      },
      {
        categoryId: catMap['git-conflict'],
        title: 'Giải quyết xung đột Merge Conflict',
        slug: 'git-resolve-merge-conflict',
        command: 'git mergetool',
        description: 'Khởi chạy công cụ giải quyết xung đột được cấu hình sẵn để xử lý trực quan các file bị tranh chấp code khi gộp nhánh.',
        explanations: [],
        examples: [
          { title: 'Mở công cụ giải quyết conflict', command: 'git mergetool' }
        ],
        tags: ['git', 'merge', 'conflict', 'resolve'],
        viewCount: 115
      },
      {
        categoryId: catMap['git-conflict'],
        title: 'Hủy bỏ quá trình gộp nhánh khi có xung đột (git merge --abort)',
        slug: 'git-merge-abort',
        command: 'git merge --abort',
        description: 'Dừng ngay lập tức tiến trình merge đang bị xung đột và khôi phục trạng thái thư mục làm việc về trước khi thực hiện lệnh gộp nhánh.',
        explanations: [],
        examples: [
          { title: 'Hủy bỏ quá trình merge', command: 'git merge --abort' }
        ],
        tags: ['git', 'merge', 'conflict', 'abort'],
        viewCount: 165
      },
      {
        categoryId: catMap['git-conflict'],
        title: 'Chấp nhận toàn bộ thay đổi từ nhánh gộp (git checkout --theirs)',
        slug: 'git-checkout-theirs',
        command: 'git checkout --theirs .',
        description: 'Giải quyết nhanh xung đột bằng cách chấp nhận tất cả thay đổi của nhánh đang được gộp vào (nhánh remote/nhánh kia) và bỏ qua thay đổi của local.',
        explanations: [],
        examples: [
          { title: 'Ưu tiên code bên ngoài (theirs)', command: 'git checkout --theirs .' }
        ],
        tags: ['git', 'conflict', 'resolve', 'theirs'],
        viewCount: 140
      },
      {
        categoryId: catMap['git-conflict'],
        title: 'Giữ nguyên toàn bộ thay đổi của nhánh hiện tại (git checkout --ours)',
        slug: 'git-checkout-ours',
        command: 'git checkout --ours .',
        description: 'Giải quyết nhanh xung đột bằng cách giữ lại toàn bộ code của nhánh hiện tại bạn đang đứng (nhánh local) và từ chối các thay đổi của nhánh kia.',
        explanations: [],
        examples: [
          { title: 'Ưu tiên code local của mình (ours)', command: 'git checkout --ours .' }
        ],
        tags: ['git', 'conflict', 'resolve', 'ours'],
        viewCount: 135
      },

      // --- Undo & Reset ---
      {
        categoryId: catMap['git-undo-reset'],
        title: 'Reset Soft (Quay lui commit, giữ nguyên code đã Staged)',
        slug: 'git-reset-soft',
        command: 'git reset --soft HEAD~[number_of_commits]',
        description: 'Quay ngược lịch sử commits về trước, đưa mã nguồn của các commit đó về trạng thái Staged sẵn sàng để commit lại.',
        explanations: [
          { param: '--soft', description: 'Chỉ thu hồi commit, giữ nguyên file thay đổi trong staging area.' }
        ],
        examples: [
          { title: 'Thu hồi 1 commit gần nhất', command: 'git reset --soft HEAD~1' }
        ],
        tags: ['git', 'reset', 'soft', 'undo'],
        viewCount: 165
      },
      {
        categoryId: catMap['git-undo-reset'],
        title: 'Reset Mixed (Quay lui commit, chuyển code về Unstaged)',
        slug: 'git-reset-mixed',
        command: 'git reset HEAD~[number_of_commits]',
        description: 'Thu hồi commit và đưa toàn bộ code thay đổi về trạng thái Unstaged (Working Directory) để chỉnh sửa lại tự do.',
        explanations: [],
        examples: [
          { title: 'Hủy 2 commit gần nhất và giữ code ở local', command: 'git reset HEAD~2' }
        ],
        tags: ['git', 'reset', 'mixed', 'unstaged'],
        viewCount: 140
      },
      {
        categoryId: catMap['git-undo-reset'],
        title: 'Reset Hard (Xóa bỏ hoàn toàn commit và code đã sửa)',
        slug: 'git-reset-hard',
        command: 'git reset --hard HEAD~[number_of_commits]',
        description: 'Hủy bỏ hoàn toàn tất cả các commit, code thay đổi, đưa toàn bộ workspace về trạng thái nguyên bản của commit đích. Cực kỳ nguy hiểm!',
        explanations: [
          { param: '--hard', description: 'Xóa sạch mọi thay đổi ở cả Staging và Working Directory.' }
        ],
        examples: [
          { title: 'Hủy commit gần nhất và xóa sạch code', command: 'git reset --hard HEAD~1' }
        ],
        tags: ['git', 'reset', 'hard', 'delete-code'],
        viewCount: 260
      },
      {
        categoryId: catMap['git-undo-reset'],
        title: 'Đảo ngược commit đã push lên remote an toàn (Revert)',
        slug: 'git-revert',
        command: 'git revert [commit_sha]',
        description: 'Tạo ra một commit mới có nội dung hoàn toàn đảo ngược (phủ quyết) lại một commit cũ đã push lên remote mà không làm đứt gãy lịch sử nhánh.',
        explanations: [],
        examples: [
          { title: 'Đảo ngược commit a1b2c3d', command: 'git revert a1b2c3d' }
        ],
        tags: ['git', 'revert', 'undo', 'safe'],
        viewCount: 155
      },
      {
        categoryId: catMap['git-undo-reset'],
        title: 'Sửa nội dung hoặc thông điệp commit gần nhất (chưa push)',
        slug: 'git-commit-amend',
        command: 'git commit --amend -m "[new_message]"',
        description: 'Thay thế commit gần nhất bằng một commit mới có nội dung file đã staged hiện tại hoặc thay đổi dòng thông điệp commit.',
        explanations: [
          { param: '--amend', description: 'Gộp sửa đổi vào commit cũ thay vì tạo commit mới.' }
        ],
        examples: [
          { title: 'Sửa thông điệp commit', command: 'git commit --amend -m "feat: validate form correctly"' }
        ],
        tags: ['git', 'commit', 'amend', 'undo'],
        viewCount: 185
      },
      {
        categoryId: catMap['git-undo-reset'],
        title: 'Đẩy đè code local lên Remote (Force Push)',
        slug: 'git-push-f',
        command: 'git push -f origin [branch_name]',
        description: 'Ghi đè hoàn toàn lịch sử local lên remote branch. Thường dùng sau khi thực hiện reset commit local.',
        explanations: [
          { param: '-f', description: 'Force mode, bỏ qua cảnh báo từ chối của Git Server.' }
        ],
        examples: [
          { title: 'Force push nhánh cá nhân', command: 'git push -f origin feature-fix' }
        ],
        tags: ['git', 'push', 'force', 'overwrite'],
        viewCount: 190
      },
      {
        categoryId: catMap['git-undo-reset'],
        title: 'Khôi phục tệp tin về trạng thái commit gần nhất (git restore)',
        slug: 'git-restore-file',
        command: 'git restore [file_path]',
        description: 'Hủy bỏ các thay đổi chưa staged trên một tệp tin cụ thể, đưa tệp tin đó quay về nội dung của commit gần nhất.',
        explanations: [],
        examples: [
          { title: 'Khôi phục tệp index.js', command: 'git restore src/index.js' }
        ],
        tags: ['git', 'restore', 'undo', 'discard'],
        viewCount: 175
      },
      {
        categoryId: catMap['git-undo-reset'],
        title: 'Hủy bỏ toàn bộ thay đổi chưa commit ở thư mục hiện tại (git restore .)',
        slug: 'git-restore-all',
        command: 'git restore .',
        description: 'Hủy bỏ tất cả các thay đổi chưa staged trong toàn bộ thư mục hiện tại (đưa toàn bộ về trạng thái commit gần nhất).',
        explanations: [],
        examples: [
          { title: 'Hủy toàn bộ thay đổi', command: 'git restore .' }
        ],
        tags: ['git', 'restore', 'undo', 'discard-all'],
        viewCount: 210
      },
      {
        categoryId: catMap['git-undo-reset'],
        title: 'Hoàn tác thay đổi của tệp tin bằng checkout (git checkout --)',
        slug: 'git-checkout-file-legacy',
        command: 'git checkout -- [file_path]',
        description: 'Cách hoàn tác cổ điển (trước khi có git restore) giúp loại bỏ các thay đổi chưa commit trên một file.',
        explanations: [],
        examples: [
          { title: 'Hoàn tác file config.json', command: 'git checkout -- config.json' }
        ],
        tags: ['git', 'checkout', 'undo', 'legacy'],
        viewCount: 95
      },
      {
        categoryId: catMap['git-undo-reset'],
        title: 'Xóa bỏ các tệp tin và thư mục không được theo dõi (git clean -fd)',
        slug: 'git-clean-fd',
        command: 'git clean -fd',
        description: 'Dọn sạch thư mục làm việc bằng cách xóa bỏ hoàn toàn tất cả các tệp tin (-f) và thư mục con (-d) chưa được đưa vào Git theo dõi (untracked).',
        explanations: [
          { param: '-f', description: 'Force, bắt buộc xóa.' },
      { param: '-d', description: 'Xóa cả các thư mục không được theo dõi.' }
        ],
        examples: [
          { title: 'Xóa mọi tệp untracked', command: 'git clean -fd' }
        ],
        tags: ['git', 'clean', 'delete', 'untracked'],
        viewCount: 155
      },
      {
        categoryId: catMap['git-undo-reset'],
        title: 'Xóa sạch cả tệp untracked và tệp bị bỏ qua (git clean -fdx)',
        slug: 'git-clean-fdx',
        command: 'git clean -fdx',
        description: 'Xóa sạch tất cả các tệp tin untracked kể cả những tệp/thư mục nằm trong danh sách loại trừ `.gitignore` (như node_modules, build files).',
        explanations: [
          { param: '-x', description: 'Xóa cả những file/thư mục bị bỏ qua bởi .gitignore.' }
        ],
        examples: [
          { title: 'Dọn sạch hoàn toàn dự án', command: 'git clean -fdx' }
        ],
        tags: ['git', 'clean', 'purge', 'ignore'],
        viewCount: 180
      },
      {
        categoryId: catMap['git-undo-reset'],
        title: 'Sao chép một commit cụ thể từ nhánh khác (Git Cherry Pick)',
        slug: 'git-cherry-pick-basics',
        command: 'git cherry-pick [commit_sha]',
        description: 'Sao chép và áp dụng một commit duy nhất từ một nhánh bất kỳ sang nhánh hiện tại bạn đang đứng mà không cần merge cả nhánh.',
        explanations: [
          { param: '[commit_sha]', description: 'Mã băm SHA-1 của commit cần sao chép.' }
        ],
        examples: [
          { title: 'Áp dụng commit a1b2c3d', command: 'git cherry-pick a1b2c3d' }
        ],
        tags: ['git', 'cherry-pick', 'commit', 'copy'],
        viewCount: 225
      },
      {
        categoryId: catMap['git-undo-reset'],
        title: 'Quản lý xung đột khi Cherry Pick',
        slug: 'git-cherry-pick-control',
        command: 'git cherry-pick --continue',
        description: 'Các lệnh điều khiển quy trình cherry-pick khi gặp xung đột (conflict): tiếp tục áp dụng sau khi sửa conflict, hủy bỏ hoặc bỏ qua.',
        explanations: [
          { param: '--continue', description: 'Tiếp tục tiến trình sau khi đã giải quyết xung đột bằng tay và staged.' },
      { param: '--abort', description: 'Hủy bỏ hoàn toàn tiến trình cherry-pick và quay về trạng thái ban đầu.' },
      { param: '--skip', description: 'Bỏ qua commit xung đột hiện tại và tiếp tục với các commit tiếp theo (nếu có nhiều).' }
        ],
        examples: [
          { title: 'Hủy bỏ cherry-pick', command: 'git cherry-pick --abort' },
      { title: 'Tiếp tục sau khi sửa lỗi', command: 'git cherry-pick --continue' }
        ],
        tags: ['git', 'cherry-pick', 'conflict', 'control'],
        viewCount: 140
      },
      {
        categoryId: catMap['git-undo-reset'],
        title: 'Đẩy đè code lên Remote an toàn hơn (Force with Lease)',
        slug: 'git-push-force-lease',
        command: 'git push --force-with-lease',
        description: 'Đẩy đè code lên remote nhưng chỉ thực hiện nếu không có ai khác đẩy commit mới lên remote trước đó (tránh ghi đè đè mất code của đồng nghiệp).',
        explanations: [],
        examples: [
          { title: 'Force push an toàn', command: 'git push --force-with-lease' }
        ],
        tags: ['git', 'push', 'force', 'safe'],
        viewCount: 165
      },

      // --- Git Ignore ---
      {
        categoryId: catMap['git-ignore'],
        title: 'Loại bỏ file khỏi theo dõi mà không xóa file vật lý',
        slug: 'git-rm-cached',
        command: 'git rm -r --cached [file_or_directory]',
        description: 'Hủy theo dõi một tệp tin hoặc thư mục đã lỡ commit trước đó, giữ nguyên file trên máy tính của bạn.',
        explanations: [
          { param: '--cached', description: 'Chỉ xóa khỏi chỉ mục Git index, không xóa file thực tế trên ổ đĩa.' }
        ],
        examples: [
          { title: 'Hủy theo dõi file .env', command: 'git rm --cached .env' }
        ],
        tags: ['git', 'ignore', 'remove', 'cached'],
        viewCount: 145
      },
      {
        categoryId: catMap['git-ignore'],
        title: 'Khắc phục lỗi .gitignore không nhận tác dụng (Clear Cache)',
        slug: 'git-clear-cache-gitignore',
        command: 'git rm -r --cached . && git add . && git commit -m "Apply gitignore changes"',
        description: 'Xóa toàn bộ cache theo dõi của thư mục hiện tại để Git bắt buộc cập nhật lại các quy tắc bỏ qua file mới trong tệp `.gitignore`.',
        explanations: [],
        examples: [
          { title: 'Cập nhật lại quy tắc ignore', command: 'git rm -r --cached . && git add . && git commit -m "Apply gitignore changes"' }
        ],
        tags: ['git', 'ignore', 'cache', 'fix'],
        viewCount: 230
      },

      // --- Git Logs & Diff ---
      {
        categoryId: catMap['git-logs'],
        title: 'Xem lịch sử commit dạng sơ đồ rút gọn',
        slug: 'git-log-graph',
        command: 'git log --oneline --graph --all',
        description: 'Hiển thị toàn bộ lịch sử commit của tất cả các nhánh dưới dạng cây sơ đồ trực quan và thông điệp rút gọn trên một dòng.',
        explanations: [
          { param: '--oneline', description: 'Thu gọn mỗi commit hiển thị trên một dòng duy nhất.' },
      { param: '--graph', description: 'Vẽ sơ đồ nhánh (ASCII graph) biểu thị sự rẽ nhánh gộp nhánh.' }
        ],
        examples: [
          { title: 'Xem sơ đồ commit', command: 'git log --oneline --graph --all' }
        ],
        tags: ['git', 'log', 'graph', 'history'],
        viewCount: 160
      },
      {
        categoryId: catMap['git-logs'],
        title: 'So sánh thay đổi chi tiết giữa 2 nhánh (Diff)',
        slug: 'git-diff-branches',
        command: 'git diff [branch_1]..[branch_2]',
        description: 'So sánh sự khác biệt chi tiết của từng dòng code giữa hai nhánh phát triển khác nhau.',
        explanations: [],
        examples: [
          { title: 'So sánh develop và main', command: 'git diff develop..main' }
        ],
        tags: ['git', 'diff', 'compare'],
        viewCount: 105
      },
      {
        categoryId: catMap['git-logs'],
        title: 'Xem ai đã sửa đổi từng dòng code (Blame)',
        slug: 'git-blame-lines',
        command: 'git blame -L [start_line],[end_line] [file_path]',
        description: 'Xem lịch sử chỉnh sửa chi tiết của từng dòng trong một file cụ thể để biết commit hash và tác giả thay đổi dòng đó.',
        explanations: [
          { param: '-L', description: 'Chỉ định khoảng dòng cần truy vấn dữ liệu.' }
        ],
        examples: [
          { title: 'Kiểm tra dòng 10 đến 20 file index.js', command: 'git blame -L 10,20 src/index.js' }
        ],
        tags: ['git', 'blame', 'inspect', 'author'],
        viewCount: 95
      },
      {
        categoryId: catMap['git-logs'],
        title: 'Xem lịch sử các commit chi tiết (git log)',
        slug: 'git-log-simple',
        command: 'git log',
        description: 'Hiển thị danh sách các commit đã thực hiện theo thứ tự thời gian ngược lại, kèm thông tin tác giả, ngày tháng và nội dung tin nhắn commit.',
        explanations: [],
        examples: [
          { title: 'Xem lịch sử commit', command: 'git log' }
        ],
        tags: ['git', 'log', 'history'],
        viewCount: 155
      },
      {
        categoryId: catMap['git-logs'],
        title: 'Xem chi tiết thông tin và thay đổi của một commit (git show)',
        slug: 'git-show-commit',
        command: 'git show [commit_sha]',
        description: 'In ra chi tiết của một commit cụ thể (hoặc commit gần nhất nếu không truyền hash), bao gồm thông tin tác giả và sự thay đổi mã nguồn (code diff).',
        explanations: [],
        examples: [
          { title: 'Xem chi tiết commit', command: 'git show a1b2c3d' },
      { title: 'Xem commit gần nhất', command: 'git show' }
        ],
        tags: ['git', 'show', 'commit', 'inspect'],
        viewCount: 140
      },
      {
        categoryId: catMap['git-logs'],
        title: 'Xem các thay đổi chưa được lưu tạm (git diff)',
        slug: 'git-diff-simple',
        command: 'git diff',
        description: 'Hiển thị sự khác biệt chi tiết giữa thư mục làm việc (Working Directory) và chỉ mục (Staging Area), tức là những gì bạn sửa nhưng chưa add.',
        explanations: [],
        examples: [
          { title: 'Xem khác biệt code', command: 'git diff' }
        ],
        tags: ['git', 'diff', 'changes'],
        viewCount: 185
      },

      // --- VSCode Integration ---
      {
        categoryId: catMap['vscode-git'],
        title: 'Bật tích hợp Git trong settings VSCode',
        slug: 'vscode-enable-git',
        command: '"git.enabled": true',
        description: 'Mở file `settings.json` của VSCode và thêm dòng cấu hình này để kích hoạt bảng điều khiển Source Control mặc định.',
        explanations: [],
        examples: [
          { title: 'Cấu hình Settings JSON', command: '"git.enabled": true' }
        ],
        tags: ['vscode', 'config', 'setup', 'detect'],
        viewCount: 110
      },
      {
        categoryId: catMap['vscode-git'],
        title: 'Thiết lập Terminal mặc định trong VSCode sang Git Bash',
        slug: 'vscode-gitbash-terminal',
        command: '"terminal.integrated.profiles.windows": { "Git Bash": { "path": "C:\\\\Program Files\\\\Git\\\\bin\\\\bash.exe" } }',
        description: 'Thiết lập đường dẫn ứng dụng Git Bash làm terminal mặc định trong VSCode trên Windows giúp chạy tốt các script Unix.',
        explanations: [],
        examples: [
          { title: 'Cấu hình terminal VSCode', command: '"terminal.integrated.defaultProfile.windows": "Git Bash"' }
        ],
        tags: ['vscode', 'terminal', 'gitbash', 'setup'],
        viewCount: 150
      },

      // --- Common Git Errors ---
      {
        categoryId: catMap['git-errors'],
        title: 'Khắc phục lỗi Fatal Not a Git Repository',
        slug: 'git-fix-not-a-repo',
        command: 'git init',
        description: 'Lỗi xảy ra do thư mục hiện hành chưa được khởi tạo Git. Khởi chạy lại lệnh này để tạo thư mục ẩn .git theo dõi code.',
        explanations: [],
        examples: [
          { title: 'Khởi tạo Git', command: 'git init' }
        ],
        tags: ['git', 'error', 'init', 'fix'],
        viewCount: 185
      },
      {
        categoryId: catMap['git-errors'],
        title: 'Sửa lỗi Push Rejected (Non-fast-forward / Commit mới trên Remote)',
        slug: 'git-fix-push-rejected',
        command: 'git pull origin [branch_name] --rebase',
        description: 'Giải quyết lỗi bị từ chối đẩy code do nhánh đích trên remote có commit mới hơn local. Kéo code về đồng thời tự động tái sắp xếp lịch sử trước khi push.',
        explanations: [
          { param: '--rebase', description: 'Gộp commit remote về sau đó đặt các commit local của bạn lên trên cùng.' }
        ],
        examples: [
          { title: 'Giải quyết push rejected nhánh develop', command: 'git pull origin develop --rebase' }
        ],
        tags: ['git', 'error', 'pull', 'rebase', 'fix'],
        viewCount: 245
      },
      {
        categoryId: catMap['git-errors'],
        title: 'Thoát khỏi trạng thái Detached HEAD',
        slug: 'git-fix-detached-head',
        command: 'git switch -c [temp_branch_name]',
        description: 'Khắc phục trạng thái trỏ HEAD trực tiếp về Commit Hash thay vì Branch. Tạo nhanh một nhánh tạm từ vị trí commit này để lưu giữ code an toàn.',
        explanations: [
          { param: '-c', description: 'Tạo nhánh mới và chuyển sang ngay lập tức.' }
        ],
        examples: [
          { title: 'Tạo nhánh cứu hộ code', command: 'git switch -c temp-save-head' }
        ],
        tags: ['git', 'error', 'head', 'branch', 'fix'],
        viewCount: 140
      },

      // --- Practical Workflows ---
      {
        categoryId: catMap['git-workflows'],
        title: 'Quy trình kéo cập nhật mã nguồn an toàn (Pull Workflow)',
        slug: 'git-workflow-pull',
        command: 'git pull origin [branch_name]',
        description: 'Tải và tích hợp code mới nhất từ remote branch về local branch trước khi bắt đầu code tính năng để hạn chế tối đa việc xung đột code nặng.',
        explanations: [],
        examples: [
          { title: 'Cập nhật từ nhánh main', command: 'git pull origin main' }
        ],
        tags: ['git', 'workflow', 'pull', 'sync'],
        viewCount: 195
      },
      {
        categoryId: catMap['git-workflows'],
        title: 'Thông điệp Commit chuẩn quy ước quốc tế (Commit Convention)',
        slug: 'git-commit-convention',
        command: 'git commit -m "feat(auth): add google login validation"',
        description: 'Quy ước viết commit message dễ đọc và chuyên nghiệp: type(scope): mô tả ngắn gọn. Phổ biến: feat, fix, docs, refactor, style, chore.',
        explanations: [],
        examples: [
          { title: 'Commit sửa lỗi giao diện', command: 'git commit -m "fix(ui): adjust responsiveness of navigation bar"' }
        ],
        tags: ['git', 'convention', 'commit', 'best-practice'],
        viewCount: 225
      },
      {
        categoryId: catMap['git-workflows'],
        title: 'Quy trình vá lỗi khẩn cấp trực tiếp (Hotfix Workflow)',
        slug: 'git-workflow-hotfix',
        command: 'git checkout main && git checkout -b hotfix/[bug_name]',
        description: 'Quy trình tạo nhánh vá lỗi từ nhánh sản phẩm chính (main/master) để fix gấp lỗi nghiêm trọng ngoài production.',
        explanations: [],
        examples: [
          { title: 'Tạo nhánh vá lỗi đăng nhập', command: 'git checkout main && git checkout -b hotfix/login-crash' }
        ],
        tags: ['git', 'workflow', 'hotfix', 'production'],
        viewCount: 155
      },

      // --- Terminal Basics ---
      {
        categoryId: catMap['terminal-basics'],
        title: 'Check Listening Network Ports',
        slug: 'powershell-check-port',
        command: 'Get-NetTCPConnection -State Listen -LocalPort [port]',
        description: 'Liệt kê các tiến trình mạng đang lắng nghe (Listen) trên một cổng cụ thể bằng PowerShell.',
        explanations: [
          { param: '-State Listen', description: 'Lọc và chỉ hiển thị các kết nối có trạng thái Lắng nghe.' },
      { param: '-LocalPort', description: 'Số hiệu cổng mạng cần rà soát kiểm tra.' }
        ],
        examples: [
          { title: 'Kiểm tra cổng Web 8080', command: 'Get-NetTCPConnection -State Listen -LocalPort 8080' }
        ],
        tags: ['network', 'port', 'powershell', 'listen'],
        viewCount: 240
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Delete Directory Trees Recursively',
        slug: 'cmd-delete-tree',
        command: 'rmdir /s /q [directory_path]',
        description: 'Xóa hoàn toàn một thư mục chứa đầy đủ thư mục con và tệp tin bên trong một cách nhanh chóng và không yêu cầu xác nhận.',
        explanations: [
          { param: '/s', description: 'Xóa toàn bộ cây thư mục bên trong thư mục mục tiêu.' },
      { param: '/q', description: 'Chế độ im lặng (Quiet Mode), không hiển thị câu hỏi xác nhận Y/N trước khi xóa.' }
        ],
        examples: [
          { title: 'Xóa thư mục tạm thời', command: 'rmdir /s /q C:\\\\temp' }
        ],
        tags: ['cmd', 'delete', 'directory', 'recursive'],
        viewCount: 155
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Chuyển thư mục làm việc (Change Directory)',
        slug: 'terminal-cd',
        command: 'cd [directory_path]',
        description: 'Di chuyển con trỏ làm việc hiện tại của Terminal/Console đến một đường dẫn thư mục chỉ định.',
        explanations: [],
        examples: [
          { title: 'Chuyển vào thư mục Dự án', command: 'cd D:\\\\dev\\\\my-project' },
      { title: 'Quay lại thư mục cha', command: 'cd ..' }
        ],
        tags: ['terminal', 'cd', 'navigation'],
        viewCount: 90
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Liệt kê danh sách tệp tin và thư mục con',
        slug: 'terminal-list-files',
        command: 'dir',
        description: 'Hiển thị danh sách đầy đủ tất cả các tệp tin và thư mục con đang nằm trong thư mục làm việc hiện hành.',
        explanations: [],
        examples: [
          { title: 'Liệt kê trên Windows CMD', command: 'dir' },
      { title: 'Liệt kê chi tiết trên Bash', command: 'ls -la' }
        ],
        tags: ['terminal', 'list', 'ls', 'dir'],
        viewCount: 88
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Tạo thư mục mới (Make Directory)',
        slug: 'terminal-mkdir',
        command: 'mkdir [new_directory_name]',
        description: 'Khởi tạo nhanh một thư mục rỗng mới tại đường dẫn thư mục hiện tại.',
        explanations: [],
        examples: [
          { title: 'Tạo thư mục src', command: 'mkdir src' }
        ],
        tags: ['terminal', 'mkdir', 'folder'],
        viewCount: 80
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Xóa sạch màn hình dòng lệnh (Clear Screen)',
        slug: 'terminal-clear',
        command: 'cls',
        description: 'Dọn sạch toàn bộ văn bản và câu lệnh hiển thị trên màn hình giao diện dòng lệnh hiện tại.',
        explanations: [],
        examples: [
          { title: 'Xóa trên CMD/PowerShell', command: 'cls' },
      { title: 'Xóa trên Git Bash', command: 'clear' }
        ],
        tags: ['terminal', 'clear', 'cls'],
        viewCount: 110
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Xem cấu hình mạng IP máy tính (ipconfig)',
        slug: 'cmd-ipconfig',
        command: 'ipconfig',
        description: 'Hiển thị tất cả các thông số cấu hình mạng TCP/IP hiện tại của máy tính, bao gồm địa chỉ IP, Subnet Mask và Default Gateway.',
        explanations: [],
        examples: [
          { title: 'Xem cấu hình mạng nhanh', command: 'ipconfig' },
      { title: 'Xem chi tiết tất cả card mạng', command: 'ipconfig /all' }
        ],
        tags: ['network', 'ipconfig', 'ip', 'system'],
        viewCount: 220
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Kiểm tra kết nối mạng tới Server (Ping)',
        slug: 'cmd-ping',
        command: 'ping [host_address]',
        description: 'Gửi các gói tin ICMP Echo Request tới một địa chỉ IP hoặc tên miền để kiểm tra độ trễ mạng và khả năng kết nối.',
        explanations: [
          { param: '[host_address]', description: 'Địa chỉ tên miền trang web hoặc địa chỉ IP máy chủ cần kiểm tra.' }
        ],
        examples: [
          { title: 'Kiểm tra kết nối tới Google', command: 'ping google.com' },
      { title: 'Ping liên tục không dừng', command: 'ping google.com -t' }
        ],
        tags: ['network', 'ping', 'latency', 'check'],
        viewCount: 195
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Hiển thị chi tiết thông tin hệ thống (systeminfo)',
        slug: 'cmd-systeminfo',
        command: 'systeminfo',
        description: 'Liệt kê đầy đủ thông tin cấu hình phần cứng, phiên bản hệ điều hành Windows, dung lượng RAM, CPU và các bản vá cập nhật bảo mật đã cài đặt.',
        explanations: [],
        examples: [
          { title: 'Xem thông tin hệ thống', command: 'systeminfo' }
        ],
        tags: ['system', 'hardware', 'os', 'info'],
        viewCount: 120
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Liệt kê toàn bộ tiến trình hệ thống đang chạy (tasklist)',
        slug: 'cmd-tasklist',
        command: 'tasklist',
        description: 'Hiển thị danh sách tất cả các ứng dụng, tiến trình đang chạy ngầm hoặc chạy nổi kèm theo Process ID (PID) của chúng trên Windows.',
        explanations: [],
        examples: [
          { title: 'Xem danh sách tiến trình', command: 'tasklist' }
        ],
        tags: ['system', 'process', 'tasklist', 'pid'],
        viewCount: 160
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Buộc dừng ứng dụng hoặc tiến trình đang chạy (taskkill)',
        slug: 'cmd-taskkill',
        command: 'taskkill /f /im [process_name.exe]',
        description: 'Buộc đóng ngay lập tức một tiến trình ứng dụng đang bị treo hoặc chạy ngầm trên Windows bằng tên hoặc Process ID.',
        explanations: [
          { param: '/f', description: 'Force, buộc đóng tiến trình bất chấp tiến trình đang treo.' },
      { param: '/im', description: 'Image Name, chỉ định tiến trình bằng tên tệp tin thực thi (.exe).' }
        ],
        examples: [
          { title: 'Buộc tắt trình duyệt Chrome', command: 'taskkill /f /im chrome.exe' },
      { title: 'Tắt bằng Process ID (PID)', command: 'taskkill /f /pid 1234' }
        ],
        tags: ['system', 'process', 'taskkill', 'kill'],
        viewCount: 235
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Xem tất cả kết nối cổng mạng port đang mở (netstat)',
        slug: 'cmd-netstat-ports',
        command: 'netstat -ano',
        description: 'Liệt kê chi tiết mọi kết nối mạng đang hoạt động, các cổng đang lắng nghe (listening ports) kèm theo PID quản lý kết nối đó.',
        explanations: [
          { param: '-a', description: 'Hiển thị tất cả các kết nối hoạt động và các cổng TCP/UDP đang lắng nghe.' },
      { param: '-n', description: 'Hiển thị địa chỉ và số cổng dưới dạng số thay vì tên máy chủ.' },
      { param: '-o', description: 'Hiển thị mã ID của tiến trình (PID) liên kết với mỗi kết nối.' }
        ],
        examples: [
          { title: 'Xem danh sách cổng mạng', command: 'netstat -ano' }
        ],
        tags: ['network', 'port', 'netstat', 'pid'],
        viewCount: 270
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Xem nhanh nội dung tệp tin văn bản (type / cat)',
        slug: 'terminal-read-file',
        command: 'type [file_path]',
        description: 'Đọc nhanh toàn bộ nội dung của một tệp tin văn bản (như .txt, .env, .json) và in trực tiếp ra màn hình dòng lệnh.',
        explanations: [],
        examples: [
          { title: 'Đọc tệp tin trên CMD', command: 'type config.json' },
      { title: 'Đọc tệp tin trên Git Bash', command: 'cat config.json' },
      { title: 'Đọc tệp tin trên PowerShell', command: 'Get-Content config.json' }
        ],
        tags: ['terminal', 'read', 'cat', 'type'],
        viewCount: 140
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Hiển thị thư mục hiện tại (pwd)',
        slug: 'terminal-pwd',
        command: 'pwd',
        description: 'Hiển thị đường dẫn tuyệt đối của thư mục làm việc hiện tại của terminal (Print Working Directory).',
        explanations: [],
        examples: [
          { title: 'In thư mục hiện tại', command: 'pwd' }
        ],
        tags: ['terminal', 'pwd', 'directory', 'path'],
        viewCount: 120
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Xóa tệp tin (del / rm)',
        slug: 'terminal-delete-file',
        command: 'del [file_name]',
        description: 'Xóa bỏ một hoặc nhiều tệp tin cụ thể khỏi hệ thống.',
        explanations: [],
        examples: [
          { title: 'Xóa file trên CMD/PowerShell', command: 'del app.log' },
      { title: 'Xóa file trên Git Bash', command: 'rm app.log' }
        ],
        tags: ['terminal', 'delete', 'rm', 'file'],
        viewCount: 165
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Sao chép tệp tin (copy / cp)',
        slug: 'terminal-copy-file',
        command: 'copy [source] [destination]',
        description: 'Sao chép một tệp tin từ vị trí này sang vị trí khác.',
        explanations: [],
        examples: [
          { title: 'Sao chép trên CMD/PowerShell', command: 'copy config.json backup.json' },
      { title: 'Sao chép trên Git Bash', command: 'cp config.json backup.json' }
        ],
        tags: ['terminal', 'copy', 'cp', 'file'],
        viewCount: 130
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Di chuyển hoặc đổi tên tệp tin/thư mục (move / mv)',
        slug: 'terminal-move-file',
        command: 'move [source] [destination]',
        description: 'Di chuyển tệp tin/thư mục sang thư mục đích, hoặc sử dụng để đổi tên tệp tin/thư mục.',
        explanations: [],
        examples: [
          { title: 'Di chuyển tệp tin', command: 'move config.json src/config.json' },
      { title: 'Đổi tên tệp tin', command: 'move old.txt new.txt' },
      { title: 'Di chuyển trên Git Bash', command: 'mv old.txt new.txt' }
        ],
        tags: ['terminal', 'move', 'mv', 'rename'],
        viewCount: 145
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Đổi tên tệp tin hoặc thư mục trên Windows (ren)',
        slug: 'cmd-rename',
        command: 'ren [old_name] [new_name]',
        description: 'Đổi tên của một tệp tin hoặc thư mục hiện tại sang một tên mới một cách nhanh chóng trên Command Prompt.',
        explanations: [],
        examples: [
          { title: 'Đổi tên tệp text', command: 'ren draft.txt final.txt' }
        ],
        tags: ['cmd', 'rename', 'ren', 'file'],
        viewCount: 110
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Xóa thư mục và toàn bộ nội dung con (rm -rf / rmdir)',
        slug: 'terminal-remove-directory',
        command: 'rmdir /s /q [directory]',
        description: 'Xóa bỏ hoàn toàn một thư mục bao gồm tất cả các thư mục con và tệp tin bên trong mà không hỏi xác nhận.',
        explanations: [
          { param: '/s', description: 'Xóa toàn bộ cây thư mục bên trong thư mục đích.' },
      { param: '/q', description: 'Quiet mode, không yêu cầu xác nhận trước khi xóa.' }
        ],
        examples: [
          { title: 'Xóa thư mục trên CMD', command: 'rmdir /s /q temp_build' },
      { title: 'Xóa trên Git Bash / PowerShell', command: 'rm -rf temp_build' }
        ],
        tags: ['terminal', 'rmdir', 'delete', 'folder'],
        viewCount: 220
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Mở nhanh thư mục hiện tại bằng Visual Studio Code (code .)',
        slug: 'terminal-code-dot',
        command: 'code .',
        description: 'Khởi chạy và mở dự án ở thư mục làm việc hiện tại trực tiếp bằng trình soạn thảo mã nguồn VS Code.',
        explanations: [],
        examples: [
          { title: 'Mở thư mục hiện tại trong VSCode', command: 'code .' }
        ],
        tags: ['editor', 'vscode', 'open', 'shortcut'],
        viewCount: 295
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Mở thư mục trong File Explorer của Windows',
        slug: 'terminal-open-explorer',
        command: 'explorer .',
        description: 'Mở ngay lập tức thư mục hiện tại bằng giao diện đồ họa File Explorer của Windows.',
        explanations: [],
        examples: [
          { title: 'Mở explorer từ CMD/PowerShell', command: 'explorer .' },
      { title: 'Mở explorer từ Git Bash', command: 'start .' }
        ],
        tags: ['explorer', 'open', 'folder', 'windows'],
        viewCount: 240
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Xóa bộ nhớ đệm DNS của Windows để sửa lỗi mạng (flushdns)',
        slug: 'cmd-flushdns',
        command: 'ipconfig /flushdns',
        description: 'Xóa sạch bộ nhớ đệm phân giải DNS để cập nhật lại IP mới của tên miền khi gặp lỗi truy cập mạng hoặc đổi DNS.',
        explanations: [],
        examples: [
          { title: 'Làm sạch cache DNS', command: 'ipconfig /flushdns' }
        ],
        tags: ['network', 'dns', 'flush', 'fix'],
        viewCount: 185
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Xem danh sách các đường dẫn biến môi trường PATH',
        slug: 'cmd-view-path',
        command: 'echo %PATH%',
        description: 'In ra danh sách các thư mục chứa các chương trình thực thi mà hệ điều hành sẽ tìm kiếm khi chạy một câu lệnh.',
        explanations: [],
        examples: [
          { title: 'Xem PATH trên CMD', command: 'echo %PATH%' },
      { title: 'Xem PATH trên PowerShell', command: '$env:PATH' },
      { title: 'Xem PATH trên Git Bash', command: 'echo $PATH' }
        ],
        tags: ['system', 'environment', 'path', 'variable'],
        viewCount: 150
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Thêm tạm thời một thư mục vào biến môi trường PATH',
        slug: 'cmd-set-path',
        command: 'set PATH=%PATH%;[directory_path]',
        description: 'Thêm tạm thời một đường dẫn thư mục vào biến PATH của phiên làm việc dòng lệnh hiện tại.',
        explanations: [],
        examples: [
          { title: 'Thêm thư mục bin trên CMD', command: 'set PATH=%PATH%;C:\\tools\\bin' },
      { title: 'Thêm tạm thời trên PowerShell', command: '$env:PATH += ";C:\\tools\\bin"' }
        ],
        tags: ['system', 'environment', 'path', 'set'],
        viewCount: 115
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Kiểm tra phiên bản Node.js và NPM',
        slug: 'terminal-node-npm-version',
        command: 'node -v && npm -v',
        description: 'Kiểm tra xem Node.js và NPM đã được cài đặt và cấu hình biến môi trường thành công hay chưa, cùng với phiên bản hiện tại.',
        explanations: [],
        examples: [
          { title: 'Kiểm tra phiên bản Node và NPM', command: 'node -v && npm -v' }
        ],
        tags: ['node', 'npm', 'version', 'check'],
        viewCount: 280
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Cài đặt dependencies từ file package.json (npm install)',
        slug: 'terminal-npm-install',
        command: 'npm install',
        description: 'Tải và cài đặt toàn bộ các thư viện và package được định nghĩa trong tệp tin `package.json` vào thư mục `node_modules`.',
        explanations: [],
        examples: [
          { title: 'Cài đặt toàn bộ thư viện', command: 'npm install' },
      { title: 'Cài đặt một thư viện cụ thể', command: 'npm install lodash' }
        ],
        tags: ['npm', 'install', 'setup', 'dependencies'],
        viewCount: 260
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Khởi chạy các scripts trong package.json (npm run)',
        slug: 'terminal-npm-run-scripts',
        command: 'npm run [script_name]',
        description: 'Khởi chạy một script đã được cấu hình sẵn trong phần "scripts" của tệp tin `package.json`.',
        explanations: [],
        examples: [
          { title: 'Chạy môi trường dev', command: 'npm run dev' },
      { title: 'Build sản phẩm', command: 'npm run build' },
      { title: 'Chạy server sản phẩm', command: 'npm start' }
        ],
        tags: ['npm', 'run', 'dev', 'build', 'start'],
        viewCount: 290
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Khởi tạo nhanh dự án ReactJS mới (npx create-react-app)',
        slug: 'terminal-npx-create-react-app',
        command: 'npx create-react-app [app_name]',
        description: 'Tải và chạy trực tiếp gói công cụ tạo dự án React mới mà không cần cài đặt vĩnh viễn trên máy.',
        explanations: [],
        examples: [
          { title: 'Khởi tạo app my-app', command: 'npx create-react-app my-app' }
        ],
        tags: ['react', 'create-react-app', 'setup', 'npx'],
        viewCount: 205
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Xem dung lượng ổ đĩa logic hệ thống (wmic)',
        slug: 'cmd-disk-space',
        command: 'wmic logicaldisk get size,freespace,caption',
        description: 'Truy vấn thông số phân vùng ổ đĩa hệ thống hiển thị tên ổ đĩa, tổng dung lượng và dung lượng trống còn lại bằng byte.',
        explanations: [],
        examples: [
          { title: 'Xem dung lượng ổ đĩa', command: 'wmic logicaldisk get size,freespace,caption' }
        ],
        tags: ['system', 'disk', 'space', 'hardware'],
        viewCount: 140
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Tạo nhanh tệp tin rỗng mới (touch)',
        slug: 'terminal-touch-file',
        command: 'touch [file_name]',
        description: 'Tạo một tệp tin trống mới hoặc cập nhật thời gian sửa đổi gần nhất của tệp tin hiện tại.',
        explanations: [],
        examples: [
          { title: 'Tạo file trống trên Git Bash', command: 'touch index.html' },
      { title: 'Tạo file trống trên PowerShell', command: 'New-Item index.html' },
      { title: 'Tạo file trống trên CMD', command: 'type nul > index.html' }
        ],
        tags: ['terminal', 'touch', 'create', 'file'],
        viewCount: 175
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Soạn thảo văn bản trực quan trên terminal (nano)',
        slug: 'terminal-nano-editor',
        command: 'nano [file_name]',
        description: 'Mở trình soạn thảo văn bản đơn giản tích hợp ngay trong terminal để chỉnh sửa nội dung file mà không cần thoát terminal.',
        explanations: [],
        examples: [
          { title: 'Mở file để sửa đổi', command: 'nano .env' }
        ],
        tags: ['terminal', 'editor', 'nano', 'write'],
        viewCount: 160
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Xem lịch sử các câu lệnh đã chạy (history)',
        slug: 'terminal-command-history',
        command: 'history',
        description: 'Liệt kê danh sách các câu lệnh bạn đã nhập và chạy trước đây trong phiên làm việc terminal hiện tại.',
        explanations: [],
        examples: [
          { title: 'Xem lịch sử các lệnh', command: 'history' }
        ],
        tags: ['terminal', 'history', 'logs', 'command'],
        viewCount: 195
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Tìm kiếm chuỗi văn bản trong tệp tin (findstr / grep)',
        slug: 'terminal-find-text',
        command: 'findstr "[text]" [file_path]',
        description: 'Tìm kiếm chính xác các dòng có chứa một chuỗi văn bản cụ thể bên trong một tệp tin và in ra màn hình.',
        explanations: [],
        examples: [
          { title: 'Tìm PORT trong file .env trên CMD', command: 'findstr "PORT" .env' },
      { title: 'Tìm PORT trong file .env trên Git Bash', command: 'grep "PORT" .env' }
        ],
        tags: ['terminal', 'find', 'search', 'text'],
        viewCount: 180
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Tìm vị trí thực thi của câu lệnh hệ thống (where / which)',
        slug: 'terminal-where-command',
        command: 'where [command_name]',
        description: 'Tìm kiếm và in ra đường dẫn tuyệt đối của chương trình thực thi tương ứng với câu lệnh trong thư mục PATH.',
        explanations: [],
        examples: [
          { title: 'Tìm file exe của git trên CMD', command: 'where git' },
      { title: 'Tìm file exe của git trên Git Bash', command: 'which git' }
        ],
        tags: ['system', 'where', 'command', 'executable'],
        viewCount: 130
      },
      {
        categoryId: catMap['terminal-basics'],
        title: 'Tìm tiến trình PID đang chiếm dụng cổng mạng (port PID)',
        slug: 'cmd-port-pid',
        command: 'netstat -ano | findstr :[port]',
        description: 'Tìm kiếm chính xác mã Process ID (PID) đang chạy chiếm dụng cổng mạng được chỉ định để thực hiện buộc dừng/giải phóng.',
        explanations: [],
        examples: [
          { title: 'Tìm PID cổng 3000', command: 'netstat -ano | findstr :3000' }
        ],
        tags: ['network', 'port', 'netstat', 'pid'],
        viewCount: 285
      },
      // --- Antigravity CLI ---
      {
        categoryId: catMap['antigravity-cli'],
        title: 'Cài đặt quy chuẩn Agent cho dự án (Project Agent Rules)',
        slug: 'cli-setup-agent-rules',
        command: '/setup-agent-rules',
        description: 'Hiển thị nội dung cấu hình hệ thống settings.json và các quy tắc tự trị (Rules) cho Frontend React/TypeScript, Backend .NET C#, và Git workflow để dễ dàng khởi tạo thư mục dự án nhanh chóng.',
        explanations: [],
        examples: [
          {
            title: 'Cài đặt Antigravity CLI (Mac/Linux)',
            description: 'Tải và cài đặt tự động Antigravity CLI trên hệ điều hành macOS hoặc Linux.',
            command: 'curl -fsSL https://antigravity.google/cli/install.sh | bash'
          },
          {
            title: 'Cài đặt Antigravity CLI (Windows PowerShell)',
            description: 'Chạy lệnh PowerShell quyền User để tải và cấu hình cài đặt CLI trên Windows.',
            command: 'irm https://antigravity.google/cli/install.ps1 | iex'
          },
          {
            title: 'Cài đặt Antigravity CLI (Windows CMD)',
            description: 'Tải, thực thi script cấu hình install.cmd và tự động dọn dẹp file cài đặt.',
            command: 'curl -fsSL https://antigravity.google/cli/install.cmd -o install.cmd && install.cmd && del install.cmd'
          },
          {
            title: 'Cấu trúc thư mục Plugin (~/.gemini/antigravity-cli/)',
            description: 'Hướng dẫn thiết lập cấu trúc cây thư mục plugins, subagents, skills và rules trong Antigravity CLI để kích hoạt và mở rộng tính năng hệ thống.',
            command: `~/.gemini/antigravity-cli/
├── settings.json               # File cấu hình hệ thống chính (bao gồm {"enableTerminalSandbox": true})
├── global-rules/               # Thư mục chứa quy tắc chung của dự án
│   ├── global.antigravityrules
│   ├── frontend.antigravityrules
│   └── backend.antigravityrules
└── plugins/                    # Thư mục lưu trữ các phần mở rộng (plugins)
    └── <plugin_name>/          # Tên thư mục plugin tự định nghĩa
        ├── plugin.json         # File đánh dấu bắt buộc (Required marker file)
        ├── mcp_config.json     # Khai báo MCP server mở rộng (Tùy chọn)
        ├── hooks.json          # Định nghĩa sự kiện hook hooks (Tùy chọn)
        ├── skills/             # Thư mục lưu trữ kỹ năng skills (Tùy chọn)
        ├── agents/             # Thư mục lưu trữ subagents (Tùy chọn)
        └── rules/              # Thư mục lưu trữ các quy tắc riêng (Tùy chọn)`
          },
          {
            title: '~/.gemini/antigravity-cli/settings.json',
            description: 'Cấu hình hệ thống Antigravity CLI, tích hợp lệnh build/typecheck dự án npx tsc --noEmit trước khi sinh code, khai báo đường dẫn tới các file rules và kích hoạt chế độ sandbox cô lập dòng lệnh bảo mật (enableTerminalSandbox).',
            command: `{
  "system": {
    "engine": "gemini-2.5-pro",
    "temperature": 0.2,
    "maxTokens": 8192,
    "typescriptcheck": "npx tsc --noEmit",
    "enableTerminalSandbox": true
  },
  "rules": {
    "global": "./global-rules/global.antigravityrules",
    "frontend": "./global-rules/frontend.antigravityrules",
    "backend": "./global-rules/backend.antigravityrules"
  }
}`
          },
          {
            title: 'global-rules/global.antigravityrules',
            description: 'Quy chuẩn chung của dự án bao gồm định dạng Git commit message, quy tắc đặt tên nhánh (feat/nvt/EAS-...), bảo mật thông tin nhạy cảm, tuyệt đối không hardcode thuế suất/dữ liệu tài chính, bắt buộc kiểm thử logic không phát sinh lỗi compile.',
            command: `# ==========================================
# GLOBAL RULES - ANTIGRAVITY AGENT
# ==========================================

[GIT_BRANCH_NAMING]
- Nhánh phát triển tính năng bắt buộc tuân thủ định dạng: feat/nvt/EAS-[ticket_number]
- Nhánh sửa lỗi nóng bắt buộc tuân thủ: hotfix/nvt/EAS-[ticket_number]
- Nhánh tái cấu trúc hoặc tối ưu: refactor/nvt/EAS-[ticket_number]

[GIT_COMMIT_CONVENTIONS]
- Định dạng commit message chuẩn: <type>(<scope>): <subject>
- Ví dụ:
  * feat(auth): tích hợp đăng nhập qua Google Identity Services
  * fix(tax): sửa lỗi làm tròn số thập phân hóa đơn VAT
- Loại commit được chấp nhận: feat, fix, refactor, docs, style, test, chore.

[DATA_SECURITY_AND_PRIVACY]
- Nghiêm cấm lưu trữ trực tiếp API Keys, Passwords, Connection Strings, SSH keys vào mã nguồn.
- Mọi dữ liệu cấu hình nhạy cảm phải được khai báo trong tệp tin môi trường (.env, appsettings.json) và đưa vào danh sách bỏ qua (.gitignore).
- Mã hóa dữ liệu người dùng cá nhân (PII) khi lưu trữ xuống cơ sở dữ liệu.

[FINANCIAL_LOGIC_AND_TAXATION]
- Tuyệt đối nghiêm cấm hardcode thuế suất hoặc công thức tính toán tài chính vào code logic.
- Thuế suất và công thức tính toán dòng tiền phải được lấy động qua API cấu hình hoặc lưu trữ trong bảng Cấu hình Hệ thống tại Database.

[TESTING_AND_ZERO_EMIT_POLICY]
- Luôn kiểm thử logic trước khi đẩy lên nhánh chính.
- Bắt buộc chạy kiểm tra lỗi TypeScript/Compile: npx tsc --noEmit hoặc các trình biên dịch tương ứng.
- Tuyệt đối không chấp nhận mã nguồn phát sinh lỗi cảnh báo (warnings/errors) ở môi trường phát triển cục bộ.`
          },
          {
            title: 'global-rules/frontend.antigravityrules',
            description: 'Quy chuẩn phát triển Frontend sử dụng React + TypeScript + Ant Design, tối ưu hóa state bộ lọc để tránh xung đột dữ liệu, và nguyên tắc đóng gói component độc lập.',
            command: `# ==========================================
# FRONTEND RULES - REACT + TS + ANT DESIGN
# ==========================================

[REACT_TYPESCRIPT_STANDARDS]
- Sử dụng Functional Component kết hợp React Hooks.
- Định nghĩa kiểu dữ liệu (TypeScript interfaces/types) rõ ràng cho tất cả Props và State.
- Tránh sử dụng kiểu dữ liệu "any" ở mọi cấp độ; sử dụng "unknown" hoặc generic khi cần linh hoạt.

[ANT_DESIGN_INTEGRATION]
- Sử dụng trực tiếp hệ thống Component của Ant Design (antd) để đảm bảo đồng nhất UI/UX.
- Tùy biến CSS hoặc Theme Tokens qua ConfigProvider để giữ tính nhất quán, không lạm dụng ghi đè class CSS gốc của thư viện.
- Sử dụng Form component của antd cho việc kiểm tra (validation) và quản lý state form dữ liệu đầu vào.

[FILTER_STATE_MANAGEMENT]
- Tránh việc đồng bộ chồng chéo state filter (ví dụ: vừa lưu local state, vừa lưu URL search params gây xung đột tải lại trang).
- Ưu tiên quản lý bộ lọc danh sách (Filter, Search, Pagination) qua URL Search Params làm Single Source of Truth giúp người dùng có thể chia sẻ liên kết trực tiếp (direct link sharing).
- Sử dụng kỹ thuật debounce (tối thiểu 300ms) khi người dùng nhập dữ liệu ô tìm kiếm trước khi thực hiện gửi request API lên server.

[COMPONENT_ENCAPSULATION]
- Đóng gói component chặt chẽ theo nguyên tắc Single Responsibility Principle (mỗi component chỉ làm một nhiệm vụ duy nhất).
- Các component con dùng chung phải được đưa vào thư mục src/components/shared.
- Bọc toàn bộ các tương tác không ổn định hoặc lỗi có thể xảy ra trong React Error Boundaries để ngăn chặn hiện tượng sập trắng trang (White Screen of Death).`
          },
          {
            title: 'global-rules/backend.antigravityrules',
            description: 'Quy chuẩn phát triển Backend sử dụng .NET C# theo Clean Architecture, tối ưu hóa truy vấn LINQ cho MySQL, và quản lý Transaction chặt chẽ cho dòng tiền tài chính.',
            command: `# ==========================================
# BACKEND RULES - .NET C# + CLEAN ARCHITECTURE
# ==========================================

[CLEAN_ARCHITECTURE]
- Phân chia dự án thành 4 phân lớp rõ ràng:
  * Domain: Thực thể nghiệp vụ cốt lõi (Entities, Value Objects), không phụ thuộc vào bất kỳ thư viện ngoài nào.
  * Application: Chứa business logic (Services, Commands, Queries, DTOs).
  * Infrastructure: Triển khai các interface như DBContext, External APIs, Email Service.
  * WebAPI: Cổng tiếp nhận HTTP Request, xử lý định tuyến (Routing) và xác thực (Authentication).

[MYSQL_LINQ_OPTIMIZATION]
- Chỉ truy vấn những trường dữ liệu thực sự cần thiết bằng cách sử dụng .Select() để mapping trực tiếp sang DTO. Tránh lấy nguyên thực thể Entity bằng .ToList().
- Sử dụng .AsNoTracking() cho tất cả các truy vấn chỉ đọc (read-only queries) để bỏ qua bộ nhớ đệm theo dõi thay đổi của Entity Framework Core, cải thiện tốc độ và giảm bộ nhớ RAM.
- Tránh thực hiện truy vấn N+1. Hãy tải trước các mối quan hệ (Eager Loading) thông qua .Include() và .ThenInclude() thay vị sử dụng Lazy Loading.
- Thiết lập chỉ mục (Indexes) trên các cột thường xuyên nằm trong mệnh đề .Where() hoặc .Join().

[TRANSACTION_FOR_CASH_FLOW]
- Mọi nghiệp vụ liên quan đến dòng tiền, bút toán kế toán, nạp rút tiền bắt buộc phải chạy trong một Transaction (giao dịch nguyên tử).
- Sử dụng cấu trúc using var transaction = await _context.Database.BeginTransactionAsync() để tự động rollback khi xảy ra bất kỳ lỗi ngoại lệ (exception) nào trong quá trình xử lý.
- Đảm bảo tính nhất quán dữ liệu ở cả hai bên: tăng số dư tài khoản A và giảm số dư tài khoản B phải thực hiện thành công đồng thời, không chấp nhận việc thực thi một nửa.
- Áp dụng cơ chế Optimistic Concurrency Control (OCC) bằng trường RowVersion/ConcurrencyToken để tránh ghi đè dữ liệu dòng tiền khi có 2 request gửi đồng thời.`
          }
        ],
        tags: ['antigravity', 'rules', 'setup', 'config', 'agent'],
        viewCount: 350
      },
      {
        categoryId: catMap['antigravity-cli'],
        title: 'Mở lại / chuyển đổi phiên hội thoại (Resume / Switch)',
        slug: 'cli-slash-resume',
        command: '/resume',
        description: 'Mở danh sách để chọn và quay lại các phiên chat cũ nhằm tiếp tục cuộc hội thoại trước đó.',
        explanations: [],
        examples: [
          { title: 'Hiển thị danh sách phiên chat cũ', command: '/resume' },
      { title: 'Lệnh thay thế tương đương', command: '/switch' }
        ],
        tags: ['conversation', 'chat', 'switch', 'resume', 'history'],
        viewCount: 120
      },
      {
        categoryId: catMap['antigravity-cli'],
        title: 'Đặt mục tiêu cốt lõi của phiên chat (Goal Selection)',
        slug: 'cli-slash-goal',
        command: '/goal [goal_description]',
        description: 'Khai báo và hiển thị mục tiêu cốt lõi của phiên làm việc hiện tại, giúp định hình hướng đi và giữ cho các Agent tập trung hoàn thành đúng yêu cầu chính.',
        explanations: [
          { param: '[goal_description]', description: 'Mô tả tóm tắt mục tiêu cụ thể mà bạn muốn định hướng cho phiên hội thoại.' }
        ],
        examples: [
          { title: 'Thiết lập mục tiêu sửa lỗi Hydration', command: '/goal Fix React hydration error in layout component' },
      { title: 'Xem mục tiêu hiện tại của phiên chat', command: '/goal' }
        ],
        tags: ['utility', 'goal', 'context', 'focus'],
        viewCount: 190
      },
      {
        categoryId: catMap['antigravity-cli'],
        title: 'Đính kèm tệp tin/thư mục làm ngữ cảnh (Context Attachment)',
        slug: 'cli-slash-file-context',
        command: '@[file_path]',
        description: 'Đính kèm nhanh nội dung của một file hoặc thư mục trực tiếp vào tin nhắn nhắc nhở (prompt) gửi cho AI để làm dữ liệu đầu vào.',
        explanations: [
          { param: '@[file_path]', description: 'Đường dẫn tới file hoặc folder bạn muốn truyền nội dung làm ngữ cảnh (Context).' }
        ],
        examples: [
          { title: 'Truyền nội dung file component làm context', command: '@src/app/page.tsx' },
      { title: 'Truyền nội dung file cấu hình làm context', command: '@package.json' }
        ],
        tags: ['utility', 'file', 'context', 'prompt', 'attachment'],
        viewCount: 250
      },
      {
        categoryId: catMap['antigravity-cli'],
        title: 'Tua ngược / hoàn tác mốc lịch sử chat (Rewind / Undo)',
        slug: 'cli-slash-rewind',
        command: '/rewind',
        description: 'Quay xe! Rollback lịch sử chat về một mốc checkpoint phía trước (rất tiện khi AI viết sai và bạn muốn làm lại).',
        explanations: [],
        examples: [
          { title: 'Tua ngược về mốc checkpoint trước đó', command: '/rewind' },
      { title: 'Lệnh hoàn tác tương đương', command: '/undo' }
        ],
        tags: ['conversation', 'chat', 'rewind', 'undo', 'rollback'],
        viewCount: 135
      },
      {
        categoryId: catMap['antigravity-cli'],
        title: 'Đổi tên phiên chat hiện tại (Rename)',
        slug: 'cli-slash-rename',
        command: '/rename',
        description: 'Đổi tên phiên chat hiện tại để bạn dễ dàng quản lý, tìm kiếm và phân loại các cuộc hội thoại.',
        explanations: [],
        examples: [
          { title: 'Đổi tên phiên chat hiện tại', command: '/rename' }
        ],
        tags: ['conversation', 'chat', 'rename', 'manage'],
        viewCount: 95
      },
      {
        categoryId: catMap['antigravity-cli'],
        title: 'Chọn cấp độ tự trị của AI (Permissions)',
        slug: 'cli-slash-permissions',
        command: '/permissions',
        description: 'Cấu hình và kiểm soát mức độ tự trị của AI (request-review: hỏi trước khi làm, always-proceed: tự động thực thi, strict: nghiêm ngặt).',
        explanations: [],
        examples: [
          { title: 'Mở cấu hình quyền hạn và tự trị của AI', command: '/permissions' }
        ],
        tags: ['config', 'permissions', 'autonomy', 'safety'],
        viewCount: 145
      },
      {
        categoryId: catMap['antigravity-cli'],
        title: 'Chọn mô hình AI mặc định (Model Selection)',
        slug: 'cli-slash-model',
        command: '/model',
        description: 'Chọn model AI mặc định (ví dụ chuyển đổi nhanh giữa Gemini Flash và Gemini Pro) và duy trì cấu hình này cho các phiên sau.',
        explanations: [],
        examples: [
          { title: 'Thay đổi model AI mặc định', command: '/model' }
        ],
        tags: ['config', 'model', 'gemini', 'flash', 'pro'],
        viewCount: 160
      },
      {
        categoryId: catMap['antigravity-cli'],
        title: 'Tự do tùy chỉnh phím tắt hệ thống (Keybindings)',
        slug: 'cli-slash-keybindings',
        command: '/keybindings',
        description: 'Mở giao diện tương tác trực tiếp để tự thay đổi và tùy chỉnh các phím tắt theo sở thích của bạn.',
        explanations: [],
        examples: [
          { title: 'Mở cài đặt phím tắt tương tác', command: '/keybindings' }
        ],
        tags: ['config', 'keybindings', 'shortcuts', 'ui'],
        viewCount: 80
      },
      {
        categoryId: catMap['antigravity-cli'],
        title: 'Tùy biến thanh trạng thái (Statusline)',
        slug: 'cli-slash-statusline',
        command: '/statusline',
        description: 'Cấu hình và tùy biến thanh trạng thái hiển thị thông tin real-time dưới đáy giao diện CLI.',
        explanations: [],
        examples: [
          { title: 'Mở giao diện tùy biến thanh trạng thái', command: '/statusline' }
        ],
        tags: ['config', 'statusline', 'ui', 'statusbar'],
        viewCount: 90
      },
      {
        categoryId: catMap['antigravity-cli'],
        title: 'Quản lý các tác vụ nền đang chạy (Tasks Monitor)',
        slug: 'cli-slash-tasks',
        command: '/tasks',
        description: 'Xem logs trực tiếp, theo dõi tiến độ hoặc ép dừng cưỡng bức (Kill) các tác vụ (tasks) đang chạy ngầm.',
        explanations: [],
        examples: [
          { title: 'Xem danh sách và quản lý các tác vụ ngầm', command: '/tasks' }
        ],
        tags: ['monitor', 'tasks', 'kill', 'logs', 'background'],
        viewCount: 180
      },
      {
        categoryId: catMap['antigravity-cli'],
        title: 'Xem danh sách các quy trình tự động đóng gói (Skills List)',
        slug: 'cli-slash-skills',
        command: '/skills',
        description: 'Xem chi tiết các quy trình đóng gói (workflows/skills) tự động hóa đang có sẵn trên hệ thống của bạn.',
        explanations: [],
        examples: [
          { title: 'Xem danh sách các workflow/skills', command: '/skills' }
        ],
        tags: ['monitor', 'skills', 'workflows', 'list'],
        viewCount: 110
      },
      {
        categoryId: catMap['antigravity-cli'],
        title: 'Cấu hình và quản lý Model Context Protocol (MCP Servers)',
        slug: 'cli-slash-mcp',
        command: '/mcp',
        description: 'Mở bảng điều khiển cấu hình và quản lý các kết nối server Model Context Protocol (MCP) để mở rộng chức năng.',
        explanations: [],
        examples: [
          { title: 'Quản lý các kết nối MCP server', command: '/mcp' }
        ],
        tags: ['monitor', 'mcp', 'servers', 'config'],
        viewCount: 150
      },
      {
        categoryId: catMap['antigravity-cli'],
        title: 'Mở nhanh file bằng editor bên ngoài (Open File)',
        slug: 'cli-slash-open',
        command: '/open [file_path]',
        description: 'Khởi chạy và mở nhanh một file mã nguồn bất kỳ bằng trình soạn thảo/editor bên ngoài (chẳng hạn như VS Code).',
        explanations: [
          { param: '[file_path]', description: 'Đường dẫn tuyệt đối hoặc tương đối dẫn tới tệp tin bạn cần mở.' }
        ],
        examples: [
          { title: 'Mở file package.json bằng editor mặc định', command: '/open package.json' }
        ],
        tags: ['utility', 'open', 'editor', 'vscode', 'file'],
        viewCount: 200
      },
      {
        categoryId: catMap['antigravity-cli'],
        title: 'Xem cuốn sách tài liệu hướng dẫn trực tiếp (CLI Usage)',
        slug: 'cli-slash-usage',
        command: '/usage',
        description: 'Mở và đọc tài liệu hướng dẫn sử dụng và cài đặt chi tiết trực tiếp ngay trong Terminal/CLI.',
        explanations: [],
        examples: [
          { title: 'Hiển thị sách hướng dẫn cài đặt và sử dụng CLI', command: '/usage' }
        ],
        tags: ['utility', 'usage', 'docs', 'manual'],
        viewCount: 130
      },
      {
        categoryId: catMap['antigravity-cli'],
        title: 'Đăng xuất tài khoản Google hiện tại (Logout)',
        slug: 'cli-slash-logout',
        command: '/logout',
        description: 'Đăng xuất tài khoản Google đang sử dụng và xóa sạch hoàn toàn các token đã được lưu trữ (rất hữu ích khi bạn cần đổi sang Gmail mới!).',
        explanations: [],
        examples: [
          { title: 'Đăng xuất và xóa token lưu trữ', command: '/logout' }
        ],
        tags: ['account', 'logout', 'google', 'token', 'auth'],
        viewCount: 220
      },
      {
        categoryId: catMap['antigravity-ide'],
        title: 'Thiết lập và quản lý Kỹ năng (Skills Architecture)',
        slug: 'ide-skills-architecture',
        command: 'skills',
        description: 'Định cấu hình nơi lưu trữ, phạm vi hoạt động của Kỹ năng (Skills) và cách tổ chức thư mục chuẩn hóa theo hướng dẫn phát triển của Google Antigravity.',
        explanations: [],
        examples: [
          {
            title: 'Vị trí lưu trữ Kỹ năng (Where skills live)',
            description: 'Antigravity hỗ trợ hai phạm vi hoạt động (Scope) dựa trên đường dẫn lưu trữ thư mục Skill.',
            command: `+-----------------------------------------------+-----------------------------------------+
| Đường dẫn lưu trữ (Location)                   | Phạm vi hoạt động (Scope)               |
+-----------------------------------------------+-----------------------------------------+
| <workspace-root>/.agents/skills/<skill-name>/ | Chỉ áp dụng trong workspace hiện tại     |
|                                               | (Workspace-specific)                    |
+-----------------------------------------------+-----------------------------------------+
| ~/.gemini/antigravity/skills/<skill-name>/    | Áp dụng trên toàn bộ hệ thống           |
|                                               | (Global - all workspaces)               |
+-----------------------------------------------+-----------------------------------------+`
          },
      {
            title: 'Cấu trúc thư mục của một Skill chuẩn (~/.agents/skills/<skill-name>/)',
            description: 'Các thư mục con và file đánh dấu bắt buộc theo đặc tả tiêu chuẩn tại https://www.antigravity.google/docs/skills.',
            command: `<skill-name>/                   # Thư mục chứa kỹ năng tự định nghĩa
├── SKILL.md                    # File quy chuẩn/hướng dẫn cốt lõi (Bắt buộc)
├── scripts/                    # Thư mục chứa các kịch bản/scripts bổ trợ (Tùy chọn)
│   ├── build.py                # Kịch bản build dự án mẫu
│   └── test.py                 # Kịch bản chạy test tự động
├── resources/                  # Chứa tài liệu, file tĩnh hoặc config (Tùy chọn)
│   └── templates/              # Các templates mẫu phục vụ sinh code
└── examples/                   # Ví dụ minh họa thực tế sử dụng (Tùy chọn)
    └── demo.js                 # File ví dụ mẫu`
          },
      {
            title: 'Cấu trúc file đặc tả kỹ năng (SKILL.md)',
            description: 'File SKILL.md bắt buộc phải khai báo Frontmatter YAML ở trên cùng để Antigravity nhận diện các kỹ năng tương ứng.',
            command: `---
skills:
  - name: my-custom-skill
    description: "Kỹ năng tùy chỉnh hỗ trợ tối ưu hóa quy trình kiểm thử và deploy"
    author: "Văn Thiết"
    version: "1.0.0"
---

# Hướng dẫn Kỹ năng Custom

Cung cấp các quy tắc hướng dẫn chi tiết dành cho Agent ở đây...
1. Quy tắc 1...
2. Quy tắc 2...`
          }
        ],
        workflows: [
          {
            description: 'Tạo Kỹ năng mới (Create custom skill) và cấu hình tệp đặc tả',
            content: 'npx antigravity skill create my-custom-skill\n# Chạy CLI khởi tạo thư mục .agents/skills/my-custom-skill/\n# Tạo file SKILL.md với Frontmatter và file scripts/run.py',
            terminalScript: [
              '$ npx antigravity skill create my-custom-skill',
              'Initializing new custom skill: my-custom-skill...',
              '✓ Created folder: .agents/skills/my-custom-skill',
              '✓ Created file: .agents/skills/my-custom-skill/SKILL.md',
              '✓ Created folder: .agents/skills/my-custom-skill/scripts',
              '✓ Created file: .agents/skills/my-custom-skill/scripts/run.py',
              'Skill my-custom-skill created successfully! Now you can edit SKILL.md to configure its rules.'
            ]
          },
          {
            description: 'Kiểm thử chạy thử nghiệm Kỹ năng (Test custom skill)',
            content: 'npx antigravity skill test my-custom-skill --input "hello test"',
            terminalScript: [
              '$ npx antigravity skill test my-custom-skill --input "hello test"',
              'Running verification tests for skill: my-custom-skill...',
              'ℹ Loading skill rules from .agents/skills/my-custom-skill/SKILL.md',
              'ℹ Executing script: python .agents/skills/my-custom-skill/scripts/run.py',
              '✓ Test passed: output matches expected schema!',
              '✓ Skill validation completed without any compile warnings.'
            ]
          }
        ],
        tags: ['antigravity', 'skills', 'setup', 'config', 'ide'],
        viewCount: 420
      },
      {
        categoryId: catMap['antigravity-ide'],
        title: 'Thiết lập và phân vùng Quy tắc (Rules Architecture)',
        slug: 'ide-rules-architecture',
        command: 'rules',
        description: 'Định cấu hình vị trí lưu trữ, phạm vi hoạt động của các quy tắc tự trị (Rules) cho Agent và quy chuẩn viết file quy tắc (.antigravityrules).',
        explanations: [],
        examples: [
          {
            title: 'Vị trí lưu trữ Quy tắc (Where rules live)',
            description: 'Antigravity hỗ trợ hai phạm vi áp dụng quy tắc dựa trên đường dẫn tệp tin quy tắc.',
            command: `+-----------------------------------------------+-----------------------------------------+
| Đường dẫn lưu trữ (Location)                   | Phạm vi hoạt động (Scope)               |
+-----------------------------------------------+-----------------------------------------+
| <workspace-root>/.agents/rules/               | Áp dụng cục bộ trong dự án hiện tại     |
| <workspace-root>/*.antigravityrules           | (Workspace-specific)                    |
+-----------------------------------------------+-----------------------------------------+
| ~/.gemini/antigravity/rules/                  | Áp dụng toàn cục trên mọi dự án         |
|                                               | (Global - all workspaces)               |
+-----------------------------------------------+-----------------------------------------+`
          },
      {
            title: 'Cấu trúc định dạng file quy tắc (*.antigravityrules)',
            description: 'File rules sử dụng định dạng INI-like kết hợp Markdown để chia nhóm và định nghĩa các luật cụ thể.',
            command: `# ==========================================
# [TÊN_NHÓM_QUY_TẮC]
# ==========================================

[RULE_IDENTIFIER]
- Mô tả quy tắc phát triển phần mềm số 1.
- Mô tả quy tắc phát triển phần mềm số 2.
- Ví dụ:
  * Cách viết đúng:
    \`\`\`typescript
    const taxRate = getTaxRateFromDatabase();
    \`\`\`
  * Cách viết sai (Tránh):
    \`\`\`typescript
    const taxRate = 0.1; // Hardcoded tax rate!
    \`\`\`

[ANOTHER_RULE]
- Quy định tiếp theo dành cho Agent...`
          }
        ],
        workflows: [
          {
            description: 'Tạo tệp quy chuẩn phát triển tự trị cho Frontend và Backend',
            content: 'npx antigravity rules init\n# Tạo file global.antigravityrules chứa định dạng commit/branch\n# Tạo file frontend.antigravityrules chứa quy tắc React/TypeScript',
            terminalScript: [
              '$ npx antigravity rules init',
              'Generating project-level agent rules...',
              '✓ Created file: global-rules/global.antigravityrules',
              '✓ Created file: global-rules/frontend.antigravityrules',
              '✓ Created file: global-rules/backend.antigravityrules',
              'ℹ Added rules mappings to ~/.gemini/antigravity-cli/settings.json',
              'Project rules initialized successfully! Next time you run Antigravity, the Agent will read these files to audit your commits and pull requests.'
            ]
          },
          {
            description: 'Quét và kiểm tra sự tuân thủ quy tắc trong mã nguồn (Scan rules compliance)',
            content: 'npx antigravity rules check --target src/app/page.tsx',
            terminalScript: [
              '$ npx antigravity rules check --target src/app/page.tsx',
              'Auditing files against global.antigravityrules and frontend.antigravityrules...',
              'ℹ Checking src/app/page.tsx...',
              '⚠ Warning: Hardcoded financial constant found in React component (line 42).',
              '✗ Error: Missing TypeScript interface definitions for component props (line 12).',
              'Rules check failed with 1 error, 1 warning. Please fix code or configure bypass.'
            ]
          }
        ],
        tags: ['antigravity', 'rules', 'setup', 'config', 'ide'],
        viewCount: 450
      },
      {
        categoryId: catMap['antigravity-ide'],
        title: 'Cấu hình Model Context Protocol (MCP Config)',
        slug: 'ide-mcp-config',
        command: 'mcp',
        description: 'Định cấu hình kết nối các MCP servers mở rộng giúp Agent giao tiếp với cơ sở dữ liệu, API bên ngoài, hoặc các dịch vụ hệ thống khác.',
        explanations: [
          { param: 'args (string[])', description: 'Các đối số dòng lệnh để khởi chạy stdio server.' },
      { param: 'env (object)', description: 'Các biến môi trường truyền cho tiến trình stdio server.' },
      { param: 'cwd (string)', description: 'Thư mục làm việc hiện tại của stdio server.' },
      { param: 'headers (object)', description: 'Các HTTP headers tùy chỉnh khi kết nối tới remote server.' },
      { param: 'authProviderType (string)', description: 'Phương thức xác thực. Hỗ trợ "google_credentials" cho ADC.' },
      { param: 'oauth (object)', description: 'Thông tin xác thực OAuth client (clientId, clientSecret).' },
      { param: 'disabled (boolean)', description: 'Tạm thời vô hiệu hóa server mà không cần xóa cấu hình.' },
      { param: 'disabledTools (string[])', description: 'Danh sách tên các công cụ của server này không cấp cho model.' }
        ],
        examples: [
          {
            title: 'Vị trí tệp cấu hình MCP (mcp_config.json)',
            description: 'Tệp cấu hình chính của MCP được cấu trúc lại và lưu trữ toàn cục tại thư mục cá nhân.',
            command: '~/.gemini/antigravity/mcp_config.json'
          },
      {
            title: 'Định dạng cấu hình MCP Server mẫu đầy đủ',
            description: 'Ví dụ khai báo cấu hình đa dạng các tham số tùy chọn (args, env, cwd, disabled, disabledTools) cho cả stdio và remote server.',
            command: `{
  "mcpServers": {
    "my-postgres-db": {
      "command": "node",
      "args": ["dist/index.js"],
      "env": {
        "DB_URI": "postgresql://localhost/mydb"
      },
      "cwd": "/users/antigravity/mcp-postgres",
      "disabled": false,
      "disabledTools": ["unsafe_query", "delete_all"]
    },
    "custom-remote-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-remote-api"],
      "headers": {
        "X-API-Version": "v2"
      },
      "authProviderType": "google_credentials",
      "oauth": {
        "clientId": "your-client-id",
        "clientSecret": "your-client-secret"
      }
    }
  }
}`
          }
        ],
        workflows: [
          {
            description: 'Đăng ký MCP Server mới dạng stdio',
            content: 'npx antigravity mcp add postgres --command "node" --args "dist/index.js" --env DB_URI="postgresql://localhost/mydb"',
            terminalScript: [
              '$ npx antigravity mcp add postgres --command "node" --args "dist/index.js" --env DB_URI="postgresql://localhost/mydb"',
              'Registering stdio MCP Server: postgres...',
              'ℹ Reading config: ~/.gemini/antigravity/mcp_config.json',
              '✓ Added "my-postgres-db" server config successfully!',
              '✓ Validated connection: Server started in stdio mode and returned 14 active tools.',
              'MCP server postgres is now active!'
            ]
          },
          {
            description: 'Liệt kê danh sách các MCP Server đang hoạt động và tình trạng sức khỏe (Healthcheck)',
            content: 'npx antigravity mcp list',
            terminalScript: [
              '$ npx antigravity mcp list',
              'Fetching configured MCP servers status...',
              '+----------------------+----------+---------+-------------+',
              '| Server Name          | Protocol | Status  | Tools Count |',
              '+----------------------+----------+---------+-------------+',
              '| my-postgres-db       | stdio    | ONLINE  | 14 tools    |',
              '| custom-remote-server | remote   | ONLINE  | 5 tools     |',
              '+----------------------+----------+---------+-------------+',
              '✓ All 2 servers are healthy and responding in under 120ms.'
            ]
          }
        ],
        tags: ['antigravity', 'mcp', 'setup', 'config', 'ide'],
        viewCount: 480
      },
    ]);

    invalidateCache();

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully with advanced developer cheat-sheet topics split into individual categories!',
      seeded: {
        categoriesCount: categories.length,
        commandsCount: seededCommands.length
      }
    }, { headers: rlHeaders });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message },
      { status: 500 });
  }
}

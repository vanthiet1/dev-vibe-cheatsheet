/**
 * DOM Defender Utility for Dev-Vibe Cheatsheet
 * Implements premium browser-only defense shields (right-click blocking, inspect keys blocking,
 * and dynamic anti-tampering debugger loop) that automatically bypass search engine crawlers (SEO-safe).
 */

export function initDomDefender() {
  if (typeof window === "undefined") return;

  // 1. Kiểm tra xem tác nhân truy cập có phải là Bot tìm kiếm hay không (Googlebot, Bingbot, Lighthouse, v.v.)
  const userAgent = navigator.userAgent || "";
  const isSearchBot = /bot|google|baidu|bing|msn|duckduckgo|teoma|slurp|yandex|lighthouse|lighthouse-speed/i.test(userAgent);

  // Nếu là Bot tìm kiếm, bỏ qua hoàn toàn các chốt chặn bảo mật để đảm bảo SEO trơn tru 100%
  if (isSearchBot) {
    console.log("[DomDefender] Search engine bot detected. Security shields bypassed for SEO indexation.");
    return;
  }

  // 2. Chặn chuột phải (Context Menu)
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  }, false);

  // 3. Chặn các phím nóng Inspect và DevTools
  document.addEventListener("keydown", (e) => {
    // Chặn F12
    if (e.key === "F12" || e.keyCode === 123) {
      e.preventDefault();
      return false;
    }

    // Chặn Ctrl + Shift + I (Inspect)
    if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.keyCode === 73)) {
      e.preventDefault();
      return false;
    }

    // Chặn Ctrl + Shift + J (Console)
    if (e.ctrlKey && e.shiftKey && (e.key === "J" || e.keyCode === 74)) {
      e.preventDefault();
      return false;
    }

    // Chặn Ctrl + Shift + C (Element Selector)
    if (e.ctrlKey && e.shiftKey && (e.key === "C" || e.keyCode === 67)) {
      e.preventDefault();
      return false;
    }

    // Chặn Ctrl + U (Xem source code HTML thô)
    if (e.ctrlKey && (e.key === "u" || e.key === "U" || e.keyCode === 85)) {
      e.preventDefault();
      return false;
    }

    // Chặn Ctrl + S (Lưu trang web)
    if (e.ctrlKey && (e.key === "s" || e.key === "S" || e.keyCode === 83)) {
      e.preventDefault();
      return false;
    }
  }, false);

  // 4. Vòng lặp phát hiện DevTools thông qua debugger và đóng băng tiến trình
  const debuggerActive = true;

  const devtoolsDefender = () => {
    if (!debuggerActive) return;
    
    const startTime = performance.now();
    
    // Thao tác debug này sẽ dừng luồng thực thi nếu DevTools đang mở
    // Khiến lập trình viên cố soi code sẽ bị kẹt luồng vô tận
    (() => {
      const func = function() {
        // Vòng lặp debugger liên tục
        debugger;
      };
      func();
    })();
    
    const endTime = performance.now();
    
    // Nếu phát hiện có độ trễ thực thi (dấu hiệu DevTools đang mở và chạm breakpoint debugger)
    if (endTime - startTime > 100) {
      // Xóa màn hình console liên tục để không xem được log
      console.clear();
      console.log("%c[Security Warning] Access Denied!", "color: red; font-size: 24px; font-weight: bold;");
      console.log("Cảnh báo: Hành vi soi mã nguồn bị cấm trên hệ thống!");
    }
    
    // Tiếp tục lập lịch tự gọi lại
    setTimeout(devtoolsDefender, 500);
  };

  // Kích hoạt bẫy debugger sau khi trang tải xong 1 giây để tránh ảnh hưởng đến tốc độ render ban đầu
  setTimeout(() => {
    devtoolsDefender();
  }, 1000);
}

const BOT_USER_AGENTS = /bot|google|baidu|bing|msn|duckduckgo|teoma|slurp|yandex|lighthouse|lighthouse-speed/i;

function isSearchBot(): boolean {
  return BOT_USER_AGENTS.test(navigator.userAgent || "");
}

function disableContextMenu(): void {
  document.addEventListener("contextmenu", (e) => e.preventDefault(), false);
}

function disableInspectHotkeys(): void {
  const isInspectKey = (e: KeyboardEvent): boolean => {
    if (e.key === "F12" || e.keyCode === 123) return true;
    
    if (e.ctrlKey && e.shiftKey) {
      const keys = ["I", "J", "C"];
      const keyCodes = [73, 74, 67];
      return keys.includes(e.key.toUpperCase()) || keyCodes.includes(e.keyCode);
    }
    
    if (e.ctrlKey) {
      const keys = ["U", "S"];
      const keyCodes = [85, 83];
      return keys.includes(e.key.toUpperCase()) || keyCodes.includes(e.keyCode);
    }
    
    return false;
  };

  document.addEventListener("keydown", (e) => {
    if (isInspectKey(e)) {
      e.preventDefault();
    }
  }, false);
}

function launchDebuggerTrap(): void {
  const triggerTrap = () => {
    const startTime = performance.now();
    (() => {
      const dbg = function() {
        debugger;
      };
      dbg();
    })();
    return performance.now() - startTime > 100;
  };

  const check = () => {
    if (triggerTrap()) {
      console.clear();
      console.log("%c[Security Warning] Access Denied!", "color: red; font-size: 24px; font-weight: bold;");
    }
    setTimeout(check, 500);
  };

  setTimeout(check, 1000);
}

export function initDomDefender(): void {
  if (typeof window === "undefined" || isSearchBot()) return;

  disableContextMenu();
  disableInspectHotkeys();
  launchDebuggerTrap();
}

console.log(
    '%cbuild from PakePlus： https://github.com/Sjj1024/PakePlus',
    'color:orangered;font-weight:bolder'
)
let menu = null

// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

document.addEventListener('click', hookClick, { capture: true })

document.addEventListener('contextmenu', function(e) {
  const blockedKeywords = ['login', 'register'];
  const target = e.target;

  // 规则1：检查 input 的 placeholder 是否为 "全部"
  const checkBlockedPlaceholder = () => {
    const inputDirect = target.closest('input');
    if (inputDirect?.placeholder === '全部') return true;

    const uiContainer = target.closest('.el-input, .ant-input');
    if (uiContainer) {
      const innerInput = uiContainer.querySelector('input');
      if (innerInput?.placeholder === '全部') return true;
    }
    return false;
  };

  // 规则2：检查图像链接是否包含 "navlogo"
  const checkNavLogoImage = () => {
    // 获取图片元素或父级链接
    const img = target.closest('img');
    const parentLink = target.closest('a');

    // 检查图片属性
    if (img) {
      const src = (img.src || '').toLowerCase();
      const alt = (img.alt || '').toLowerCase();
      if (src.includes('navlogo') || alt.includes('navlogo')) return true;
    }

    // 检查父级链接属性
    if (parentLink) {
      const href = (parentLink.href || '').toLowerCase();
      const text = (parentLink.textContent || '').toLowerCase();
      if (href.includes('navlogo') || text.includes('navlogo')) return true;
    }

    return false;
  };

  // 规则3：检查链接是否包含关键字
  const checkBlockedLink = () => {
    const targetLink = target.closest('a');
    if (!targetLink) return false;

    const href = (targetLink.href || '').toLowerCase();
    const text = (targetLink.textContent || '').toLowerCase();
    return blockedKeywords.some(keyword => 
      href.includes(keyword) || text.includes(keyword)
    );
  };

  // 规则4：允许显示的元素类型
  const checkAllowedElements = () => {
    return target.closest('a, img');
  };

  // 执行检查流程
  if (
    checkBlockedPlaceholder() || // 规则1
    checkNavLogoImage() ||        // 规则2（新增）
    checkBlockedLink()            // 规则3
  ) {
    e.preventDefault();
    return;
  }

  // 非允许元素时拦截
  if (!checkAllowedElements()) {
    e.preventDefault();
      // 更新菜单位置
                let posX = e.pageX;
                let posY = e.pageY;
                
                // 防止菜单溢出窗口
                const menuWidth = menu.offsetWidth;
                const menuHeight = menu.offsetHeight;
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;
                
                if (posX + menuWidth > windowWidth) {
                    posX = windowWidth - menuWidth - 10;
                }
                
                if (posY + menuHeight > windowHeight) {
                    posY = windowHeight - menuHeight - 10;
                }
                
                menu.style.left = `${posX}px`;
                menu.style.top = `${posY}px`;
                
                // 显示菜单
                menu.style.display = 'block';
                menu.style.opacity = '0';
                
                // 使用动画效果显示菜单
                setTimeout(() => {
                    menu.style.transition = 'opacity 0.15s ease';
                    menu.style.opacity = '1';
                }, 10);
  }
});



 document.addEventListener('DOMContentLoaded', () => {
            // 创建菜单容器
            menu = document.createElement('div');
            menu.id = 'customContextMenu';
            
            // 创建菜单项
            const menuItems = [
                {id: 'backButton', text: '后退', icon: '↩'},
                {id: 'forwardButton', text: '前进', icon: '↪'},
                {id: 'refreshButton', text: '刷新页面', icon: '🔄'},
                {id: 'hardRefreshButton', text: '强制刷新', icon: '⭮'}
            ];
            
            menuItems.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.className = 'menu-item';
                menuItem.id = item.id;
                menuItem.innerHTML = `<span class="menu-icon">${item.icon}</span> ${item.text}`;
                menu.appendChild(menuItem);
            });
            
            // 添加分隔线
            const divider1 = document.createElement('div');
            divider1.className = 'divider';
            menu.insertBefore(divider1, menu.children[2]);
            
            const divider2 = document.createElement('div');
            divider2.className = 'divider';
            menu.insertBefore(divider2, menu.children[4]);
            
            // 添加到文档
            document.body.appendChild(menu);
            
            // 创建样式
            const style = document.createElement('style');
            style.textContent = `
                #customContextMenu {
                    position: fixed;
                    display: none;
                    background: rgba(30, 30, 30, 0.95);
                    border-radius: 6px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                    padding: 8px 0;
                    width: 180px;
                    z-index: 1000;
                    overflow: hidden;
                    font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
                    backdrop-filter: blur(4px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    animation: menuAppear 0.15s ease-out forwards;
                }
                
                @keyframes menuAppear {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                
                .menu-item {
                    padding: 10px 20px;
                    font-size: 14px;
                    color: #e0e0e0;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    transition: all 0.2s ease;
                }
                
                .menu-item:hover {
                    background: rgba(70, 130, 180, 0.3);
                    color: #fff;
                }
                
                .menu-icon {
                    margin-right: 10px;
                    font-size: 16px;
                    width: 20px;
                    text-align: center;
                }
                
                .divider {
                    height: 1px;
                    margin: 6px 0;
                    background: rgba(255, 255, 255, 0.15);
                }
            `;
            document.head.appendChild(style);
            
            
            // 点击页面其他地方时隐藏菜单
            document.addEventListener('click', () => {
                if (menu.style.display === 'block') {
                    menu.style.opacity = '0';
                    setTimeout(() => {
                        menu.style.display = 'none';
                        menu.style.transition = 'none';
                    }, 150);
                }
            });
            
            // 添加功能按钮事件监听
            document.getElementById('refreshButton').addEventListener('click', () => {
                menu.style.display = 'none';
                setTimeout(() => {
                    location.reload();
                }, 150);
            });
            
            // 强制刷新功能实现
            document.getElementById('hardRefreshButton').addEventListener('click', () => {
                menu.style.display = 'none';
                setTimeout(() => {
                    // 强制刷新实现方式：添加时间戳参数绕过缓存
                    const url = new URL(window.location.href);
                    url.searchParams.set('_', Date.now());
                    window.location.href = url.toString();
                }, 150);
            });
            
            document.getElementById('backButton').addEventListener('click', () => {
                menu.style.display = 'none';
                setTimeout(() => {
                    history.back();
                }, 150);
            });
            
            document.getElementById('forwardButton').addEventListener('click', () => {
                menu.style.display = 'none';
                setTimeout(() => {
                    history.forward();
                }, 150);
            });
            
            // 添加键盘快捷键支持
            document.addEventListener('keydown', (e) => {
                if (menu.style.display === 'block') {
                    // Escape键关闭菜单
                    if (e.key === 'Escape') {
                        menu.style.display = 'none';
                    }
                }
            });
          
        });

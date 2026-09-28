<!-- 由 scripts/sync-gearui-kit.mjs 从 gearui-kit 的 ComponentConfig.kt 生成。请勿手改；重新运行脚本。 -->

# 组件

GearUI Kit 提供 **82 个组件**，分 6 类。每一个在 sample 里都有对应演示页；下表中的名字就是你从 `com.gearui.components.*` import 的 composable 名。

本页由 sample 的组件注册表生成，因此不会与 sample 实际展示的内容不一致。

## 基础（9）

| 组件 | 中文名 | 用途 |
| --- | --- | --- |
| `Button` | 按钮 | 用于触发操作 |
| `Icon` | 图标 | 图标展示 |
| `Link` | 链接 | 文本链接与链接按钮 |
| `CloseButton` | 关闭按钮 | 统一的关闭/移除按钮 |
| `PressableFeedback` | 按压反馈 | 任意可点区域的缩放与高亮 |
| `Text` | 文本 | 文本展示 |
| `Tag` | 标签 | 标记和分类 |
| `Badge` | 徽标 | 消息数量提示 |
| `Divider` | 分割线 | 内容分隔 |

## 表单（22）

| 组件 | 中文名 | 用途 |
| --- | --- | --- |
| `Input` | 输入框 | 文本输入 |
| `Checkbox` | 复选框 | 多选操作 |
| `Radio` | 单选框 | 单选操作 |
| `InputOTP` | 验证码输入 | 分格验证码输入 |
| `ComboBox` | 输入选择器 | 输入筛选的下拉选择 |
| `NumberField` | 数字输入 | 可输入可步进的数字字段 |
| `ToggleButton` | 切换按钮 | 保持按下状态的按钮与按钮组 |
| `InputGroup` | 输入框组 | 带前后附加块的输入框 |
| `Switch` | 开关 | 开关选择 |
| `Slider` | 滑块 | 数值选择 |
| `Stepper` | 步进器 | 数字增减 |
| `Textarea` | 多行输入 | 多行文本输入 |
| `Rate` | 评分 | 评分操作 |
| `Select` | 下拉选择 | 下拉选择器 |
| `Picker` | 选择器 | 多列选择 |
| `DatePicker` | 日期选择 | 日期时间选择 |
| `DropdownMenu` | 下拉菜单 | 筛选下拉菜单 |
| `Upload` | 上传 | 文件上传 |
| `Form` | 表单 | 表单容器 |
| `Cascader` | 级联选择 | 级联选择器 |
| `Transfer` | 穿梭框 | 数据穿梭选择 |
| `TreeSelect` | 树选择 | 树形选择器 |

## 导航（12）

| 组件 | 中文名 | 用途 |
| --- | --- | --- |
| `NavBar` | 导航栏 | 通用页面导航栏 |
| `BottomNavBar` | 底部导航栏 | 应用底部主导航 |
| `Tabs` | 选项卡 | 内容切换 |
| `NavigationMenu` | 导航菜单 | 顶部导航菜单 |
| `Sidebar` | 侧边栏 | 侧边导航 |
| `Drawer` | 抽屉 | 侧滑抽屉 |
| `Steps` | 步骤条 | 步骤指示 |
| `Pagination` | 分页 | 页码导航 |
| `Breadcrumb` | 面包屑 | 路径导航 |
| `Anchor` | 锚点 | 页面锚点导航 |
| `Segmented` | 分段控制 | 分段选择 |
| `FAB` | 悬浮按钮 | 浮动操作按钮 |

## 数据展示（17）

| 组件 | 中文名 | 用途 |
| --- | --- | --- |
| `List` | 列表 | 列表展示 |
| `Card` | 卡片 | 卡片容器 |
| `Cell` | 单元格 | 列表单元组件 |
| `CellGroup` | 单元格组 | 成组的列表行 |
| `Table` | 表格 | 数据表格 |
| `Image` | 图片 | 图片展示 |
| `ImageViewer` | 图片预览 | 图片预览查看 |
| `Avatar` | 头像 | 用户头像 |
| `ScrollShadow` | 滚动渐隐 | 滚动区域边缘渐隐 |
| `Collapse` | 折叠面板 | 内容折叠 |
| `Progress` | 进度条 | 进度展示 |
| `Empty` | 空状态 | 空数据提示 |
| `Skeleton` | 骨架屏 | 加载占位 |
| `Timeline` | 时间轴 | 时间线展示 |
| `Tree` | 树 | 树形结构 |
| `Calendar` | 日历 | 日历展示 |
| `Watermark` | 水印 | 页面水印 |

## 反馈（16）

| 组件 | 中文名 | 用途 |
| --- | --- | --- |
| `SwipeCell` | 滑动单元格 | 滑动操作单元格 |
| `ActionSheet` | 动作面板 | 底部动作面板 |
| `Toast` | 轻提示 | 消息提示 |
| `Dialog` | 对话框 | 模态对话框 |
| `Tooltip` | 文字提示 | 文字提示 |
| `ContextMenu` | 上下文菜单 | 上下文菜单 |
| `Loading` | 加载 | 加载状态 |
| `Message` | 消息提醒 | 全局消息提示 |
| `Alert` | 警示框 | 页面内状态提示 |
| `NoticeBar` | 公告栏 | 滚动公告栏 |
| `Notification` | 通知 | 全局通知 |
| `Snackbar` | 消息条 | 底部消息 |
| `Popup` | 弹出层 | 弹出内容 |
| `Popover` | 气泡 | 气泡提示 |
| `Result` | 结果 | 操作结果反馈 |
| `Tour` | 引导 | 功能引导 |

## 布局（6）

| 组件 | 中文名 | 用途 |
| --- | --- | --- |
| `Grid` | 栅格 | 栅格布局 |
| `Swiper` | 轮播 | 内容轮播 |
| `SearchBar` | 搜索栏 | 搜索输入 |
| `PullRefresh` | 下拉刷新 | 列表下拉刷新 |
| `BottomSheet` | 底部抽屉 | 底部弹出 |
| `BackTop` | 回到顶部 | 返回顶部 |

## 未列入的条目

sample 还注册了几条属于运行时验证而非组件的路由（图标渲染、安全区快照、毛玻璃、保活与性能探针、Navigator 探针）。它们对开发 kit 有用，但刻意不计入上面的数字。

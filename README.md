# Attune 下载

官网：https://www.2222503.xyz

这里发布可直接下载的 Windows 评估安装包和单独提供的 VoWiFi 实验包。请到 [Releases](https://github.com/da202222/attune-releases/releases) 查看每个版本的说明、文件和 SHA-256。

Windows 客户安装包的签名及硬件验收状态以随包 `windows.json` 为准。未签名程序可能显示 Microsoft Defender SmartScreen“Windows 已保护你的电脑”；SHA-256 只校验文件完整性，不能替代代码签名。不要关闭 Windows 安全防护。

VoWiFi 实验包按 GPL-3.0-only 单独分发，ZIP 内提供固定版本的完整对应源码及许可证。它需要真实 SIM 和 AT 串口，尚未完成目标运营商实卡注册、短信及语音验收。运行后显式指定 AT 串口并手动输入 `connect`；不会自动拨号或发送短信。

Attune 客户端使用 Apache-2.0；VoWiFi 实验程序的许可证见其独立包。

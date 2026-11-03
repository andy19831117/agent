import type { UseCase } from "./types";

export const usecases: UseCase[] = [
  {
    id: "1",
    slug: "feishu-meeting-summary-agent",
    title: "飞书会议纪要自动生成与待办分发",
    summary: "基于飞书妙记转写生成结构化纪要与行动项，再经机器人按责任人推送（需人工确认后发送）。",
    description: "妙记转写→决议/未决/责任人+截止日；机器人推送前默认人工确认；敏感会先脱敏。",
    categories: ["efficiency", "enterprise"],
    platforms: ["feishu", "tongyi", "deepseek"],
    sourceUrl:
      "https://www.feishu.cn/hc/zh-CN/articles/787775611269-%E5%88%86%E4%BA%AB%E5%92%8C%E7%AE%A1%E7%90%86%E5%A6%99%E8%AE%B0%E7%89%87%E6%AE%B5",
    sourceLabel: "飞书帮助中心·妙记片段",
    upvotes: 286,
    trending: true,
    tags: ["会议", "纪要", "待办", "妙记"],
    howItWorks: ["读妙记文字", "模板纪要+行动项", "确认后机器人推送/同步表格"],
    tips: ["行动项必有人有期", "外发优先妙记片段控敏"],
    approach:
      "会后同事拿到的是妙记全文转写，决议、负责人和时间混在一段话里。做法是先把转写收成四块：决议、未决、责任人、截止日。缺人或日期的行动项写成待补充，不替会议编造。有人核对之后，机器人才按责任人推送，或同步到表格。对外分享敏感内容时，只发妙记片段，不发全文。片段怎么创建和分享，以飞书帮助中心这篇说明为准。",
    outcomes: [
      "会后跟进对着四块纪要，而不是翻一整段转写；每条行动项都能看到人和日期，缺的标成待补充。",
      "没核对过的纪要停在确认步，机器人不会直接发到群里。",
      "敏感会对外只分享片段，分享范围比全文小。",
    ],
    caveats: [
      "转写会漏掉口头承诺和会外上下文，行动项仍要人对过再发。",
      "机器人、表格和片段权限是分开的，换租户或换群要重新核对。",
      "上面写的是这套做法改变了哪一步，不是飞书公布的量化指标。",
    ],
    prompts: [
      {
        title: "纪要与行动项",
        body: `你是会议纪要助手。下面是飞书妙记的文字转写。只根据原文整理，不要补充原文没有的决定。

输出四块：
1. 决议：已经说定的结论，每条一句话。
2. 未决：明确挂起的问题。
3. 行动项：事项、责任人、截止日。缺任何一项就写「待补充」，不要猜测。
4. 待确认：转写含糊、可能听错、或涉及对外承诺的句子。

转写：
{{transcript}}`,
      },
      {
        title: "确认后推送",
        body: `把已确认的行动项改写成发给责任人的短消息。每条只含事项、截止日，以及需要对方回复的一句。不要加入纪要里没有的背景，也不要替人承诺完成时间。未确认的条目整段省略。

已确认行动项：
{{actions}}`,
      },
    ],
    primarySource: {
      url: "https://www.feishu.cn/hc/zh-CN/articles/787775611269-%E5%88%86%E4%BA%AB%E5%92%8C%E7%AE%A1%E7%90%86%E5%A6%99%E8%AE%B0%E7%89%87%E6%AE%B5",
      label: "飞书帮助中心 · 分享和管理妙记片段",
      date: "2024-11-11",
      dateLabel: "文档更新",
    },
  },
  {
    id: "2",
    slug: "wecom-customer-faq-bot",
    title: "企微客户常见问题自动应答",
    summary: "把产品 FAQ 与工单知识接入企微侧边栏，一线销售秒回标准答案。",
    description:
      "销售与客服在企业微信会话中唤起 Agent，自动检索知识库并生成可复制回复；复杂问题一键转人工并附带上下文摘要，降低重复答疑成本。",
    categories: ["enterprise", "ecommerce"],
    platforms: ["wecom", "coze", "deepseek"],
    sourceUrl: "https://developer.work.weixin.qq.com/document/path/90664",
    sourceLabel: "企业微信开发文档",
    upvotes: 241,
    trending: true,
    tags: ["客服", "FAQ", "知识库"],
    howItWorks: [
      "导入 FAQ / 工单结案记录到知识库",
      "会话侧边栏触发检索与生成",
      "不满意则转人工并附摘要",
    ],
    tips: ["每周复盘高频未命中问题", "敏感承诺类话术走人工审核"],
  },
  {
    id: "3",
    slug: "xiaohongshu-note-batch-agent",
    title: "小红书种草笔记批量选题与初稿",
    summary: "按品类与人群生成一周选题池、标题变体与正文骨架，并对照平台内容规范自检表述。",
    description:
      "输入品类/人群/真实卖点→选题日历+标题变体+正文骨架+配图提示；默认避绝对化与功效夸大；人工核对事实后对照审核红线自检再发。",
    categories: ["content", "ecommerce"],
    platforms: ["xiaohongshu", "doubao", "kimi"],
    sourceUrl:
      "https://pgy.xiaohongshu.com/help/detail?id=6495c527d1eedeeb48fb18b1f875650e&userType=4",
    sourceLabel: "小红书蒲公英·内容审核规范",
    upvotes: 312,
    trending: true,
    tags: ["种草", "选题", "文案", "合规自检"],
    howItWorks: ["收集卖点与禁说清单", "生成选题/标题/骨架", "扫描绝对化用语出待确认列表"],
    tips: ["不编造测评数据", "商单另遵合作审核"],
  },
  {
    id: "4",
    slug: "dingtalk-expense-approval-helper",
    title: "钉钉报销单智能填写与合规检查",
    summary: "识别发票信息，自动填报销单并提示超标或缺附件风险。",
    description:
      "员工上传发票图片或 PDF，Agent OCR 提取金额与税号，对照公司报销制度检查是否超标、是否需领导加签，再预填钉钉审批表单，减少退回。",
    categories: ["efficiency", "enterprise"],
    platforms: ["dingtalk", "tongyi", "wenxin"],
    sourceUrl: "https://open.dingtalk.com/document/",
    sourceLabel: "钉钉开放平台",
    upvotes: 178,
    trending: false,
    tags: ["报销", "审批", "OCR"],
    howItWorks: [
      "OCR 解析发票字段",
      "对照制度做合规校验",
      "预填钉钉审批并提示风险",
    ],
    tips: ["制度文档保持版本化", "财务规则变更后及时更新提示词"],
  },
  {
    id: "5",
    slug: "resume-interview-coach",
    title: "简历改写与模拟面试陪练",
    summary: "按目标 JD 做量化改写与 STAR 故事拆解，并进行中文模拟追问；严禁编造经历。",
    description:
      "真实简历+JD→可量化改写+STAR（情境/任务/行动/结果）对照；面试官多轮追问。数字与职责须用户已确认；无依据只给提问清单不补造。正文保持方法中立，不当成 AWS 求职教程。",
    categories: ["career"],
    platforms: ["deepseek", "chatgpt", "kimi"],
    sourceUrl:
      "https://aws.amazon.com/cn/careers/life-at-aws-recruiters-share-10-ways-to-excel-in-your-aws-in-person-interview/",
    sourceLabel: "AWS 招聘·面试 STAR 方法",
    upvotes: 267,
    trending: true,
    tags: ["简历", "面试", "STAR", "求职"],
    howItWorks: ["解析缺口亮点", "STAR 改前/改后（缺证据标待补充）", "模拟追问不新增虚构"],
    tips: ["禁编造经历/数据", "准备 6–8 真实故事矩阵"],
  },
  {
    id: "6",
    slug: "wechat-official-account-draft",
    title: "公众号长文大纲到成稿助手",
    summary: "从选题到小标题、金句与结尾 CTA，一站式辅助公众号写作。",
    description:
      "运营者给出主题与受众，Agent 产出文章结构、段落要点与可引用数据清单；支持多风格（干货/故事/评测）切换，成稿后人工事实核查再发。",
    categories: ["content"],
    platforms: ["wechat", "kimi", "deepseek"],
    sourceUrl: "https://mp.weixin.qq.com/",
    sourceLabel: "微信公众平台",
    upvotes: 198,
    trending: false,
    tags: ["公众号", "长文", "写作"],
    howItWorks: [
      "明确主题、受众与风格",
      "生成大纲与段落要点",
      "扩写成稿并标注待核实点",
    ],
    tips: ["引用务必人工核对来源", "标题做 A/B 两个版本"],
  },
  {
    id: "7",
    slug: "ecommerce-customer-service-night-shift",
    title: "电商夜间客服自动接待与催付",
    summary: "非工作时段自动答售前问题，并触发轻量催付话术。",
    description:
      "店铺夜间流量不低但人力有限：Agent 接入旺旺/企微会话，回答尺码、物流、活动规则；对已加购未下单用户按规则发送温和催付，超阈值转白天人工。",
    categories: ["ecommerce"],
    platforms: ["wecom", "coze", "doubao"],
    sourceUrl: "https://www.taobao.com/",
    sourceLabel: "淘宝",
    upvotes: 223,
    trending: true,
    tags: ["客服", "催付", "夜间"],
    howItWorks: [
      "配置售前知识与活动规则",
      "夜间自动接待并分流",
      "按标签触发催付话术",
    ],
    tips: ["催付频率设上限防打扰", "退换货承诺走人工确认"],
  },
  {
    id: "8",
    slug: "kaoyan-anki-plan-agent",
    title: "考研复习计划与薄弱点刷题",
    summary: "根据剩余天数与模考成绩生成周计划，并推荐薄弱章节练习。",
    description:
      "考生输入目标院校、科目与近期模考分数，Agent 排出可执行周计划，结合错题标签推送刷题清单与记忆卡片建议，适合政治、英语与专业课并行复习。",
    categories: ["education"],
    platforms: ["doubao", "kimi", "deepseek"],
    sourceUrl: "https://yz.chsi.com.cn/",
    sourceLabel: "研招网",
    upvotes: 189,
    trending: false,
    tags: ["考研", "计划", "刷题"],
    howItWorks: [
      "录入目标与模考数据",
      "生成周计划与任务量",
      "按薄弱点推送练习清单",
    ],
    tips: ["计划留缓冲日", "每周复盘实际完成率"],
  },
  {
    id: "9",
    slug: "gov-service-form-helper",
    title: "政务办事材料清单与填表指引",
    summary: "按城市与事项列出所需材料、预约入口与常见驳回原因。",
    description:
      "用户说明要办的事项（如居住证、社保转移），Agent 汇总公开政策要点、材料清单与网办入口提示，并给出常见驳回规避建议；不替代官方最终审核。",
    categories: ["life"],
    platforms: ["tongyi", "wenxin", "deepseek"],
    sourceUrl: "https://www.gov.cn/",
    sourceLabel: "中国政府网",
    upvotes: 156,
    trending: false,
    tags: ["政务", "材料", "办事"],
    howItWorks: [
      "确认城市与具体事项",
      "整理公开材料与入口信息",
      "提示常见驳回点",
    ],
    tips: ["以当地政务 App 最新说明为准", "涉身份材料勿发给不明链接"],
  },
  {
    id: "10",
    slug: "code-review-pr-agent",
    title: "代码审查与 PR 说明自动撰写",
    summary: "对 diff 做风险提示，并生成中文 PR/MR 描述与自测清单（GitHub / GitLab / Gitee 通用）。",
    description:
      "脱敏 diff→可读性/安全/边界意见+中文说明与自测。对齐 GitHub PR、GitLab MR（见 https://docs.gitlab.com/ee/user/project/merge_requests/）；Gitee 等同模板。",
    categories: ["devtools"],
    platforms: ["claude", "deepseek", "chatgpt"],
    sourceUrl:
      "https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests",
    sourceLabel: "GitHub Docs·关于拉取请求",
    upvotes: 274,
    trending: true,
    tags: ["Code Review", "PR", "MR", "工程效能"],
    howItWorks: ["读脱敏 diff", "风险分级", "中文 PR/MR+自测清单"],
    tips: ["密钥脱敏", "GitLab/Gitee 改字段名即可"],
  },
  {
    id: "11",
    slug: "feishu-okr-weekly-report",
    title: "飞书周报从 OKR 进度一键生成",
    summary: "拉取任务与文档更新，汇总成可读周报并 @相关同事。",
    description:
      "个人或 TL 在周五触发 Agent：汇总本周完成的任务、阻塞项与下周计划，对齐 OKR 进度，生成飞书文档并发送到汇报群，减少手工拼凑。",
    categories: ["efficiency", "enterprise"],
    platforms: ["feishu", "deepseek", "tongyi"],
    sourceUrl: "https://www.feishu.cn/product/docs",
    sourceLabel: "飞书文档",
    upvotes: 167,
    trending: false,
    tags: ["周报", "OKR", "汇报"],
    howItWorks: [
      "汇总任务与文档变更",
      "对齐 OKR 进度叙述",
      "生成文档并推送到群",
    ],
    tips: ["阻塞项单独成段更清晰", "数据来源标注便于抽查"],
  },
  {
    id: "12",
    slug: "short-video-script-agent",
    title: "短视频分镜脚本与口播稿生成",
    summary: "为抖音/视频号/快手生成 15–60 秒分镜、钩子与口播稿，并提示平台常见违规表达。",
    description: "主题+时长+卖点→钩子/分镜/口播/字幕；按规则中心标夸张/引流/低质表述；成片人工核事实与版权。",
    categories: ["content"],
    platforms: ["doubao", "kimi", "chatgpt"],
    sourceUrl: "https://www.douyin.com/rule/encyclopedia",
    sourceLabel: "抖音规则中心",
    upvotes: 301,
    trending: true,
    tags: ["短视频", "脚本", "口播", "合规"],
    howItWorks: ["选时长档", "生成钩子分镜口播", "高风险表述替换句"],
    tips: ["勿用「第一/最」口播", "改平台时单独查站外引流"],
  },
  {
    id: "13",
    slug: "shop-listing-seo-copy",
    title: "电商详情页卖点与 SEO 标题优化",
    summary: "基于竞品标题结构生成主图文案与详情卖点模块。",
    description:
      "运营输入商品属性与竞品标题样例，Agent 输出合规主标题、短标题、五点描述与详情模块大纲，并提示违禁词风险，提升搜索与转化表述质量。",
    categories: ["ecommerce"],
    platforms: ["tongyi", "wenxin", "deepseek"],
    sourceUrl: "https://www.jd.com/",
    sourceLabel: "京东",
    upvotes: 184,
    trending: false,
    tags: ["详情页", "SEO", "卖点"],
    howItWorks: [
      "收集属性与竞品标题",
      "生成标题与卖点模块",
      "扫描违禁与夸大表述",
    ],
    tips: ["夸大功效类需法务确认", "主图文案保持可读性"],
  },
  {
    id: "14",
    slug: "english-speaking-partner",
    title: "英语口语陪练与纠错反馈",
    summary: "按场景进行中英对话，纠正发音与表达并给出替换句。",
    description:
      "学习者选择商务会议、旅行或面试场景，与 Agent 多轮对话；结束后获得表达评分、更地道替换句与下次练习重点，适合碎片化口语提升。",
    categories: ["education"],
    platforms: ["chatgpt", "doubao", "kimi"],
    sourceUrl: "https://fanyi.baidu.com/",
    sourceLabel: "百度翻译",
    upvotes: 215,
    trending: false,
    tags: ["英语", "口语", "陪练"],
    howItWorks: [
      "选择场景与难度",
      "多轮对话练习",
      "输出纠错与替换句",
    ],
    tips: ["录音回听自己的表达", "每周固定 3 个场景循环"],
  },
  {
    id: "15",
    slug: "travel-itinerary-cn",
    title: "周末短途游行程与预算助手",
    summary: "按城市、预算与偏好生成两日行程、交通与备选雨天方案。",
    description:
      "用户给出出发地、天数与兴趣标签，Agent 输出合理动线、餐饮预算区间与雨天备选；可导出清单到微信备忘录或飞书文档，出行前再核对实时票务。",
    categories: ["life"],
    platforms: ["doubao", "kimi", "grok"],
    sourceUrl: "https://www.ctrip.com/",
    sourceLabel: "携程",
    upvotes: 142,
    trending: false,
    tags: ["旅行", "行程", "预算"],
    howItWorks: [
      "收集城市、天数与偏好",
      "生成动线与预算区间",
      "附上雨天/人流高峰备选",
    ],
    tips: ["门票价格以官方为准", "热门景点预留排队时间"],
  },
  {
    id: "16",
    slug: "dify-rag-internal-wiki",
    title: "用 Dify 搭建公司内部 Wiki 问答",
    summary: "在 Dify 配置知识库与引用展示，导入飞书/语雀文档，并设定回答必须带出处的评测点。",
    description:
      "【仅知识库搭建/评测】导入制度文档、配置检索与引用；上线前固定题集回归。群内 @ 与转人工见 feishu-knowledge-qa-bot，本条不写机器人接入。",
    categories: ["devtools", "enterprise"],
    platforms: ["dify", "feishu", "deepseek"],
    sourceUrl: "https://docs.dify.ai/zh-hans/guides/knowledge-base/readme",
    sourceLabel: "Dify 文档·知识库",
    upvotes: 258,
    trending: true,
    tags: ["RAG", "知识库", "Dify", "评测"],
    howItWorks: ["按权限导入", "检索/引用/拒答", "评测集回归"],
    tips: ["无命中明确「未找到」", "过期制度下线"],
  },
  {
    id: "17",
    slug: "salary-negotiation-script",
    title: "涨薪与跳槽谈薪话术演练",
    summary: "根据市场区间与个人成果生成谈判话术，并模拟 HR 压价。",
    description:
      "用户输入当前薪资、目标区间与可量化成果，Agent 给出开场、锚定与让步策略，并以 HR 角色压价演练，帮助求职者更从容谈薪。",
    categories: ["career"],
    platforms: ["chatgpt", "deepseek", "claude"],
    sourceUrl: "https://www.liepin.com/",
    sourceLabel: "猎聘",
    upvotes: 203,
    trending: false,
    tags: ["谈薪", "涨薪", "跳槽"],
    howItWorks: [
      "整理成果与目标区间",
      "生成谈判脚本",
      "模拟压价与反制",
    ],
    tips: ["用事实而非情绪说服", "备好 BATNA 底线"],
  },
  {
    id: "18",
    slug: "n8n-multi-channel-publish",
    title: "n8n 多平台内容一键分发流水线",
    summary: "一篇成稿自动适配公众号、小红书与视频口播提纲。",
    description:
      "独立开发者或内容团队用 n8n 串联写作 Agent：母稿完成后自动生成各平台裁剪版，写入草稿箱或发送审核群，降低重复排版成本。",
    categories: ["content", "devtools"],
    platforms: ["n8n", "xiaohongshu", "wechat", "deepseek"],
    sourceUrl: "https://docs.n8n.io/",
    sourceLabel: "n8n Docs",
    upvotes: 191,
    trending: false,
    tags: ["分发", "自动化", "n8n"],
    howItWorks: [
      "母稿进入工作流",
      "按平台裁剪语气与长度",
      "推送到草稿或审核群",
    ],
    tips: ["各平台敏感词规则分开维护", "人工终审再点发布"],
  },
  {
    id: "19",
    slug: "wecom-onboarding-checklist",
    title: "新员工入职引导与材料收集机器人",
    summary: "入职当天自动推送清单、收集资料并提醒导师。",
    description:
      "HR 在企微配置入职 Agent：新同事入群后收到第一周任务清单、账号申请指引；材料上传后自动校验完整性，逾期提醒导师与 HRBP。",
    categories: ["enterprise", "career"],
    platforms: ["wecom", "coze", "tongyi"],
    sourceUrl: "https://work.weixin.qq.com/",
    sourceLabel: "企业微信",
    upvotes: 149,
    trending: false,
    tags: ["入职", "HR", "清单"],
    howItWorks: [
      "入群触发欢迎与清单",
      "收集并校验入职材料",
      "逾期提醒导师与 HR",
    ],
    tips: ["隐私材料加密存储", "清单按岗位模板分支"],
  },
  {
    id: "20",
    slug: "personal-inbox-triage",
    title: "个人邮箱智能分拣与回复草稿",
    summary: "结合邮箱过滤规则做紧急度分拣，并为常见请求生成回复草稿；默认不自动发送。",
    description: "先用过滤规则粗分拣，再打紧急度并生成会议/发票类中文草稿；发送须用户确认。",
    categories: ["efficiency"],
    platforms: ["chatgpt", "claude", "grok"],
    sourceUrl: "https://help.mail.qq.com/detail?appid=2&s=filter&info=filter_create",
    sourceLabel: "QQ 邮箱帮助·创建邮件过滤规则",
    upvotes: 176,
    trending: false,
    tags: ["邮箱", "分拣", "草稿", "隐私"],
    howItWorks: ["配过滤规则", "摘要打标", "草稿待确认"],
    tips: ["禁止自动发送", "白名单优先人工"],
  },
  {
    id: "21",
    slug: "live-commerce-script",
    title: "直播带货话术与节奏表生成",
    summary: "按商品卖点输出开场、逼单与答疑话术时间轴。",
    description:
      "主播或中控输入商品列表与场次时长，Agent 输出分时段话术、福利节奏与异议处理应答，降低临场卡壳，适合抖音/快手直播间。",
    categories: ["ecommerce", "content"],
    platforms: ["doubao", "kimi", "deepseek"],
    sourceUrl: "https://www.kuaishou.com/",
    sourceLabel: "快手",
    upvotes: 208,
    trending: true,
    tags: ["直播", "带货", "话术"],
    howItWorks: [
      "录入商品与场次时长",
      "生成分时段话术表",
      "补充异议处理应答",
    ],
    tips: ["价格与库存以中控实时为准", "避免绝对化承诺"],
  },
  {
    id: "22",
    slug: "kids-homework-tutor",
    title: "小学作业辅导与启发式讲解",
    summary: "不直接给答案，引导学生理解思路并生成巩固小练。",
    description:
      "家长上传题目照片，Agent 用启发式提问引导孩子解题，最后给出步骤讲解与同类巩固题；强调安全与适龄表达，不替代学校教学。",
    categories: ["education", "life"],
    platforms: ["doubao", "wenxin", "tongyi"],
    sourceUrl: "https://www.zuoyebang.com/",
    sourceLabel: "作业帮",
    upvotes: 231,
    trending: false,
    tags: ["作业", "辅导", "启发式"],
    howItWorks: [
      "识别题目内容",
      "启发式提问引导",
      "输出步骤与巩固题",
    ],
    tips: ["控制使用时长", "家长陪伴核对理解"],
  },
  {
    id: "23",
    slug: "api-doc-to-sdk-snippet",
    title: "开放 API 文档转调用示例代码",
    summary: "粘贴接口说明，生成 TypeScript/Python 调用片段与错误处理。",
    description:
      "独立开发者对接国内开放平台时，把接口文档片段交给 Agent，快速得到鉴权、请求与分页示例，并标注常见错误码处理，缩短联调时间。",
    categories: ["devtools"],
    platforms: ["claude", "deepseek", "chatgpt"],
    sourceUrl: "https://open.weixin.qq.com/",
    sourceLabel: "微信开放文档",
    upvotes: 187,
    trending: false,
    tags: ["API", "SDK", "示例代码"],
    howItWorks: [
      "粘贴接口文档关键段",
      "选择语言与框架",
      "生成示例与错误处理",
    ],
    tips: ["密钥勿写入示例仓库", "对照官方最新字段校验"],
  },
  {
    id: "24",
    slug: "dingtalk-standup-bot",
    title: "钉钉每日站会收集与阻塞汇总",
    summary: "定时私聊收集昨日/今日/阻塞，汇总到群公告。",
    description:
      "小团队在钉钉用机器人每天固定时间收集三件事，Agent 汇总未回复人员与阻塞项，生成简洁群公告，替代低效文字站会。",
    categories: ["enterprise", "efficiency"],
    platforms: ["dingtalk", "tongyi", "coze"],
    sourceUrl: "https://www.dingtalk.com/",
    sourceLabel: "钉钉",
    upvotes: 133,
    trending: false,
    tags: ["站会", "日报", "阻塞"],
    howItWorks: [
      "定时私聊收集三件事",
      "汇总未回复与阻塞",
      "发布群公告",
    ],
    tips: ["超时自动提醒一次即可", "阻塞项 @对应负责人"],
  },
  {
    id: "25",
    slug: "xiaohongshu-comment-insight",
    title: "小红书评论区需求洞察摘要",
    summary: "抓取笔记评论主题，提炼用户痛点与内容灵感。",
    description:
      "运营导出或粘贴评论样本，Agent 聚类情绪与需求点，输出「用户在抱怨什么/想看什么」洞察卡，指导下一轮选题与产品改进（注意平台规则与隐私）。",
    categories: ["content", "ecommerce"],
    platforms: ["xiaohongshu", "kimi", "deepseek"],
    sourceUrl: "https://creator.xiaohongshu.com/",
    sourceLabel: "小红书创作者中心",
    upvotes: 164,
    trending: false,
    tags: ["评论", "洞察", "选题"],
    howItWorks: [
      "收集评论样本",
      "聚类痛点与情绪",
      "输出洞察与选题建议",
    ],
    tips: ["脱敏处理用户昵称", "遵守平台数据采集规则"],
  },
  {
    id: "26",
    slug: "contract-clause-review",
    title: "商务合同条款风险提示（非正式）",
    summary: "标出付款、违约与知识产权等高风险条款并提问确认。",
    description:
      "创业者或采购把合同文本交给 Agent，获得高风险条款清单与「需要律师确认的问题列表」；明确仅供参考，不构成法律意见。",
    categories: ["enterprise", "life"],
    platforms: ["claude", "kimi", "deepseek"],
    sourceUrl: "https://www.court.gov.cn/",
    sourceLabel: "最高人民法院",
    upvotes: 171,
    trending: false,
    tags: ["合同", "风险", "法务"],
    howItWorks: [
      "上传合同文本",
      "标出高风险条款",
      "生成待律师确认问题",
    ],
    tips: ["重大合同必须律师审阅", "删除对方隐私后再上传"],
  },
  {
    id: "27",
    slug: "bilibili-video-outline",
    title: "B 站长视频大纲与章节时间戳",
    summary: "根据主题生成结构化大纲、章节标题与封面文案方向。",
    description:
      "UP 主输入视频主题与目标时长，Agent 输出章节大纲、每段要点与适合做时间戳的标题，并给出封面主文案方向，提升完播与检索。",
    categories: ["content"],
    platforms: ["deepseek", "kimi", "chatgpt"],
    sourceUrl: "https://www.bilibili.com/",
    sourceLabel: "哔哩哔哩",
    upvotes: 219,
    trending: true,
    tags: ["B站", "大纲", "时间戳"],
    howItWorks: [
      "明确主题与时长",
      "生成章节大纲",
      "输出时间戳标题与封面方向",
    ],
    tips: ["开头 30 秒给承诺点", "章节标题便于搜索"],
  },
  {
    id: "28",
    slug: "personal-finance-monthly",
    title: "个人月度记账分类与花费洞察",
    summary: "导入账单明细，自动分类并给出节约建议。",
    description:
      "用户粘贴或导入消费明细，Agent 归类餐饮/交通/订阅等，生成月度占比图描述与可执行节约建议，帮助建立简单财务复盘习惯。",
    categories: ["life", "efficiency"],
    platforms: ["doubao", "deepseek", "chatgpt"],
    sourceUrl: "https://www.alipay.com/",
    sourceLabel: "支付宝",
    upvotes: 158,
    trending: false,
    tags: ["记账", "理财", "复盘"],
    howItWorks: [
      "导入账单明细",
      "自动分类汇总",
      "输出洞察与节约建议",
    ],
    tips: ["勿上传完整卡号等敏感信息", "订阅项单独盯防"],
  },
  {
    id: "29",
    slug: "coze-wechat-service-bot",
    title: "扣子搭建微信服务号咨询 Bot",
    summary: "无代码配置知识库与插件，承接服务号粉丝常见咨询。",
    description:
      "中小商家用扣子（Coze）连接微信生态，配置产品知识与订单查询插件，粉丝在服务号对话框获得自动回复，人工坐席处理例外单。",
    categories: ["devtools", "ecommerce"],
    platforms: ["coze", "wechat", "doubao"],
    sourceUrl: "https://www.coze.cn/",
    sourceLabel: "扣子 Coze",
    upvotes: 246,
    trending: true,
    tags: ["扣子", "服务号", "无代码"],
    howItWorks: [
      "在扣子配置 Bot 与知识库",
      "接通微信服务号入口",
      "例外工单转人工",
    ],
    tips: ["插件权限最小化", "定期导出未命中日志"],
  },
  {
    id: "30",
    slug: "job-jd-match-score",
    title: "岗位 JD 与简历匹配度打分",
    summary: "快速判断是否值得投递，并列出缺口技能补齐建议。",
    description:
      "求职者粘贴 JD 与简历，Agent 输出匹配分数、已覆盖关键词与缺口清单，并建议投递优先级与一周补齐学习路径。",
    categories: ["career"],
    platforms: ["deepseek", "kimi", "chatgpt"],
    sourceUrl: "https://www.51job.com/",
    sourceLabel: "前程无忧",
    upvotes: 194,
    trending: false,
    tags: ["JD", "匹配", "投递"],
    howItWorks: [
      "对比 JD 与简历关键词",
      "输出匹配分与缺口",
      "给出投递与补齐建议",
    ],
    tips: ["真实经历优先于堆砌关键词", "高匹配再精投"],
  },
  {
    id: "31",
    slug: "feishu-knowledge-qa-bot",
    title: "飞书群内制度问答机器人",
    summary: "在飞书群 @自定义机器人查询制度，低置信度转人工；知识库搭建见 Dify Wiki 条。",
    description:
      "【仅群内 @ 与转人工】群内加自定义机器人，@ 后返回答案+链接；低置信度/承诺类转 HR。知识库导入与评测见 dify-rag-internal-wiki。",
    categories: ["enterprise"],
    platforms: ["feishu", "tongyi", "dify"],
    sourceUrl: "https://open.feishu.cn/document/client-docs/bot-v3/add-custom-bot",
    sourceLabel: "飞书开放平台·自定义机器人",
    upvotes: 182,
    trending: false,
    tags: ["群机器人", "制度", "问答", "转人工"],
    howItWorks: ["加群机器人并限群", "@检索回复", "低置信度转人工"],
    tips: ["外群禁用", "只答已入库文档"],
  },
  {
    id: "32",
    slug: "prompt-library-team",
    title: "团队提示词库治理与版本发布",
    summary: "沉淀高复用提示词，按场景版本化并在飞书可检索。",
    description:
      "内容或客服团队把优质提示词沉淀为「场景卡片」，含输入变量、示例与负责人；Agent 协助归类打标签，并在飞书文档/多维表格发布版本说明。",
    categories: ["devtools", "efficiency"],
    platforms: ["feishu", "claude", "deepseek"],
    sourceUrl: "https://www.feishu.cn/product/base",
    sourceLabel: "飞书多维表格",
    upvotes: 139,
    trending: false,
    tags: ["提示词", "治理", "版本"],
    howItWorks: [
      "收集优质提示词",
      "结构化打标签与变量",
      "发布版本到团队知识库",
    ],
    tips: ["每个提示词指定 owner", "过时版本明确标记废弃"],
  },
  {
    id: "33",
    slug: "douyin-account-calendar",
    title: "抖音账号内容日历与选题矩阵",
    summary: "按账号定位排出四周选题矩阵与发布节奏。",
    description:
      "创作者明确人设与目标（涨粉/转化），Agent 输出四周内容日历：教程、日常、对比测评占比，并给出发布时段建议，便于批量拍摄。",
    categories: ["content"],
    platforms: ["doubao", "kimi", "chatgpt"],
    sourceUrl: "https://creator.douyin.com/",
    sourceLabel: "抖音创作者中心",
    upvotes: 227,
    trending: true,
    tags: ["抖音", "日历", "选题矩阵"],
    howItWorks: [
      "明确人设与目标",
      "生成四周选题矩阵",
      "标注类型占比与时段",
    ],
    tips: ["预留热点插入空位", "同主题系列化更易涨粉"],
  },
  {
    id: "34",
    slug: "inventory-alert-agent",
    title: "店铺库存预警与补货建议",
    summary: "结合销量趋势提示滞销与断货风险，给出补货优先级。",
    description:
      "电商运营导入销量与库存表，Agent 标记高周转断货风险 SKU 与滞销款，输出补货优先级与促销清仓建议文案方向，辅助周会决策。",
    categories: ["ecommerce", "enterprise"],
    platforms: ["wenxin", "tongyi", "deepseek"],
    sourceUrl: "https://www.pinduoduo.com/",
    sourceLabel: "拼多多",
    upvotes: 151,
    trending: false,
    tags: ["库存", "补货", "滞销"],
    howItWorks: [
      "导入销量与库存",
      "标记风险 SKU",
      "输出补货与清仓建议",
    ],
    tips: ["结合大促节点调整阈值", "季节款单独规则"],
  },
  {
    id: "35",
    slug: "grok-news-digest-cn",
    title: "行业早报中文摘要推送到微信",
    summary: "定时抓取关注源，生成中文要点早报并推送到微信文件传输或群。",
    description:
      "个人或小团队设定关注的科技/行业关键词，Agent（含 Grok Bot 等）汇总公开资讯要点，生成简洁中文早报，经 n8n/定时任务推到微信，节省刷信息流时间。",
    categories: ["efficiency", "life"],
    platforms: ["grok", "wechat", "n8n", "deepseek"],
    sourceUrl: "https://x.com/",
    sourceLabel: "X",
    upvotes: 168,
    trending: false,
    tags: ["早报", "资讯", "推送"],
    howItWorks: [
      "配置关键词与信源",
      "生成中文要点早报",
      "定时推送到微信",
    ],
    tips: ["控制条数避免信息过载", "重要条目附原链"],
  },
  {
    id: "36",
    slug: "meeting-bilingual-notes",
    title: "中英双语会议要点对照整理",
    summary: "跨国会议后输出中英对照纪要，便于两边团队对齐。",
    description:
      "跨境协作场景：上传会议转写，Agent 输出中英对照要点、专有名词表与待确认歧义列表，减少翻译来回与误解。",
    categories: ["enterprise", "efficiency"],
    platforms: ["claude", "chatgpt", "kimi"],
    sourceUrl: "https://www.deepl.com/zh/translator",
    sourceLabel: "DeepL",
    upvotes: 145,
    trending: false,
    tags: ["双语", "会议", "跨境"],
    howItWorks: [
      "导入转写文本",
      "生成中英对照要点",
      "列出术语与歧义待确认",
    ],
    tips: ["专有名词建团队词表", "法律表述需人工定稿"],
  },

  {
    id: "37",
    slug: "feishu-calendar-focus-blocks",
    title: "飞书日程智能排期与专注时段保护",
    summary: "根据任务优先级自动建议会议空档，并预留深度工作专注块。",
    description:
      "知识工作者把待办与截止时间同步给 Agent，结合飞书日历空闲时段给出排期建议，自动创建「专注」忙碌块，减少碎片会议挤占深度工作时间。",
    categories: ["efficiency"],
    platforms: ["feishu", "tongyi", "deepseek"],
    sourceUrl: "https://www.feishu.cn/product/calendar",
    sourceLabel: "飞书日历",
    upvotes: 162,
    trending: false,
    tags: ["日程", "专注", "排期"],
    howItWorks: [
      "同步待办优先级与截止时间",
      "分析日历空闲并建议会议空档",
      "创建专注忙碌块并发送提醒",
    ],
    tips: ["专注块对同事可见更有效", "每周五复盘被打断次数"],
  },
  {
    id: "38",
    slug: "wecom-sales-followup-script",
    title: "企微销售跟进话术与阶段推进提醒",
    summary: "按线索阶段生成跟进话术，逾期未联系自动提醒销售。",
    description:
      "销售在企业微信侧边栏查看线索阶段，Agent 根据上次沟通摘要生成下一轮话术与异议处理要点；超过约定天数未跟进则推送提醒，降低掉单。",
    categories: ["career", "enterprise"],
    platforms: ["wecom", "coze", "wenxin"],
    sourceUrl: "https://work.weixin.qq.com/nl/index/intro",
    sourceLabel: "企业微信",
    upvotes: 173,
    trending: false,
    tags: ["销售", "跟进", "话术"],
    howItWorks: [
      "读取线索阶段与历史摘要",
      "生成跟进话术与异议应答",
      "逾期未联系推送提醒",
    ],
    tips: ["话术需结合真实产品参数", "敏感折扣承诺走审批"],
  },
  {
    id: "39",
    slug: "dingtalk-project-risk-digest",
    title: "钉钉项目风险周报自动汇总",
    summary: "从任务延期与评论中提炼风险清单，生成给负责人的周报。",
    description:
      "项目经理每周触发 Agent：扫描钉钉项目中延期任务、高频阻塞评论与未更新文档，输出风险等级、影响面与建议动作，发送到项目群。",
    categories: ["enterprise", "efficiency"],
    platforms: ["dingtalk", "tongyi", "deepseek"],
    sourceUrl: "https://www.dingtalk.com/qidian/product-project.html",
    sourceLabel: "钉钉项目",
    upvotes: 148,
    trending: false,
    tags: ["项目", "风险", "周报"],
    howItWorks: [
      "拉取延期任务与关键评论",
      "分级输出风险与建议动作",
      "推送到项目群与负责人",
    ],
    tips: ["风险条目控制在一页内", "每条风险指定唯一 owner"],
  },
  {
    id: "40",
    slug: "career-offer-compare-agent",
    title: "多份 Offer 薪酬福利对照决策表",
    summary: "把底薪、奖金、期权与通勤折算成可比表格并给出取舍问题。",
    description:
      "求职者录入多份 Offer 的现金与非现金条件，Agent 生成对照表、三年粗略现金路径，并列出需向 HR 确认的问题清单，辅助理性决策（非投资建议）。",
    categories: ["career"],
    platforms: ["chatgpt", "deepseek", "kimi"],
    sourceUrl: "https://www.zhaopin.com/",
    sourceLabel: "智联招聘",
    upvotes: 211,
    trending: true,
    tags: ["Offer", "薪酬", "决策"],
    howItWorks: [
      "录入多份 Offer 关键字段",
      "生成对照表与粗略现金路径",
      "输出待确认问题清单",
    ],
    tips: ["期权条款务必律师/财务复核", "把成长空间单独一列"],
  },
  {
    id: "41",
    slug: "linkedin-style-zh-profile",
    title: "中文职业主页亮点与自我介绍改写",
    summary: "按目标行业改写个人简介、项目亮点与一句话定位。",
    description:
      "职场人提供经历草稿与目标岗位，Agent 输出适合脉脉/招聘平台的中文简介、三条可量化亮点与开场自我介绍，避免空泛形容词堆砌。",
    categories: ["career"],
    platforms: ["claude", "chatgpt", "doubao"],
    sourceUrl: "https://maimai.cn/",
    sourceLabel: "脉脉",
    upvotes: 157,
    trending: false,
    tags: ["个人品牌", "简介", "亮点"],
    howItWorks: [
      "收集经历与目标岗位",
      "改写简介与量化亮点",
      "生成 30 秒自我介绍稿",
    ],
    tips: ["数据需可验证", "不同平台语气略作区分"],
  },
  {
    id: "42",
    slug: "douyin-comment-reply-batch",
    title: "抖音评论区批量友好回复草稿",
    summary: "按评论情绪生成礼貌回复，优先处理咨询与差评苗头。",
    description:
      "创作者或商家导出评论样本，Agent 聚类情绪并生成可复制回复草稿；咨询类引导私信下单，负面情绪先安抚再给解决方案，人工确认后发送。",
    categories: ["content", "ecommerce"],
    platforms: ["douyin", "doubao", "kimi"],
    sourceUrl: "https://creator.douyin.com/",
    sourceLabel: "抖音创作者中心",
    upvotes: 196,
    trending: true,
    tags: ["抖音", "评论", "回复"],
    howItWorks: [
      "导入评论样本并聚类情绪",
      "生成分类回复草稿",
      "人工确认后批量发送",
    ],
    tips: ["侮辱性评论可仅记录不回", "承诺发货时效要可兑现"],
  },
  {
    id: "43",
    slug: "xiaohongshu-cover-copy-ab",
    title: "小红书封面文案与标题 A/B 变体",
    summary: "同一笔记生成多组封面主文案与标题组合供测试。",
    description:
      "运营输入笔记主题与卖点，Agent 输出多组「封面大字 + 标题」组合，标注钩子类型（反差/清单/避坑），便于小流量测图测标题。",
    categories: ["content"],
    platforms: ["xiaohongshu", "doubao", "deepseek"],
    sourceUrl: "https://creator.xiaohongshu.com/",
    sourceLabel: "小红书创作者中心",
    upvotes: 188,
    trending: false,
    tags: ["封面", "标题", "A/B"],
    howItWorks: [
      "输入主题与核心卖点",
      "生成多组封面与标题变体",
      "标注钩子类型便于测试",
    ],
    tips: ["避免夸张绝对化用语", "每组只改一个变量更易归因"],
  },
  {
    id: "44",
    slug: "wechat-moments-campaign-calendar",
    title: "微信朋友圈活动预热内容日历",
    summary: "为门店或品牌活动排出朋友圈预热、倒计时与复盘帖。",
    description:
      "线下门店或私域运营给出活动日期与优惠，Agent 生成朋友圈内容日历：预热种草、倒计时、现场花絮与复盘征集，语气自然避免硬广感。",
    categories: ["content", "ecommerce"],
    platforms: ["wechat", "wenxin", "doubao"],
    sourceUrl: "https://mp.weixin.qq.com/",
    sourceLabel: "微信公众平台",
    upvotes: 141,
    trending: false,
    tags: ["朋友圈", "私域", "活动"],
    howItWorks: [
      "确认活动节点与优惠规则",
      "生成分日朋友圈文案",
      "附上配图与话题建议",
    ],
    tips: ["朋友圈频率勿刷屏", "优惠规则写清截止日期"],
  },
  {
    id: "45",
    slug: "ecommerce-return-reason-insight",
    title: "退货原因聚类与商品改进建议",
    summary: "从退货备注提炼尺寸/质量/描述不符主题并给改进优先级。",
    description:
      "电商运营导入退货原因文本，Agent 聚类主题并关联 SKU，输出「改详情页文案 / 改尺码表 / 质检」等行动建议，支撑周会复盘。",
    categories: ["ecommerce"],
    platforms: ["tongyi", "deepseek", "wenxin"],
    sourceUrl: "https://www.taobao.com/",
    sourceLabel: "淘宝",
    upvotes: 169,
    trending: false,
    tags: ["退货", "洞察", "改进"],
    howItWorks: [
      "导入退货备注与 SKU",
      "聚类原因并关联商品",
      "输出改进优先级清单",
    ],
    tips: ["样本至少覆盖两周更稳", "与客服话术同步更新"],
  },
  {
    id: "46",
    slug: "ecommerce-ad-creative-variants",
    title: "信息流广告文案与卖点变体生成",
    summary: "按人群包快速产出多组广告标题、描述与行动号召。",
    description:
      "投放同学输入商品卖点与目标人群，Agent 生成多组合规广告文案变体，并提示常见违禁表述，用于巨量/其他信息流素材测试。",
    categories: ["ecommerce", "content"],
    platforms: ["douyin", "doubao", "kimi"],
    sourceUrl: "https://www.oceanengine.com/",
    sourceLabel: "巨量引擎",
    upvotes: 177,
    trending: false,
    tags: ["投放", "广告文案", "变体"],
    howItWorks: [
      "输入卖点与人群描述",
      "生成多组标题与描述",
      "扫描违禁与夸大表述",
    ],
    tips: ["落地页承诺与广告一致", "每组素材单一卖点更清晰"],
  },
  {
    id: "47",
    slug: "cet-writing-feedback-agent",
    title: "四六级写作批改与模板升级",
    summary: "对英文作文给分点反馈，并提供更高分替换句与结构建议。",
    description:
      "考生粘贴练习作文，Agent 按四六级常见评分维度给出优点与扣分点，提供替换句与开头结尾模板升级，强调独立思考与反抄袭。",
    categories: ["education"],
    platforms: ["chatgpt", "deepseek", "kimi"],
    sourceUrl: "https://cet.neea.edu.cn/",
    sourceLabel: "中国教育考试网 CET",
    upvotes: 204,
    trending: true,
    tags: ["四六级", "写作", "批改"],
    howItWorks: [
      "粘贴作文与目标分数",
      "按维度输出反馈",
      "给出替换句与结构建议",
    ],
    tips: ["每周精改 2 篇优于堆数量", "背模板后要加入个人例子"],
  },
  {
    id: "48",
    slug: "teacher-lesson-plan-agent",
    title: "中小学课时教案与课堂提问设计",
    summary: "按课标主题生成教学目标、活动流程与分层提问。",
    description:
      "教师输入年级、学科与课题，Agent 输出课时目标、导入活动、例题与分层提问（基础/拓展），并附板书要点；需教师按本校要求调整。",
    categories: ["education"],
    platforms: ["tongyi", "wenxin", "doubao"],
    sourceUrl: "https://www.moe.gov.cn/",
    sourceLabel: "教育部",
    upvotes: 159,
    trending: false,
    tags: ["教案", "提问", "教学"],
    howItWorks: [
      "输入年级学科与课题",
      "生成目标与活动流程",
      "输出分层提问与板书要点",
    ],
    tips: ["对齐本校进度与教材版本", "练习题难度需课堂实测"],
  },
  {
    id: "49",
    slug: "programming-learning-path",
    title: "零基础编程学习路径与项目小抄",
    summary: "按目标（前端/数据分析）生成 8 周路径与练手项目清单。",
    description:
      "学习者说明基础与目标方向，Agent 排出可执行 8 周路径、每周练习与迷你项目验收标准，并推荐公开文档入口，适合转行自学。",
    categories: ["education", "devtools"],
    platforms: ["deepseek", "chatgpt", "claude"],
    sourceUrl: "https://developer.mozilla.org/zh-CN/",
    sourceLabel: "MDN Web Docs",
    upvotes: 221,
    trending: true,
    tags: ["编程", "学习路径", "项目"],
    howItWorks: [
      "确认基础与目标方向",
      "生成 8 周路径与练习",
      "给出迷你项目验收标准",
    ],
    tips: ["每周固定复盘产出", "项目宁可小而完整"],
  },
  {
    id: "50",
    slug: "life-insurance-policy-plain",
    title: "保险条款白话解读与对比提问清单",
    summary: "把保障范围与免责条款翻译成易懂要点，并列出待问代理人问题。",
    description:
      "用户粘贴或摘要保险产品说明，Agent 提炼保障责任、等待期、免责与理赔材料要点，生成向代理人确认的问题；明确不构成投保建议。",
    categories: ["life"],
    platforms: ["kimi", "deepseek", "wenxin"],
    sourceUrl: "https://www.cbirc.gov.cn/",
    sourceLabel: "国家金融监督管理总局",
    upvotes: 134,
    trending: false,
    tags: ["保险", "条款", "白话"],
    howItWorks: [
      "提取产品说明关键条款",
      "输出白话要点",
      "生成待问代理人清单",
    ],
    tips: ["以正式合同为准", "重大决定咨询持牌顾问"],
  },
  {
    id: "51",
    slug: "life-move-checklist-city",
    title: "跨城搬家办事与地址变更清单",
    summary: "按城市列出水电燃气、快递与常用 App 地址变更步骤。",
    description:
      "用户说明迁出/迁入城市，Agent 整理公开常见的水电过户、宽带、快递地址、地图常用点等检查清单，并提示需本人办理的事项，降低搬家遗漏。",
    categories: ["life"],
    platforms: ["doubao", "tongyi", "chatgpt"],
    sourceUrl: "https://www.gov.cn/",
    sourceLabel: "中国政府网",
    upvotes: 128,
    trending: false,
    tags: ["搬家", "清单", "地址变更"],
    howItWorks: [
      "确认迁出迁入城市",
      "生成分类变更清单",
      "标注须本人到场事项",
    ],
    tips: ["以当地营业厅最新要求为准", "重要证件单独装箱"],
  },
  {
    id: "52",
    slug: "life-recipe-fridge-agent",
    title: "冰箱余材一键成菜与采购补清单",
    summary: "根据现有食材生成家常菜谱，并列出缺少的少量采购项。",
    description:
      "家庭用户拍下或列出冰箱食材，Agent 推荐 2–3 道可完成的家常菜步骤与耗时，并给出「只差这几样」的短采购清单，减少浪费。",
    categories: ["life"],
    platforms: ["doubao", "wenxin", "grok"],
    sourceUrl: "https://www.meishichina.com/",
    sourceLabel: "美食天下",
    upvotes: 183,
    trending: false,
    tags: ["菜谱", "食材", "采购"],
    howItWorks: [
      "录入现有食材",
      "推荐可完成菜谱与步骤",
      "输出少量补购清单",
    ],
    tips: ["注意家人过敏原", "生熟案板分开提醒"],
  },
  {
    id: "53",
    slug: "devtools-log-incident-summary",
    title: "线上故障日志摘要与复盘初稿",
    summary: "从日志与时间线提炼故障现象、影响面与待验证假设。",
    description:
      "值班工程师粘贴关键日志片段与时间线，Agent 输出故障摘要、可能根因假设、影响用户范围描述与复盘文档初稿骨架，加速事后复盘。",
    categories: ["devtools", "enterprise"],
    platforms: ["claude", "deepseek", "chatgpt"],
    sourceUrl: "https://kubernetes.io/zh-cn/docs/",
    sourceLabel: "Kubernetes 中文文档",
    upvotes: 192,
    trending: false,
    tags: ["故障", "日志", "复盘"],
    howItWorks: [
      "粘贴日志与时间线",
      "生成现象与影响面摘要",
      "输出假设与复盘骨架",
    ],
    tips: ["脱敏后再粘贴日志", "根因需实测验证不可臆断"],
  },
  {
    id: "54",
    slug: "devtools-sql-explain-helper",
    title: "慢 SQL 解读与索引优化建议草稿",
    summary: "解释执行计划要点，并提出可讨论的索引与改写方向。",
    description:
      "开发者提供慢查询与 EXPLAIN 结果，Agent 用中文解释扫描方式与可能瓶颈，给出索引或改写讨论建议；上线前须 DBA/评审确认。",
    categories: ["devtools"],
    platforms: ["deepseek", "claude", "tongyi"],
    sourceUrl: "https://dev.mysql.com/doc/",
    sourceLabel: "MySQL Docs",
    upvotes: 175,
    trending: false,
    tags: ["SQL", "性能", "索引"],
    howItWorks: [
      "粘贴 SQL 与执行计划",
      "中文解释瓶颈点",
      "给出索引/改写讨论建议",
    ],
    tips: ["在只读副本验证", "避免盲目加过多索引"],
  },
  {
    id: "55",
    slug: "devtools-agent-eval-checklist",
    title: "Agent 上线前评测集与回归清单",
    summary: "为对话/工具调用 Agent 生成评测用例与失败归类表。",
    description:
      "独立开发者描述 Agent 目标与工具列表，系统输出评测集模板：正常路径、边界输入、工具失败与越权拒绝用例，并附回归记录表，降低上线翻车。",
    categories: ["devtools"],
    platforms: ["claude", "chatgpt", "dify"],
    sourceUrl: "https://docs.dify.ai/zh-hans",
    sourceLabel: "Dify 文档",
    upvotes: 166,
    trending: true,
    tags: ["评测", "回归", "Agent"],
    howItWorks: [
      "描述 Agent 目标与工具",
      "生成多类评测用例",
      "附失败归类与回归表",
    ],
    tips: ["把真实用户差评纳入用例", "每次改提示词都跑回归"],
  },
  {
    id: "56",
    slug: "enterprise-meeting-room-conflict",
    title: "会议室冲突协调与改期话术助手",
    summary: "发现日程冲突时生成改期方案与礼貌协商消息。",
    description:
      "行政或助理在飞书/钉钉发现会议室或关键人冲突，Agent 给出可选改期方案，并生成发给各方的协商话术，减少反复拉扯。",
    categories: ["enterprise", "efficiency"],
    platforms: ["feishu", "dingtalk", "tongyi"],
    sourceUrl: "https://www.feishu.cn/hc/zh-CN",
    sourceLabel: "飞书帮助中心",
    upvotes: 137,
    trending: false,
    tags: ["会议室", "改期", "协调"],
    howItWorks: [
      "识别冲突参与方与时段",
      "生成可选改期方案",
      "输出协商话术消息",
    ],
    tips: ["优先保护有外部嘉宾的会议", "改期后更新会议室预定"],
  },
  {
    id: "57",
    slug: "enterprise-vendor-rfp-draft",
    title: "供应商询价函与评分表草稿",
    summary: "按采购需求生成询价问题清单与统一评分维度。",
    description:
      "采购或创业团队描述需求与预算区间，Agent 输出询价函结构、必须澄清的问题与评分表（价格/交付/售后），便于多供应商横向比较。",
    categories: ["enterprise"],
    platforms: ["chatgpt", "wenxin", "kimi"],
    sourceUrl: "https://www.zhaobiao.cn/",
    sourceLabel: "中国招标投标网",
    upvotes: 144,
    trending: false,
    tags: ["采购", "询价", "评分"],
    howItWorks: [
      "整理需求与约束",
      "生成询价函与问题清单",
      "输出统一评分表",
    ],
    tips: ["敏感预算可只给区间", "最终条款法务审核"],
  },
  {
    id: "58",
    slug: "grok-competitor-watch-brief",
    title: "竞品动态中文速报与行动建议",
    summary: "汇总公开竞品更新要点，输出给产品周会的一页纸速报。",
    description:
      "产品经理设定竞品关键词与关注维度，Agent（含 Grok Bot 等）整理公开网页/社媒可见更新，生成中文速报：发生了什么、可能影响、可选应对，附原链便于核实。",
    categories: ["efficiency", "enterprise"],
    platforms: ["grok", "deepseek", "feishu"],
    sourceUrl: "https://x.com/",
    sourceLabel: "X",
    upvotes: 171,
    trending: false,
    tags: ["竞品", "速报", "产品"],
    howItWorks: [
      "配置竞品与关注维度",
      "汇总公开更新并写中文速报",
      "给出可选应对与原链",
    ],
    tips: ["传闻与官宣分开标注", "重大结论需人工二次核实"],
  },

  {
    id: "59",
    slug: "wechat-todo-voice-capture",
    title: "微信语音待办转结构化任务清单",
    summary: "把碎片语音转成可执行待办，并按优先级推送到备忘或飞书。",
    description:
      "个人用户用微信发送语音备忘，Agent 转写并拆成任务标题、截止建议与标签，同步到待办工具或飞书任务，减少「说过就忘」。",
    categories: ["efficiency"],
    platforms: ["wechat", "feishu", "doubao"],
    sourceUrl: "https://weixin.qq.com/",
    sourceLabel: "微信",
    upvotes: 154,
    trending: false,
    tags: ["语音", "待办", "转写"],
    howItWorks: [
      "接收微信语音并转写",
      "拆分为结构化待办字段",
      "同步到任务工具并提醒",
    ],
    tips: ["重要截止日二次确认", "语音环境嘈杂时改用文字"],
  },
  {
    id: "60",
    slug: "notion-like-daily-review-cn",
    title: "晚间复盘三问与明日计划生成",
    summary: "用固定三问引导日复盘，自动生成明日 Top3 与风险提醒。",
    description:
      "效率爱好者每天固定回答「完成了什么/卡住什么/学到什么」，Agent 汇总周趋势并生成明日三条优先事项，适合飞书文档或本地笔记习惯。",
    categories: ["efficiency"],
    platforms: ["feishu", "kimi", "chatgpt"],
    sourceUrl: "https://www.feishu.cn/product/docs",
    sourceLabel: "飞书文档",
    upvotes: 146,
    trending: false,
    tags: ["复盘", "计划", "习惯"],
    howItWorks: [
      "引导完成晚间三问",
      "汇总并提炼周趋势",
      "生成明日 Top3 任务",
    ],
    tips: ["复盘控制在 10 分钟内", "Top3 必须可完成"],
  },
  {
    id: "61",
    slug: "dingtalk-announcement-rewrite",
    title: "钉钉公告口语化改写与阅读确认",
    summary: "把制度长文改成要点公告，并生成需确认的阅读回执话术。",
    description:
      "行政把制度长文交给 Agent，输出钉钉群可读公告（要点+附件指引），并生成「已阅读请回复」模板，提高触达与确认率。",
    categories: ["efficiency", "enterprise"],
    platforms: ["dingtalk", "tongyi", "wenxin"],
    sourceUrl: "https://www.dingtalk.com/",
    sourceLabel: "钉钉",
    upvotes: 132,
    trending: false,
    tags: ["公告", "改写", "触达"],
    howItWorks: [
      "压缩制度长文为要点",
      "生成钉钉公告正文",
      "附阅读确认话术",
    ],
    tips: ["关键条款保留原文链接", "重要变更单独置顶"],
  },
  {
    id: "62",
    slug: "career-layoff-transition-plan",
    title: "裁员过渡期求职与情绪稳定行动计划",
    summary: "按周拆解简历投放、内推与技能补齐，并给出可执行节奏。",
    description:
      "遭遇组织调整的职场人输入行业与年限，Agent 输出 4–6 周行动计划：材料更新、目标公司清单、每日投递量与技能补齐，强调节奏可持续（非心理诊疗）。",
    categories: ["career"],
    platforms: ["chatgpt", "deepseek", "kimi"],
    sourceUrl: "https://www.zhipin.com/",
    sourceLabel: "BOSS直聘",
    upvotes: 198,
    trending: true,
    tags: ["求职", "过渡", "计划"],
    howItWorks: [
      "确认行业年限与目标城市",
      "生成分周行动计划",
      "设定每日投递与学习配额",
    ],
    tips: ["优先高质量内推", "情绪低落时缩短当日任务量"],
  },
  {
    id: "63",
    slug: "career-performance-review-self",
    title: "绩效考核自评与成果量化改写",
    summary: "把日常工作改写成可量化自评条目与证据清单。",
    description:
      "员工粘贴工作流水，Agent 按岗位职级框架改写为自评要点，补充可验证指标与协作影响描述，并生成向上沟通的简短口播版。",
    categories: ["career", "efficiency"],
    platforms: ["feishu", "claude", "deepseek"],
    sourceUrl: "https://www.feishu.cn/",
    sourceLabel: "飞书",
    upvotes: 187,
    trending: false,
    tags: ["绩效", "自评", "量化"],
    howItWorks: [
      "整理工作流水与数据",
      "改写为量化自评条目",
      "生成证据与口播版",
    ],
    tips: ["数据需有出处", "避免贬低同事表述"],
  },
  {
    id: "64",
    slug: "career-internal-transfer-pitch",
    title: "内部转岗申请与价值主张草稿",
    summary: "面向目标团队说明可迁移能力、动机与 90 天贡献计划。",
    description:
      "希望内部转岗的同学输入现状与目标团队职责，Agent 生成申请邮件/飞书文档结构：动机、能力映射、风险与 90 天贡献假设，便于与主管沟通。",
    categories: ["career"],
    platforms: ["feishu", "wecom", "chatgpt"],
    sourceUrl: "https://work.weixin.qq.com/",
    sourceLabel: "企业微信",
    upvotes: 151,
    trending: false,
    tags: ["转岗", "申请", "沟通"],
    howItWorks: [
      "对照目标职责做能力映射",
      "撰写动机与风险说明",
      "输出 90 天贡献计划草稿",
    ],
    tips: ["先与现主管对齐再提交", "贡献计划要可验收"],
  },
  {
    id: "65",
    slug: "shipinhao-script-localize",
    title: "视频号口播稿本地化与合规提示",
    summary: "把抖音脚本改写成视频号语气，并提示常见违规表达。",
    description:
      "创作者提供已有短视频脚本，Agent 按视频号受众调整开场与互动话术，标出可能触发审核的绝对化医疗/收益承诺，给出替代表述。",
    categories: ["content"],
    platforms: ["shipinhao", "wechat", "doubao"],
    sourceUrl: "https://channels.weixin.qq.com/",
    sourceLabel: "微信视频号",
    upvotes: 176,
    trending: true,
    tags: ["视频号", "口播", "合规"],
    howItWorks: [
      "导入原脚本",
      "改写语气与互动点",
      "标注风险表述与替换句",
    ],
    tips: ["引导加企微需符合平台规则", "带货佣金表述要真实"],
  },
  {
    id: "66",
    slug: "content-series-ip-bible",
    title: "人设圣经与系列内容设定卡",
    summary: "沉淀账号人设、禁区与系列栏目，保证长期内容一致。",
    description:
      "新账号或团队输入定位，Agent 输出人设圣经：价值观、口吻、禁说清单与 3 个系列栏目设定卡，供小红书/抖音/视频号统一引用。",
    categories: ["content"],
    platforms: ["xiaohongshu", "douyin", "shipinhao", "kimi"],
    sourceUrl: "https://creator.xiaohongshu.com/",
    sourceLabel: "小红书创作者中心",
    upvotes: 163,
    trending: false,
    tags: ["人设", "系列", "设定"],
    howItWorks: [
      "澄清定位与受众",
      "生成人设与禁区",
      "输出系列栏目设定卡",
    ],
    tips: ["团队共享同一版本文档", "每季度回顾是否漂移"],
  },
  {
    id: "67",
    slug: "content-podcast-outline-cn",
    title: "中文播客大纲与时间戳广告位建议",
    summary: "为单集播客生成大纲、嘉宾问题与自然插入广告点。",
    description:
      "主播给出主题与嘉宾背景，Agent 产出分时段大纲、深挖问题与中插广告自然过渡句，适合即刻/小宇宙等中文播客备播。",
    categories: ["content"],
    platforms: ["chatgpt", "claude", "deepseek"],
    sourceUrl: "https://www.xiaoyuzhoufm.com/",
    sourceLabel: "小宇宙",
    upvotes: 139,
    trending: false,
    tags: ["播客", "大纲", "广告位"],
    howItWorks: [
      "确认主题与嘉宾信息",
      "生成大纲与问题列表",
      "标注自然广告过渡点",
    ],
    tips: ["广告与内容相关更佳", "保留临场追问空间"],
  },
  {
    id: "68",
    slug: "ecommerce-price-monitor-copy",
    title: "竞品调价监测摘要与跟价话术",
    summary: "汇总公开价格变动，生成站内说明与客服解释口径。",
    description:
      "运营导入或粘贴竞品公开标价变化，Agent 输出监测摘要、是否建议跟价的讨论点，以及面向买家的调价说明与客服口径（需人工决策）。",
    categories: ["ecommerce"],
    platforms: ["tongyi", "wenxin", "deepseek"],
    sourceUrl: "https://www.jd.com/",
    sourceLabel: "京东",
    upvotes: 158,
    trending: false,
    tags: ["调价", "竞品", "客服口径"],
    howItWorks: [
      "汇总公开价格变动",
      "输出跟价讨论要点",
      "生成说明与客服口径",
    ],
    tips: ["避免恶意比价违规", "活动价时效写清楚"],
  },
  {
    id: "69",
    slug: "ecommerce-bundle-offer-designer",
    title: "组合套餐命名与利益点设计",
    summary: "按客单价目标设计套餐结构、命名与详情页利益点。",
    description:
      "店铺给出单品与目标客单，Agent 提议 2–3 个组合套餐结构、命名与详情模块利益点，并提示库存占用风险，服务淘宝/拼多多等运营。",
    categories: ["ecommerce"],
    platforms: ["doubao", "kimi", "tongyi"],
    sourceUrl: "https://www.pinduoduo.com/",
    sourceLabel: "拼多多",
    upvotes: 147,
    trending: false,
    tags: ["套餐", "客单价", "命名"],
    howItWorks: [
      "输入单品与客单目标",
      "设计套餐结构与命名",
      "输出详情利益点文案",
    ],
    tips: ["套餐SKU勿过多难管理", "主推款库存单独保障"],
  },
  {
    id: "70",
    slug: "ecommerce-supplier-chat-summary",
    title: "供应商微信群谈判纪要与待确认项",
    summary: "从群聊记录提取报价、交期与未决问题，生成纪要。",
    description:
      "采购把与工厂的微信群关键对话交给 Agent，输出报价条件、交期、样品进度与待确认清单，减少口头约定遗漏。",
    categories: ["ecommerce", "enterprise"],
    platforms: ["wechat", "deepseek", "kimi"],
    sourceUrl: "https://weixin.qq.com/",
    sourceLabel: "微信",
    upvotes: 142,
    trending: false,
    tags: ["供应商", "纪要", "谈判"],
    howItWorks: [
      "导入关键群聊片段",
      "提取报价交期与承诺",
      "列出待确认项并回传群",
    ],
    tips: ["敏感成本脱敏处理", "关键约定补书面确认"],
  },
  {
    id: "71",
    slug: "edu-gaokao-volunteer-questions",
    title: "高考志愿填报信息核对提问清单",
    summary: "按省份与分数位次生成需向学校/家长核对的问题表。",
    description:
      "考生或家长输入省份与大致位次，Agent 整理公开政策维度下的核对问题（再选、学费、就业去向披露等），强调以省考试院与院校官方为准，不作录取承诺。",
    categories: ["education", "life"],
    platforms: ["wenxin", "tongyi", "doubao"],
    sourceUrl: "https://www.gaokao.cn/",
    sourceLabel: "阳光高考",
    upvotes: 205,
    trending: true,
    tags: ["高考", "志愿", "核对"],
    howItWorks: [
      "确认省份与位次区间",
      "生成核对问题清单",
      "标注须查官方源的条目",
    ],
    tips: ["以省考试院文件为准", "警惕非官方付费「包录取」"],
  },
  {
    id: "72",
    slug: "edu-flashcard-from-notes",
    title: "课堂笔记转记忆卡片与自测题",
    summary: "把笔记要点变成问答卡片，并生成当日小测。",
    description:
      "学生上传笔记摘要，Agent 抽取概念制成正反面记忆卡与 5 道自测题，适合考研专业课或资格考证碎片复习。",
    categories: ["education"],
    platforms: ["kimi", "deepseek", "chatgpt"],
    sourceUrl: "https://www.ankiweb.net/",
    sourceLabel: "AnkiWeb",
    upvotes: 171,
    trending: false,
    tags: ["记忆卡", "笔记", "自测"],
    howItWorks: [
      "解析笔记要点",
      "生成问答记忆卡",
      "输出当日自测题",
    ],
    tips: ["一张卡一个知识点", "错题次日优先复习"],
  },
  {
    id: "73",
    slug: "edu-language-hs-sk-partner",
    title: "汉语口语纠错与场景扮演陪练",
    summary: "为留学生或方言区学习者提供场景对话与礼貌用语纠正。",
    description:
      "学习者选择点餐、问路、面试等场景，与 Agent 进行普通话对话；结束后获得发音/用词建议与更得体表达，辅助日常交流（非专业语言治疗）。",
    categories: ["education"],
    platforms: ["doubao", "tongyi", "chatgpt"],
    sourceUrl: "https://www.chineseplus.net/",
    sourceLabel: "汉语联盟相关资源",
    upvotes: 136,
    trending: false,
    tags: ["汉语", "口语", "场景"],
    howItWorks: [
      "选择场景与难度",
      "多轮对话陪练",
      "输出纠错与得体替换",
    ],
    tips: ["结合真实场景多练", "录音对比更有效"],
  },
  {
    id: "74",
    slug: "edu-certificate-study-sprint",
    title: "职业资格考证冲刺错题复盘",
    summary: "按大纲章节归类错题，生成冲刺周复习日程。",
    description:
      "备考教资/会计/消防等考试的用户导入错题，Agent 按大纲章节归类薄弱点，排出冲刺周每日任务与模拟节奏建议。",
    categories: ["education"],
    platforms: ["wenxin", "deepseek", "kimi"],
    sourceUrl: "https://www.neea.edu.cn/",
    sourceLabel: "中国教育考试网",
    upvotes: 164,
    trending: false,
    tags: ["考证", "错题", "冲刺"],
    howItWorks: [
      "导入错题与大纲章节",
      "归类薄弱点",
      "生成冲刺周日程",
    ],
    tips: ["真题优先于题海", "模拟按正式时长"],
  },
  {
    id: "75",
    slug: "life-hospital-visit-prep",
    title: "就医前症状时间线与提问清单",
    summary: "整理症状发生时间与用药史，生成问诊时想问医生的问题。",
    description:
      "用户按提示记录症状时间线、既有疾病与用药，Agent 生成结构化摘要与问诊问题清单，便于门诊沟通；不做诊断或用药建议。",
    categories: ["life"],
    platforms: ["doubao", "wenxin", "chatgpt"],
    sourceUrl: "https://www.nhc.gov.cn/",
    sourceLabel: "国家卫健委",
    upvotes: 149,
    trending: false,
    tags: ["就医", "问诊", "清单"],
    howItWorks: [
      "采集症状时间线与用药史",
      "生成结构化摘要",
      "输出问诊问题清单",
    ],
    tips: ["急症优先就医勿等待", "处方药遵医嘱"],
  },
  {
    id: "76",
    slug: "life-renting-contract-checklist",
    title: "租房合同检查要点与沟通话术",
    summary: "列出押金、维修与解约等高频风险点，并生成与房东沟通话术。",
    description:
      "租客对照合同文本，Agent 提示押金退还、维修责任、转租与提前解约等常见要点，并生成礼貌沟通话术；重大争议建议寻求正规援助。",
    categories: ["life"],
    platforms: ["kimi", "deepseek", "claude"],
    sourceUrl: "https://www.mohurd.gov.cn/",
    sourceLabel: "住建部",
    upvotes: 167,
    trending: false,
    tags: ["租房", "合同", "话术"],
    howItWorks: [
      "对照合同提取关键条款",
      "列出风险检查要点",
      "生成与房东沟通话术",
    ],
    tips: ["签字前拍照留存", "中介费规则写进合同"],
  },
  {
    id: "77",
    slug: "life-baby-vaccine-schedule-q",
    title: "儿童疫苗程序答疑与预约提醒文案",
    summary: "按月龄解释公开免疫程序要点，并生成预约提醒话术。",
    description:
      "家长输入月龄，Agent 基于公开免疫规划信息说明常见针次与注意事项提问清单，生成日历提醒文案；具体接种以社区医院通知为准。",
    categories: ["life", "education"],
    platforms: ["doubao", "tongyi", "wenxin"],
    sourceUrl: "https://www.chinacdc.cn/",
    sourceLabel: "中国疾控中心",
    upvotes: 155,
    trending: false,
    tags: ["疫苗", "育儿", "提醒"],
    howItWorks: [
      "确认月龄与地区",
      "整理公开程序要点",
      "生成预约提醒文案",
    ],
    tips: ["以当地妇幼通知为准", "身体不适先咨询医生"],
  },
  {
    id: "78",
    slug: "life-pet-care-symptom-log",
    title: "宠物异常记录与就诊信息整理",
    summary: "记录饮食排泄与行为变化，生成带去宠物医院的摘要。",
    description:
      "养宠家庭按模板记录异常，Agent 整理成就诊摘要与想问兽医的问题；不做诊疗结论，急症请立即就医。",
    categories: ["life"],
    platforms: ["doubao", "kimi", "chatgpt"],
    sourceUrl: "https://www.cadc.net.cn/",
    sourceLabel: "中国动物疫病预防控制中心",
    upvotes: 133,
    trending: false,
    tags: ["宠物", "就诊", "记录"],
    howItWorks: [
      "按模板记录异常",
      "生成就诊摘要",
      "列出待问兽医问题",
    ],
    tips: ["中毒外伤立即就医", "带上既往病历与用药"],
  },
  {
    id: "79",
    slug: "devtools-openapi-mock-data",
    title: "OpenAPI 示例转 Mock 数据与边界用例",
    summary: "根据接口 schema 生成正常/异常 Mock 与测试用例表。",
    description:
      "前端或测试同学粘贴 OpenAPI 片段，Agent 生成 Mock JSON、边界值与错误码用例表，加速联调前自测。",
    categories: ["devtools"],
    platforms: ["claude", "deepseek", "chatgpt"],
    sourceUrl: "https://swagger.io/specification/",
    sourceLabel: "OpenAPI Specification",
    upvotes: 174,
    trending: false,
    tags: ["OpenAPI", "Mock", "测试"],
    howItWorks: [
      "解析 schema 字段",
      "生成 Mock 与边界数据",
      "输出错误码用例表",
    ],
    tips: ["与后端错误码文档对齐", "含空数组与超长字符串"],
  },
  {
    id: "80",
    slug: "devtools-changelog-cn-writer",
    title: "提交记录生成中文 Changelog",
    summary: "从 commit 列表归纳用户可读的版本更新说明。",
    description:
      "独立开发者粘贴 git log 或 PR 标题，Agent 按「新功能/修复/破坏性变更」输出中文 Changelog，可直接用于应用商店或飞书发布帖。",
    categories: ["devtools"],
    platforms: ["claude", "deepseek", "feishu"],
    sourceUrl: "https://keepachangelog.com/zh-CN/",
    sourceLabel: "Keep a Changelog",
    upvotes: 161,
    trending: false,
    tags: ["Changelog", "发布", "提交"],
    howItWorks: [
      "汇总提交与 PR 标题",
      "按类型归类改动",
      "输出用户可读中文说明",
    ],
    tips: ["对用户无感的内部改动可省略", "破坏性变更单独置顶"],
  },
  {
    id: "81",
    slug: "devtools-regex-explain-cn",
    title: "正则表达式中文解释与改写建议",
    summary: "把难懂正则翻译成逐步说明，并提示灾难性回溯风险。",
    description:
      "开发者粘贴正则与样例字符串，Agent 用中文逐步解释匹配过程，给出更清晰改写建议，并提示可能的性能风险。",
    categories: ["devtools"],
    platforms: ["chatgpt", "deepseek", "tongyi"],
    sourceUrl: "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_expressions",
    sourceLabel: "MDN 正则指南",
    upvotes: 152,
    trending: false,
    tags: ["正则", "解释", "性能"],
    howItWorks: [
      "粘贴正则与样例",
      "逐步中文解释匹配",
      "给出改写与风险提示",
    ],
    tips: ["用单元测试锁定行为", "避免过度复杂嵌套"],
  },
  {
    id: "82",
    slug: "devtools-dockerfile-harden-hints",
    title: "Dockerfile 可读性整理与安全提示",
    summary: "重排指令层级并提示常见密钥泄露与过大镜像问题。",
    description:
      "把现有 Dockerfile 交给 Agent，获得分层建议、多阶段构建思路与「勿把密钥写入镜像」等检查清单，降低基础镜像膨胀与泄露风险。",
    categories: ["devtools"],
    platforms: ["claude", "chatgpt", "deepseek"],
    sourceUrl: "https://docs.docker.com/build/building/best-practices/",
    sourceLabel: "Docker Best Practices",
    upvotes: 145,
    trending: false,
    tags: ["Docker", "安全", "镜像"],
    howItWorks: [
      "分析现有 Dockerfile",
      "建议分层与多阶段",
      "输出密钥与体积检查项",
    ],
    tips: ["使用非 root 用户", "密钥走构建密钥或运行时注入"],
  },
  {
    id: "83",
    slug: "enterprise-okrs-alignment-workshop",
    title: "跨部门 OKR 对齐会引导大纲",
    summary: "生成对齐会流程、冲突议题板与会后决议模板。",
    description:
      "业务 TL 准备跨部门对齐会时，Agent 输出议程、依赖冲突板与会后「决议/未决/负责人」模板，可直接放进飞书或钉钉文档。",
    categories: ["enterprise"],
    platforms: ["feishu", "dingtalk", "chatgpt"],
    sourceUrl: "https://www.feishu.cn/product/docs",
    sourceLabel: "飞书文档",
    upvotes: 140,
    trending: false,
    tags: ["OKR", "对齐会", "决议"],
    howItWorks: [
      "收集各方目标草案",
      "生成会议引导大纲",
      "输出决议与未决模板",
    ],
    tips: ["会前共享材料", "未决项必须定下次时间"],
  },
  {
    id: "84",
    slug: "enterprise-customer-success-qbq",
    title: "客户成功季度业务回顾材料草稿",
    summary: "汇总使用数据叙事，生成 QBR 幻灯结构与行动项。",
    description:
      "客户成功经理输入产品使用要点与续费风险，Agent 生成季度业务回顾大纲、价值叙事与下季联合行动项，适配企微/飞书客户群分享。",
    categories: ["enterprise"],
    platforms: ["wecom", "feishu", "claude"],
    sourceUrl: "https://work.weixin.qq.com/",
    sourceLabel: "企业微信",
    upvotes: 138,
    trending: false,
    tags: ["客户成功", "QBR", "续费"],
    howItWorks: [
      "整理使用数据与风险点",
      "生成 QBR 结构与叙事",
      "列出联合行动项",
    ],
    tips: ["数据图表另附源文件", "承诺交付需内部确认"],
  },
  {
    id: "85",
    slug: "enterprise-security-awareness-quiz",
    title: "信息安全意识培训案例与测验题",
    summary: "生成钓鱼识别案例、正确做法与简短测验。",
    description:
      "安全或行政同学配置培训主题，Agent 输出贴近国内办公场景的案例故事、正确处置步骤与 5 道测验题，可发钉钉/企微学习群。",
    categories: ["enterprise", "education"],
    platforms: ["dingtalk", "wecom", "tongyi"],
    sourceUrl: "https://www.miit.gov.cn/",
    sourceLabel: "工业和信息化部",
    upvotes: 129,
    trending: false,
    tags: ["安全意识", "钓鱼", "测验"],
    howItWorks: [
      "选定培训主题",
      "生成案例与正确做法",
      "输出测验题与答案要点",
    ],
    tips: ["案例勿使用真实泄露数据", "定期更换题库"],
  },
  {
    id: "86",
    slug: "grok-social-trend-topic-cn",
    title: "社媒热点转译为品牌可参与话题",
    summary: "跟踪公开热点并判断是否适合品牌发声与怎么说。",
    description:
      "市场同学设定品牌边界，Agent（含 Grok Bot）把公开热点转成「可参与/需回避」判断与中文发声角度建议，降低跟风翻车风险。",
    categories: ["content", "efficiency"],
    platforms: ["grok", "xiaohongshu", "douyin", "shipinhao"],
    sourceUrl: "https://x.com/",
    sourceLabel: "X",
    upvotes: 168,
    trending: true,
    tags: ["热点", "品牌", "发声"],
    howItWorks: [
      "设定品牌人设与禁区",
      "转译公开热点",
      "输出可参与角度或回避理由",
    ],
    tips: ["灾难与争议话题默认回避", "发前法务/公关复核"],
  },
  {
    id: "87",
    slug: "wecom-meeting-prep-brief",
    title: "企微会议前一页纸简报",
    summary: "会前自动汇总相关文档、未决问题与参会人背景要点。",
    description:
      "助理或负责人在会前触发 Agent，汇总企微/文档中的相关材料，输出一页纸：目标、未决、风险与建议问题，提高会议效率。",
    categories: ["efficiency", "enterprise"],
    platforms: ["wecom", "deepseek", "kimi"],
    sourceUrl: "https://work.weixin.qq.com/",
    sourceLabel: "企业微信",
    upvotes: 150,
    trending: false,
    tags: ["会前", "简报", "企微"],
    howItWorks: [
      "收集相关文档与聊天要点",
      "压缩为一页纸简报",
      "列出建议提问",
    ],
    tips: ["简报会前 30 分钟发出", "机密内容控制分发范围"],
  },
  {
    id: "88",
    slug: "feishu-approval-sla-reminder",
    title: "飞书审批超时催办与升级路径",
    summary: "超时未批自动温和催办，多次未响应则升级抄送。",
    description:
      "流程管理员配置 SLA，Agent/机器人在飞书审批超时后发送催办，并按次数升级抄送上级，减少单据积压。",
    categories: ["enterprise", "efficiency"],
    platforms: ["feishu", "coze", "tongyi"],
    sourceUrl: "https://www.feishu.cn/product/approval",
    sourceLabel: "飞书审批",
    upvotes: 143,
    trending: false,
    tags: ["审批", "SLA", "催办"],
    howItWorks: [
      "配置超时阈值",
      "发送分级催办消息",
      "多次未响应升级抄送",
    ],
    tips: ["催办语气保持尊重", "法定假期暂停计时"],
  },
  {
    id: "89",
    slug: "dingtalk-hr-policy-diff",
    title: "钉钉制度修订对照说明生成",
    summary: "对比新旧制度文本，输出员工可读的变更说明。",
    description:
      "HR 提供新旧制度版本，Agent 提炼变更点、影响人群与生效日期说明，生成可发钉钉公告的对照稿，降低误解。",
    categories: ["enterprise"],
    platforms: ["dingtalk", "wenxin", "deepseek"],
    sourceUrl: "https://www.dingtalk.com/",
    sourceLabel: "钉钉",
    upvotes: 127,
    trending: false,
    tags: ["制度", "对照", "HR"],
    howItWorks: [
      "对比新旧文本差异",
      "提炼影响与生效日",
      "生成员工可读公告",
    ],
    tips: ["法律条款保留原文链接", "重大变更安排答疑会"],
  },
  {
    id: "90",
    slug: "xiaohongshu-live-replay-notes",
    title: "小红书直播回放要点与商品时间戳",
    summary: "从直播口述中提取卖点与商品出场时间，便于剪辑复用。",
    description:
      "运营提供直播转写，Agent 输出章节要点、商品出场时间戳与短视频切片选题，提升回放利用率。",
    categories: ["content", "ecommerce"],
    platforms: ["xiaohongshu", "kimi", "doubao"],
    sourceUrl: "https://creator.xiaohongshu.com/",
    sourceLabel: "小红书创作者中心",
    upvotes: 159,
    trending: false,
    tags: ["直播回放", "时间戳", "切片"],
    howItWorks: [
      "导入直播转写",
      "提取卖点与时间戳",
      "生成切片选题列表",
    ],
    tips: ["价格以当场为准再核验", "切片保留完整资质展示"],
  },
  {
    id: "91",
    slug: "douyin-shop-window-copy",
    title: "抖音橱窗选品卖点短描述批量生成",
    summary: "为橱窗商品生成符合平台语气的短卖点与限时提示。",
    description:
      "达人导入商品列表与核心参数，Agent 批量生成橱窗短描述与合规限时提示，减少逐条手写时间。",
    categories: ["ecommerce", "content"],
    platforms: ["douyin", "doubao", "deepseek"],
    sourceUrl: "https://creator.douyin.com/",
    sourceLabel: "抖音创作者中心",
    upvotes: 172,
    trending: false,
    tags: ["橱窗", "卖点", "批量"],
    howItWorks: [
      "导入商品与参数",
      "批量生成短卖点",
      "附加合规限时提示",
    ],
    tips: ["禁虚构销量与疗效", "与商详关键参数一致"],
  },
  {
    id: "92",
    slug: "shipinhao-private-domain-funnel",
    title: "视频号到企微私域转化话术漏斗",
    summary: "设计评论区引导、欢迎语与分层培育消息序列。",
    description:
      "私域运营规划从视频号观看→评论/私信→加企微→分层培育的话术漏斗，Agent 输出各阶段文案与频次建议，避免骚扰式触达。",
    categories: ["ecommerce", "content"],
    platforms: ["shipinhao", "wecom", "wechat", "coze"],
    sourceUrl: "https://channels.weixin.qq.com/",
    sourceLabel: "微信视频号",
    upvotes: 181,
    trending: true,
    tags: ["私域", "漏斗", "企微"],
    howItWorks: [
      "定义转化阶段目标",
      "生成各阶段话术",
      "设定触达频次上限",
    ],
    tips: ["首次欢迎语提供价值", "退订路径要清晰"],
  },
  {
    id: "93",
    slug: "career-mentor-1on1-agenda",
    title: "师徒 1on1 议程与反馈句式助手",
    summary: "为导师与新同学生成双周 1on1 议程与建设性反馈句式。",
    description:
      "企业导师制度场景：Agent 根据新人阶段生成 1on1 议程、成长问题与非伤人反馈句式，可放在飞书或企微文档中复用。",
    categories: ["career", "enterprise"],
    platforms: ["feishu", "wecom", "chatgpt"],
    sourceUrl: "https://www.feishu.cn/",
    sourceLabel: "飞书",
    upvotes: 135,
    trending: false,
    tags: ["导师", "1on1", "反馈"],
    howItWorks: [
      "确认新人阶段目标",
      "生成议程与问题",
      "提供建设性反馈句式",
    ],
    tips: ["反馈对事不对人", "每次只抓 1–2 个改进点"],
  },
  {
    id: "94",
    slug: "efficiency-meeting-decliner",
    title: "低价值会议婉拒与异步替代方案",
    summary: "识别可异步事项，生成礼貌婉拒与文档协作替代建议。",
    description:
      "个人效率场景：用户粘贴会议邀请说明，Agent 判断是否可改为文档评论/录屏，并生成婉拒话术与替代协作方式，保护专注时间。",
    categories: ["efficiency"],
    platforms: ["feishu", "dingtalk", "claude"],
    sourceUrl: "https://www.feishu.cn/hc/zh-CN",
    sourceLabel: "飞书帮助中心",
    upvotes: 178,
    trending: false,
    tags: ["会议", "婉拒", "异步"],
    howItWorks: [
      "分析会议目的与必要参会人",
      "提出异步替代方案",
      "生成礼貌婉拒话术",
    ],
    tips: ["对外部客户会议谨慎婉拒", "提出替代方案更易被接受"],
  },
  {
    id: "95",
    slug: "education-reading-club-guide",
    title: "读书会导读问题与章节讨论稿",
    summary: "按书籍章节生成导读问题、金句讨论与作业。",
    description:
      "社群或校园读书会组织者输入书名与章节，Agent 输出导读问题、讨论节奏与可选作业，促进深度阅读而非读后感堆砌。",
    categories: ["education", "life"],
    platforms: ["kimi", "doubao", "chatgpt"],
    sourceUrl: "https://www.nationalreading.gov.cn/",
    sourceLabel: "国家阅读相关站点",
    upvotes: 124,
    trending: false,
    tags: ["读书会", "导读", "讨论"],
    howItWorks: [
      "确认书名与章节范围",
      "生成导读与讨论问题",
      "设计可选作业",
    ],
    tips: ["尊重版权勿传播盗版电子书", "讨论鼓励多元观点"],
  },
  {
    id: "96",
    slug: "devtools-ci-failure-explain",
    title: "CI 失败日志中文归因与修复草案",
    summary: "解读流水线失败日志，给出可能原因与验证步骤。",
    description:
      "开发者粘贴 CI 失败片段，Agent 用中文归纳可能原因（依赖、权限、不稳定测试等），给出本地复现与修复草案，加速绿灯。",
    categories: ["devtools"],
    platforms: ["deepseek", "claude", "chatgpt"],
    sourceUrl: "https://docs.github.com/zh/actions",
    sourceLabel: "GitHub Actions 文档",
    upvotes: 169,
    trending: false,
    tags: ["CI", "日志", "修复"],
    howItWorks: [
      "粘贴失败日志关键段",
      "归纳可能原因",
      "给出复现与修复草案",
    ],
    tips: ["先本地复现再改 CI", "密钥错误勿贴完整 secret"],
  },
  {
    id: "97",
    slug: "life-utility-bill-anomaly",
    title: "水电燃气账单异常解读与节约建议",
    summary: "对比历史用量解释异常波动，并给出可执行节约动作。",
    description:
      "用户输入近几月用量，Agent 解释可能原因（季节、入住人数、设备），给出排查清单与节约建议；怀疑抄表错误时指引联系官方渠道。",
    categories: ["life", "efficiency"],
    platforms: ["tongyi", "wenxin", "doubao"],
    sourceUrl: "https://www.gov.cn/",
    sourceLabel: "中国政府网",
    upvotes: 131,
    trending: false,
    tags: ["账单", "节能", "排查"],
    howItWorks: [
      "对比历史用量",
      "列出可能原因",
      "给出排查与节约动作",
    ],
    tips: ["漏水优先检查", "通过官方 App 核对读数"],
  },
  {
    id: "98",
    slug: "enterprise-helpdesk-macro-library",
    title: "IT 服务台宏回复与分类标签库",
    summary: "沉淀高频工单宏回复，并统一分类标签便于统计。",
    description:
      "IT 服务台把高频问题交给 Agent，生成宏回复、分类标签与升级条件说明，可配置到企微/钉钉工单，缩短首次响应。",
    categories: ["enterprise", "devtools"],
    platforms: ["wecom", "dingtalk", "dify"],
    sourceUrl: "https://www.dingtalk.com/",
    sourceLabel: "钉钉",
    upvotes: 148,
    trending: false,
    tags: ["服务台", "宏回复", "工单"],
    howItWorks: [
      "汇总高频工单类型",
      "生成宏回复与标签",
      "定义升级条件",
    ],
    tips: ["宏回复留人工修改位", "每月清理过时条目"],
  },
  {
    id: "99",
    slug: "content-wechat-channel-live-host",
    title: "视频号直播中控提词与互动节奏",
    summary: "为中控生成提词卡、抽奖节点与冷场救场话术。",
    description:
      "视频号直播中控输入场次目标，Agent 输出提词卡、互动问题、抽奖节点与冷场救场话术，帮助主播稳住节奏。",
    categories: ["content"],
    platforms: ["shipinhao", "wechat", "doubao"],
    sourceUrl: "https://channels.weixin.qq.com/",
    sourceLabel: "微信视频号",
    upvotes: 160,
    trending: false,
    tags: ["直播", "提词", "中控"],
    howItWorks: [
      "确认场次目标与时长",
      "生成提词与互动节点",
      "准备冷场救场话术",
    ],
    tips: ["抽奖规则提前公示", "敏感承诺现场核实"],
  },
  {
    id: "100",
    slug: "career-salary-structure-explain",
    title: "薪资结构拆解与年终奖期望沟通稿",
    summary: "把复杂薪资包拆成白话，并生成与主管沟通年终期望的草稿。",
    description:
      "职场人输入薪资结构字段，Agent 用白话解释底薪/绩效/补贴关系，并生成向上沟通年终期望的要点（保持专业克制）。",
    categories: ["career"],
    platforms: ["chatgpt", "kimi", "deepseek"],
    sourceUrl: "https://www.liepin.com/",
    sourceLabel: "猎聘",
    upvotes: 156,
    trending: false,
    tags: ["薪资结构", "年终", "沟通"],
    howItWorks: [
      "拆解薪资包字段",
      "输出白话说明",
      "生成沟通要点草稿",
    ],
    tips: ["以劳动合同与制度为准", "沟通准备业绩证据"],
  },
  {
    id: "101",
    slug: "efficiency-grok-research-digest",
    title: "专题调研提纲与中文结论卡",
    summary: "给定调研问题，生成提纲、信息源类型与一页结论卡模板。",
    description:
      "咨询或创业者提出调研问题，Agent（含 Grok Bot）输出调研提纲、应查的公开信息源类型与结论卡模板，加速形成可分享中文结论（需人工核实数据）。",
    categories: ["efficiency"],
    platforms: ["grok", "chatgpt", "feishu"],
    sourceUrl: "https://x.com/",
    sourceLabel: "X",
    upvotes: 141,
    trending: false,
    tags: ["调研", "提纲", "结论卡"],
    howItWorks: [
      "澄清调研问题",
      "生成提纲与信息源类型",
      "输出一页结论卡模板",
    ],
    tips: ["关键数字标注出处", "区分事实与推断"],
  },
  {
    id: "102",
    slug: "education-parent-teacher-message",
    title: "家校沟通消息礼貌改写与要点对齐",
    summary: "把情绪化消息改成礼貌清楚的家校沟通文本。",
    description:
      "家长或老师起草沟通草稿，Agent 改写为礼貌、具体、可执行的家校消息，并列出需要双方确认的要点，减少误解。",
    categories: ["education", "life"],
    platforms: ["wechat", "doubao", "wenxin"],
    sourceUrl: "https://www.moe.gov.cn/",
    sourceLabel: "教育部",
    upvotes: 153,
    trending: false,
    tags: ["家校", "沟通", "改写"],
    howItWorks: [
      "粘贴原始草稿",
      "改写为礼貌清晰文本",
      "列出待确认要点",
    ],
    tips: ["避免当众批评孩子", "约定跟进时间"],
  },
  {
    id: "103",
    slug: "cross-app-todo-evening-review",
    title: "跨 App 待办聚合晚间复盘",
    summary: "把飞书任务、日历未完成项与备忘草稿收成今晚 Top3 与风险提醒（默认只读聚合）。",
    description: "傍晚从飞书任务看板/我负责的与日历拉取未完成，可粘贴其它清单；排 Top3 与风险。默认只读，回写须确认。",
    categories: ["efficiency"],
    platforms: ["feishu", "wechat", "deepseek"],
    sourceUrl:
      "https://www.feishu.cn/hc/zh-CN/articles/582035458116-%E4%BB%BB%E5%8A%A1%E7%9C%8B%E6%9D%BF%E8%A7%86%E5%9B%BE",
    sourceLabel: "飞书帮助中心·任务看板视图",
    upvotes: 115,
    trending: false,
    tags: ["待办", "复盘", "优先级", "只读聚合"],
    howItWorks: ["拉取任务/日历", "排序生成 Top3", "复盘卡（回写需确认）"],
    tips: ["默认只读", "字段先映射标题/截止日/来源"],
  },
  {
    id: "104",
    slug: "group-chat-decision-onepager",
    title: "群聊决策纪要一页纸",
    summary: "从导出的群聊记录提炼决议、未决与责任人，生成可转发一页纸。",
    description:
      "飞书「消息导出到文档」后交给 Agent；三分栏决议/待确认/责任人。企微仅合规授权存档时用官方能力。导出前告知同事用途。",
    categories: ["efficiency"],
    platforms: ["feishu", "wecom", "deepseek"],
    sourceUrl:
      "https://www.feishu.cn/hc/zh-CN/articles/158045525235-%E4%BD%BF%E7%94%A8%E6%B6%88%E6%81%AF%E5%AF%BC%E5%87%BA%E5%88%B0%E6%96%87%E6%A1%A3%E5%8A%9F%E8%83%BD",
    sourceLabel: "飞书帮助中心·消息导出到文档",
    upvotes: 118,
    trending: false,
    tags: ["群聊", "纪要", "决议", "隐私"],
    howItWorks: ["知悉后导出", "识别决议/未决/责任人", "一页纸标待确认"],
    tips: ["不绕过保密/禁转", "外发先脱敏"],
  },
  {
    id: "105",
    slug: "error-alert-triage-digest",
    title: "错误监控告警归类值班摘要",
    summary: "把 Sentry 等告警按服务与指纹聚类，输出值班中文摘要与建议排查顺序。",
    description:
      "对接 Alerts/webhook，按 project/fingerprint/环境去噪；输出影响面、是否回归、排查顺序与 Issue 链接。只归类说明。",
    categories: ["devtools"],
    platforms: ["deepseek", "claude", "n8n"],
    sourceUrl: "https://docs.sentry.io/product/monitors-and-alerts/alerts/",
    sourceLabel: "Sentry Docs·Alerts",
    upvotes: 120,
    trending: false,
    tags: ["监控", "告警", "值班", "归类"],
    howItWorks: ["收告警", "聚类标升级/回归", "中文值班摘要"],
    tips: ["禁止自动重启生产或自动修", "区分新问题/回归/噪声"],
  },
  {
    id: "106",
    slug: "dep-upgrade-breaking-change-brief",
    title: "依赖升级 Breaking Change 影响说明",
    summary: "对照 changelog 与锁文件，生成中文影响面、迁移清单与回归用例草稿。",
    description:
      "输入包名与目标版本+锁文件片段；按 SemVer 区分 breaking/minor/patch；每条 breaking 附版本/changelog 链接。",
    categories: ["devtools"],
    platforms: ["deepseek", "claude", "chatgpt"],
    sourceUrl: "https://docs.npmjs.com/about-semantic-versioning/",
    sourceLabel: "npm Docs·语义化版本",
    upvotes: 122,
    trending: false,
    tags: ["依赖升级", "SemVer", "Breaking Change", "迁移"],
    howItWorks: ["读版本与锁文件", "核对公开 changelog", "影响面+迁移+回归（均带链接）"],
    tips: ["无说明标待上游确认", "可参考 Keep a Changelog 分组"],
  },
  {
    id: "107",
    slug: "ticket-sla-escalation-helper",
    title: "工单 SLA 超时预警与升级话术",
    summary: "按约定 SLA 扫描未关工单，分级催办并在多次超时后生成升级抄送话术。",
    description:
      "【区别审批催办：面向客服/IT 服务台工单】对接飞书服务台或自建工单表；首次温和催办，多次超时升级抄送。默认草稿/确认后发，不自动对外承诺赔付。",
    categories: ["enterprise"],
    platforms: ["feishu", "wecom", "dingtalk"],
    sourceUrl: "https://open.feishu.cn/document/server-docs/helpdesk-v1/overview",
    sourceLabel: "飞书开放平台·服务台概述",
    upvotes: 125,
    trending: false,
    tags: ["工单", "SLA", "催办", "升级"],
    howItWorks: ["配 SLA", "扫描未关单", "分级话术确认后发"],
    tips: ["与审批催办分流", "对外勿自动承诺赔付"],
  },
  {
    id: "108",
    slug: "playwright-fail-triage-brief",
    title: "Playwright 失败用例追踪归因与修复草案",
    summary:
      "CI 失败用例对照 Trace → 中文归因、最小复现与修复草案，人工确认后再改代码。",
    description:
      "CI 失败后拉取 Playwright Trace，按环境、选择器、时序、数据四类归因，输出脱敏的最小复现步骤与修复草案。默认只出草稿，人工确认后再改测试或产品代码。",
    categories: ["devtools"],
    platforms: ["deepseek", "claude", "n8n"],
    sourceUrl: "https://playwright.dev/docs/trace-viewer",
    sourceLabel: "Playwright · Trace viewer",
    upvotes: 118,
    trending: false,
    tags: ["Playwright", "Trace", "CI", "归因"],
    howItWorks: [
      "拉取失败 Trace",
      "按环境/选择器/时序/数据归因",
      "脱敏最小复现并出修复草案",
    ],
    tips: ["合并前本地重跑", "勿贴密钥"],
  },
  {
    id: "109",
    slug: "vercel-deploy-log-digest",
    title: "Vercel 部署日志异常摘要与回滚建议",
    summary: "聚类构建/Runtime 错误 → 异常摘要与「热修/回滚/配额」决策清单。",
    description:
      "拉取近期构建与 Runtime 日志，对照上次成功部署聚类错误，输出中文异常摘要与热修、回滚、配额三类决策清单。回滚须有权限的同学在控制台执行，Agent 只给建议。",
    categories: ["devtools"],
    platforms: ["deepseek", "claude", "chatgpt"],
    sourceUrl: "https://vercel.com/docs/observability/logs",
    sourceLabel: "Vercel Docs · Logs",
    upvotes: 126,
    trending: false,
    tags: ["Vercel", "部署日志", "回滚", "摘要"],
    howItWorks: [
      "拉近期构建与 Runtime 日志",
      "对比上次成功部署",
      "输出异常摘要与热修/回滚/配额清单",
    ],
    tips: ["密钥打码", "回滚须有权限同学在控制台执行"],
  },
  {
    id: "110",
    slug: "gmail-label-filter-suggester",
    title: "Gmail 标签与过滤器规则建议助手",
    summary:
      "主题/发件人样例 → 标签树与过滤器条件/动作草稿，用户按帮助中心自行创建。",
    description:
      "【区别个人邮箱分拣：本条只设计标签树与过滤规则，不读信、不写回复】根据主题与发件人样例，输出标签层级及过滤器的条件/动作草稿；用户按帮助中心自行创建，不自动改邮箱设置。",
    categories: ["efficiency"],
    platforms: ["chatgpt", "deepseek", "kimi"],
    sourceUrl: "https://support.google.com/mail/answer/6579?hl=zh-Hans",
    sourceLabel: "Gmail 帮助·过滤规则",
    upvotes: 113,
    trending: false,
    tags: ["Gmail", "标签", "过滤器", "规则"],
    howItWorks: [
      "收集主题与发件人样例",
      "设计标签树",
      "输出条件与动作草稿",
    ],
    tips: ["先小范围试跑", "勿自动改邮箱设置"],
  },
  {
    id: "111",
    slug: "stripe-failed-payment-dunning-draft",
    title: "Stripe 支付失败催收邮件中文草稿",
    summary: "payment_failed 事件 → 多轮中文催收/更新卡草稿，人工审核后发送。",
    description:
      "围绕 Stripe payment_failed 与智能重试场景，起草多轮中文催收与更新支付方式邮件；人工审核后再发。不替代 Stripe 重试配置，禁止粘贴卡号，语气温和并附退订与合规说明。",
    categories: ["devtools", "enterprise"],
    platforms: ["deepseek", "chatgpt", "n8n"],
    sourceUrl: "https://docs.stripe.com/billing/revenue-recovery/smart-retries",
    sourceLabel: "Stripe · Smart retries",
    upvotes: 129,
    trending: false,
    tags: ["Stripe", "催收", "支付失败", "邮件草稿"],
    howItWorks: [
      "读取 payment_failed 上下文",
      "按轮次起草催收与更新卡邮件",
      "人工审核后发送",
    ],
    tips: ["不代替 Stripe 重试配置", "禁贴卡号；温和语气并附退订合规"],
  },
  {
    id: "112",
    slug: "wecom-group-signal-daily-digest",
    title: "企微群「需跟进」信号日汇总",
    summary: "授权群日摘要 → 阻塞/承诺/风险信号跟进清单，确认后应用消息推送。",
    description:
      "对授权企微群做日摘要，抽出阻塞、承诺与风险信号，整理成跟进清单；人工确认后经应用消息接口推送。仅白名单群，客户群只保留摘要级内容。",
    categories: ["enterprise", "efficiency"],
    platforms: ["wecom", "coze", "deepseek"],
    sourceUrl: "https://developer.work.weixin.qq.com/document/path/90236",
    sourceLabel: "企微·发送应用消息",
    upvotes: 121,
    trending: false,
    tags: ["企微", "日汇总", "跟进", "应用消息"],
    howItWorks: [
      "汇总授权群当日消息",
      "抽出阻塞/承诺/风险",
      "确认后经应用消息推送",
    ],
    tips: ["仅白名单群", "推送前人工确认；客户群只存摘要级"],
  },
  {
    id: "113",
    slug: "ticket-to-pr-agent-pipeline",
    title: "工单自动开 PR 并推进合并",
    summary: "把 Issue/任务描述整理成可执行改动范围，由 Agent 开分支、写补丁并开出可审 PR，人工过审后再合并。",
    description: "面向独立开发者与小团队：从 GitHub Issue、项目看板或简单工单文本出发，Agent 先澄清验收标准与影响面，再在沙箱或本地检出代码、实现最小改动、跑约定检查，最后开出带说明的 PR。全程保留人工闸门——合并、权限与线上发布仍由人确认。适合重复性小需求与缺陷修复流水线化，而不是替代架构决策。",
    categories: ["devtools"],
    platforms: ["chatgpt","claude","deepseek"],
    sourceUrl: "https://github.com/jonwiggins/optio",
    sourceLabel: "GitHub · optio",
    upvotes: 63,
    trending: false,
    tags: ["工单","Pull Request","独立开发者","流水线"],
    howItWorks: [
      "粘贴或拉取工单正文，让 Agent 输出改动范围、风险与验收清单",
      "在隔离分支实现最小补丁并跑项目既有测试/ lint",
      "开 PR 附中文说明与自测步骤，人工评审通过后再合并",
    ],
    tips: [
      "工单里写清「不改什么」，能显著减少 Agent 越界重构",
      "合并前强制要求 CI 绿与至少一人 Approve",
    ],
  },
  {
    id: "114",
    slug: "oss-bugfix-with-tests-agent",
    title: "开源缺陷对照测试用例自动修复草案",
    summary: "用失败测试或新增复现用例约束 Agent，生成修复草案与说明，本地/CI 验证后再提 PR。",
    description: "修开源或业务仓库缺陷时，先把「红灯测试」或最小复现用例交给 Agent，要求补丁必须以测试转绿为目标。Agent 输出根因假设、改动点与测试结果摘要；禁止无测试约束的大范围改写。适合独立开发者贡献上游或维护自有库时的规范化修 bug 流程。",
    categories: ["devtools"],
    platforms: ["claude","chatgpt","deepseek"],
    sourceUrl: "https://news.ycombinator.com/item?id=50232800",
    sourceLabel: "Hacker News 讨论",
    upvotes: 81,
    trending: false,
    tags: ["开源","测试驱动","缺陷修复","PR"],
    howItWorks: [
      "收集失败断言、日志与最小复现步骤，写成测试或复现脚本",
      "Agent 在测试约束下提出补丁草案并解释假设",
      "本地与 CI 重跑相关套件，通过后再开 PR",
    ],
    tips: [
      "先锁住复现测试再改生产代码，避免「看起来修了但无回归保护」",
      "若涉及外部服务，用 mock/fixture，勿把真实密钥喂给模型",
    ],
  },
  {
    id: "115",
    slug: "ci-fix-bot-fleet-prs",
    title: "工程师 Bot 舰队修 CI 并提 PR",
    summary: "多路 Agent 并行认领 CI 红灯任务，各自开修复分支与 PR，由人做最终合并裁决。",
    description: "当主分支或发布分支连续 CI 失败时，把失败任务拆成可并行队列（单测、类型检查、构建、E2E 等）。每个 Agent 认领一类失败日志，定位最近可疑提交并提交小而可回滚的修复 PR。适合独立团队在发布窗口前清红灯，强调「并行草案 + 人工合并」而非无人值守直推主干。",
    categories: ["devtools"],
    platforms: ["claude","chatgpt","grok"],
    sourceUrl: "https://x.com/XFreeze/status/2098448967294173482",
    sourceLabel: "X 原帖",
    upvotes: 46,
    trending: false,
    tags: ["CI","并行 Agent","红灯修复","GitHub"],
    howItWorks: [
      "从 CI 汇总失败 job，按类型拆成互不抢同一文件的任务队列",
      "各 Agent 拉日志、给补丁并开独立 PR",
      "人工按风险排序合并，冲突文件改回串行处理",
    ],
    tips: [
      "给每个 Bot 划文件/目录所有权，减少并行改同一模块",
      "基础设施类失败（缓存、密钥、配额）先人工排查，勿盲目让 Bot 改业务代码",
    ],
  },
  {
    id: "116",
    slug: "github-pr-security-prescreen-agent",
    title: "GitHub PR 缺陷与安全自动预审",
    summary: "在人工 Code Review 前，对 PR diff 做缺陷与安全面预审，输出可勾选的中文问题清单。",
    description: "团队每日大量 PR 时，先让 Agent 阅读 diff 与相关上下文，按「正确性 / 安全 / 可维护性」给出分级意见（必须改 / 建议改 / 仅供参考）。重点覆盖注入、鉴权绕过、密钥泄漏、危险默认配置等常见面，但不替代人工对业务逻辑的最终判断。适合已有 GitHub 工作流的中小团队提速一审。",
    categories: ["devtools"],
    platforms: ["claude","chatgpt","deepseek"],
    sourceUrl: "https://hermes-agent.nousresearch.com/docs/guides/github-pr-review-agent",
    sourceLabel: "Hermes Agent 文档 · PR review",
    upvotes: 72,
    trending: false,
    tags: ["Code Review","安全预审","GitHub PR","企业工程"],
    howItWorks: [
      "拉取 PR diff、相关文件与 CI 状态作为上下文",
      "按缺陷与安全检查表输出中文分级评论草案",
      "人工确认后发表评论或要求作者修改",
    ],
    tips: [
      "把仓库安全基线（禁止的 API、密钥扫描规则）写进 Agent 指令",
      "对生成代码与依赖升级类 PR 提高「必须改」阈值",
    ],
  },
  {
    id: "117",
    slug: "repo-ui-bugfix-agent-brief",
    title: "仓库 UI 缺陷定位与补丁草案",
    summary: "针对具体 UI 控件失效等问题，让 Agent 在仓库内定位相关代码并给出最小补丁草案。",
    description: "产品反馈「某按钮点了没反应」一类缺陷时，把复现路径、期望行为与仓库地址交给 Agent。Agent 搜索事件绑定、权限判断与接口调用链，给出根因假设与最小 diff 思路，再由开发者本地验证。适合独立开发者用云端/IDE Agent 处理边界清晰的前端缺陷，而不是整页重写。",
    categories: ["devtools"],
    platforms: ["chatgpt","claude","tongyi"],
    sourceUrl: "https://calvin.my/posts/fixing-a-bug-using-ai-with-google-jules",
    sourceLabel: "Calvin 博文 · Jules 修 bug",
    upvotes: 55,
    trending: false,
    tags: ["UI 缺陷","前端","最小补丁","独立开发者"],
    howItWorks: [
      "描述复现步骤、环境与期望/实际差异",
      "Agent 在仓库中定位组件、事件与接口，给出假设与补丁草案",
      "本地应用补丁并回归相关交互后开 PR",
    ],
    tips: [
      "附上浏览器控制台报错与网络面板失败请求，定位更快",
      "要求「只改与该控件相关的文件」，防止顺手大重构",
    ],
  },
  {
    id: "118",
    slug: "browser-form-fill-debug-agent",
    title: "浏览器代填表单与站点调试助手",
    summary: "用可控制浏览器的 Agent 代填后台表单、走通配置路径，并在失败时输出可操作的调试笔记。",
    description: "个人效率与开发调试交叉场景：重复的后台配置、注册向导或多步表单，交给浏览器 Agent 按清单填写；若页面报错或校验失败，Agent 记录 DOM/网络线索并生成中文调试摘要。敏感字段（密码、支付）应人工接管或使用测试环境。适合运营配置、预发验收与独立开发者自测后台。",
    categories: ["efficiency","devtools"],
    platforms: ["chatgpt","claude","kimi"],
    sourceUrl: "https://www.fdaytalk.com/microsoft-scout-browser-control/",
    sourceLabel: "Fdaytalk · Microsoft Scout",
    upvotes: 88,
    trending: false,
    tags: ["浏览器 Agent","表单","调试","个人效率"],
    howItWorks: [
      "准备字段清单与测试账号（非生产密钥）",
      "Agent 按步骤打开页面、填写并截取失败状态",
      "汇总失败原因与建议检查点，交人工确认后重试",
    ],
    tips: [
      "生产环境禁用自动提交支付/删除类危险操作",
      "把稳定选择器或 data-testid 写进指令，减少 UI 微调导致的跑偏",
    ],
  },
  {
    id: "119",
    slug: "local-webapp-test-fix-session",
    title: "本地 Web 应用联调与报错一次修",
    summary: "在同一会话中启动本地预览、点选关键路径、捕获控制台/网络错误并直接提出修复。",
    description: "独立开发者日常：本地 `dev` 起来后，用带浏览器能力的编码 Agent 走主路径与几个边界路径，收集控制台异常与失败请求，对照源码给出修复并热重载验证。目标是「发现—定位—修补」压缩在一次会话，而不是只生成空泛建议。合并前仍建议补最小回归测试或手测清单。",
    categories: ["devtools"],
    platforms: ["claude","chatgpt","deepseek"],
    sourceUrl: "https://www.test-lab.ai/blog/claude-code-chrome-extension-local-testing",
    sourceLabel: "Test Lab · 本地测试",
    upvotes: 41,
    trending: false,
    tags: ["本地联调","热修复","独立开发者","浏览器"],
    howItWorks: [
      "启动本地服务并告知 Agent 入口 URL 与关键用户路径",
      "Agent 操作页面、收集错误栈与失败 API",
      "直接改源码并复测同一路径，汇总仍未覆盖的风险点",
    ],
    tips: [
      "会话开始先固定 Node/包管理器版本，避免环境漂移干扰判断",
      "把「不可改的文件/目录」写进规则，保护生成物与密钥配置",
    ],
  },
  {
    id: "120",
    slug: "dependency-polyfill-audit-agent",
    title: "依赖与 polyfill 冗余审计清单",
    summary: "扫描前端依赖与 polyfill 使用面，输出可删/可替换/需保留的中文审计清单与风险说明。",
    description: "包体与构建变慢时，让 Agent 结合 lockfile、打包分析与目标浏览器基线，找出疑似重复实现、过时 polyfill 与可被原生 API 替代的库。输出按「建议删除 / 替换 / 保留」分组，并标明可能的兼容性风险。不自动批量删依赖；每项由开发者在预览环境验证。适合独立站与中小型前端仓库的定期治理。",
    categories: ["devtools"],
    platforms: ["chatgpt","claude","deepseek"],
    sourceUrl: "https://mcp.e18e.dev/",
    sourceLabel: "e18e MCP",
    upvotes: 76,
    trending: false,
    tags: ["依赖治理","polyfill","包体","前端"],
    howItWorks: [
      "收集 package 清单、browserslist/基线与打包体积报告",
      "Agent 对照现代平台能力标注冗余与替换候选",
      "人工逐项验证后开小步 PR，避免一次性大爆炸升级",
    ],
    tips: [
      "先定浏览器基线再谈删 polyfill，否则易误伤旧 WebView",
      "每次 PR 只动一类依赖，便于回滚与体积对比",
    ],
  },
  {
    id: "121",
    slug: "cursor-background-agent-fix-queue",
    title: "通宵 Cursor 后台代理排队修缺陷",
    summary: "把维护类缺陷排成夜间队列，交给后台编码 Agent 逐个开修复草案，早晨集中审阅。",
    description: "独立开发者白天写功能、夜里用后台 Agent 消化积压的小缺陷与杂务（文案、测试补齐、简单回归失败）。做法是维护一份「可过夜」任务队列：每条含复现、验收与禁改范围；Agent 串行领取并开 PR。早晨人只审 diff 与 CI，不把高风险重构放进通宵队列。",
    categories: ["devtools"],
    platforms: ["claude","chatgpt","deepseek"],
    sourceUrl: "https://zackproser.com/blog/cursor-agents-review",
    sourceLabel: "Zack Proser · Cursor Agents",
    upvotes: 59,
    trending: false,
    tags: ["后台 Agent","任务队列","夜间维护","Cursor"],
    howItWorks: [
      "整理可过夜工单：低风险、有复现、有明确验收",
      "后台 Agent 按队列开分支、修补并提 PR",
      "次日按 CI 与 diff 规模集中合并或打回",
    ],
    tips: [
      "通宵任务禁止改鉴权、支付与数据迁移相关代码",
      "队列条目要带「完成定义」，否则早晨会收到半成品",
    ],
  },
  {
    id: "122",
    slug: "outage-config-rollback-diagnoser",
    title: "故障时配置回滚诊断助手",
    summary: "线上异常时协助对照近期配置/发布变更，给出回滚候选与验证清单，供值班人决策。",
    description: "企业值班场景：告警响起后，把时间窗内的配置变更、发布记录与关键指标摘要交给 Agent，让其对比「变更前/后」差异，提出最可能的回滚对象与验证步骤。Agent 不直接执行生产回滚；输出供 SRE/值班人勾选。可与飞书/企微值班群配合，缩短定位「是不是刚改挂的」的时间。",
    categories: ["devtools","enterprise"],
    platforms: ["chatgpt","claude","tongyi"],
    sourceUrl: "https://cloud.google.com/blog/topics/developers-practitioners/how-google-sres-use-gemini-cli-to-investigate-and-resolve-production-issues",
    sourceLabel: "Google Cloud Blog · SRE + Gemini",
    upvotes: 84,
    trending: false,
    tags: ["SRE","回滚","配置变更","企业自动化"],
    howItWorks: [
      "汇集告警时间窗、变更单与关键仪表盘截图/导出",
      "Agent 列出可疑变更、回滚候选与验证探针",
      "值班人确认后执行回滚并记录复盘要点",
    ],
    tips: [
      "事先维护「可一键回滚」与「需人工」变更分类，避免 Agent 建议不可逆操作",
      "输出里强制要求写明数据面影响（是否丢消息/是否需修数）",
    ],
  },
  {
    id: "123",
    slug: "slack-linear-to-pr-ci-agent",
    title: "Slack/Linear 任务转 PR 并修 CI",
    summary: "从协作工具里的任务描述生成实现草案与 PR，并在 CI 失败时继续迭代直到可审。",
    description: "产品/工程在 Slack、Linear（或国内飞书项目/企微+看板）里派活后，Agent 读取任务描述与验收标准，在对应仓库开实现 PR；若 CI 红灯则根据日志继续小步修复。强调任务源与代码仓打通，减少「群里说了但没人开分支」。合并与发布策略仍由团队门禁控制；也可把状态回写到原任务评论。",
    categories: ["devtools","enterprise"],
    platforms: ["claude","chatgpt","feishu"],
    sourceUrl: "https://nader.substack.com/p/how-cognition-uses-devin-to-build",
    sourceLabel: "Nader Substack · Cognition/Devin",
    upvotes: 49,
    trending: false,
    tags: ["Linear","Slack","飞书项目","CI","企业工程"],
    howItWorks: [
      "从任务工具同步标题、描述、标签与仓库映射",
      "Agent 实现并开 PR，监听 CI 结果做有限次修复",
      "将 PR 链接与阻塞原因回写任务评论，等人审",
    ],
    tips: [
      "任务模板强制含验收标准与「禁止改动」模块",
      "CI 修复次数设上限，防止 Agent 在基础设施故障上空转",
    ],
  },
  {
    id: "124",
    slug: "linear-ticket-multi-repo-pr-router",
    title: "跨仓 Linear 工单路由到 PR",
    summary: "按工单标签与路径规则把任务路由到正确仓库，再分别开出草稿 PR，避免改错仓。",
    description: "多仓单体或前后端分离组织里，一张工单常不知该落哪个 repo。先用规则/轻量分类（服务名、目录、标签）路由，再在目标仓生成草稿 PR 或「需人工确认的改仓建议」。适合中等规模工程组织降低派单错误；路由表应版本化，并由人维护服务边界。",
    categories: ["devtools","enterprise"],
    platforms: ["chatgpt","claude","deepseek"],
    sourceUrl: "https://news.ycombinator.com/item?id=49615716",
    sourceLabel: "Hacker News",
    upvotes: 68,
    trending: false,
    tags: ["多仓","工单路由","Linear","企业工程"],
    howItWorks: [
      "维护服务/目录/标签到仓库的路由表",
      "Agent 读工单后给出目标仓与置信度，低置信度转人工",
      "在目标仓开草稿 PR 或拆成多仓联动清单",
    ],
    tips: [
      "跨仓改动要显式产出「合并顺序」以免契约不一致",
      "路由未命中时宁可不写代码，先问负责人",
    ],
  },
  {
    id: "125",
    slug: "pr-shepherd-to-merge-ready",
    title: "PR 自动牧羊至可合并状态",
    summary: "按工程指南把开着的 PR 推进到可合并：盯 CI、冲突与小范围自动合并条件，其余留给人工。",
    description: "面向日常用代理协助工程的独立开发者：对照 xAI《Grok Bot for Engineering》中「牧羊 PR」做法，让 Agent 跟踪失败 CI、合并冲突与低爆炸半径改动；仅在检查通过且影响面可控时建议自动合并，否则汇总证据等人审。正文不夸大站外合并量，只描述可复用流程。",
    categories: ["devtools"],
    platforms: ["grok","chatgpt","deepseek"],
    sourceUrl: "https://x.ai/bot/guides/grok-bot-for-engineering",
    sourceLabel: "xAI · Grok Bot for Engineering",
    upvotes: 54,
    trending: false,
    tags: ["PR","CI","合并","工程效能"],
    howItWorks: [
      "列出待牧羊 PR 与失败检查",
      "尝试修复可自动验证的 CI/冲突并回写说明",
      "低风险且检查全绿才建议合并，否则交人工",
    ],
    tips: [
      "自动合并范围写进仓库规则，避免代理越权",
      "晨检优先看「已可合并」队列，再处理卡死项",
    ],
  },
  {
    id: "126",
    slug: "multi-agent-large-repo-refactor",
    title: "多代理并行重构大型仓库编排",
    summary: "用多子代理并行推进大型重构：拆任务、汇总差分与风险，数字以源文为准并注明出处。",
    description: "企业或成熟开源仓库做结构性重构时，可将模块拆给多个子代理并行改代码，再由编排层汇总冲突与测试结果。据 Nous Research 公开文章《Refactoring Hermes with 1,393 agents》：Hermes Agent 以 1,393 个子代理、约十九个有效小时重构自身代码库，非测试 Python 减少 34.4%（数字仅转述该文，非本站测评）。落地时务必自备评测与回滚，禁止无审查自动上生产。",
    categories: ["devtools","enterprise"],
    platforms: ["claude","chatgpt","deepseek"],
    sourceUrl: "https://nousresearch.com/refactoring-hermes-with-1393-agents",
    sourceLabel: "Nous Research · Refactoring Hermes with 1,393 agents",
    upvotes: 77,
    trending: false,
    tags: ["重构","多代理","编排","企业工程"],
    howItWorks: [
      "划定重构边界与验收测试",
      "并行派发子任务并隔离工作区",
      "汇总差分/冲突，跑全量测试后再人工合并",
    ],
    tips: [
      "对外引用 1,393 / 34.4% 时附上 Nous 原文链接",
      "先在分支跑通，再考虑默认分支",
    ],
  },
  {
    id: "127",
    slug: "booking-stripe-sandbox-day-build",
    title: "一日搭出预约+支付沙箱原型",
    summary: "用代理在一天内搭出含日历预约与 Stripe 沙箱支付的可演示原型，上线前换正式密钥并人工验收。",
    description: "独立开发者验证商业想法时，可让 Agent 根据简短需求生成预约流程、日历占位与 Stripe 测试模式结账页，尽快得到可点击原型。支付务必使用沙箱密钥；正式环境切换、税务与合规文案须人工处理。不承诺「一天内必能量产」。",
    categories: ["devtools"],
    platforms: ["chatgpt","claude","deepseek"],
    sourceUrl: "https://iliashatzis.substack.com/p/from-zero-to-working-prototype-in",
    sourceLabel: "Ilias Hatzis Substack · 零到原型",
    upvotes: 48,
    trending: false,
    tags: ["原型","Stripe","预约","独立开发"],
    howItWorks: [
      "写清预约对象、时段规则与沙箱支付目标",
      "生成前后端雏形与测试结账链路",
      "人工点验后决定是否继续产品化",
    ],
    tips: [
      "沙箱与正式 Stripe 密钥分环境存放",
      "原型阶段不做真实扣款与短信轰炸",
    ],
  },
  {
    id: "128",
    slug: "shell-driven-build-test-pr-agent",
    title: "壳命令驱动构建测试与开 PR",
    summary: "在终端会话中让 Agent 直接跑 git/构建/测试命令，通过后整理提交说明并开 PR。",
    description: "平台中立的开发者工作流：授权 Agent 在项目目录执行约定白名单命令（安装依赖、测试、构建、git），根据失败输出迭代，直到检查通过再 git push 与开 PR。危险命令（强制推送、删库、生产 kubectl）必须拒绝或二次确认。适合习惯 CLI 的独立开发者与熟悉 shell 的小团队。",
    categories: ["devtools"],
    platforms: ["chatgpt","claude","grok"],
    sourceUrl: "https://allthings.how/how-to-run-git-and-shell-commands-with-microsoft-scout/",
    sourceLabel: "AllThingsHow · Scout shell",
    upvotes: 65,
    trending: false,
    tags: ["Shell","Git","CLI Agent","PR"],
    howItWorks: [
      "声明允许的命令白名单与工作目录",
      "Agent 循环：改代码 → 跑测试/构建 → 读错误 → 再改",
      "通过后生成中文提交说明并开 PR",
    ],
    tips: [
      "默认禁止 git push --force、递归删除与未脱敏的 env 打印",
      "把常用脚本写进 package/Makefile，减少 Agent 临时拼长命令",
    ],
  },
  {
    id: "129",
    slug: "jira-ticket-pr-progress-broadcast",
    title: "Jira 工单处理与 PR 进度播报",
    summary: "跟踪 Jira（或同类）工单关联的 PR/CI 状态，向值班群定时播报阻塞与可合并项。",
    description: "企业协作里「工单状态」和「代码进度」常脱节。Agent 定期拉取工单与关联 PR、审阅人、CI 结论，生成中文播报：哪些可合并、哪些卡审、哪些红灯。可投递飞书/企微群，映射国内常见项目工具。不自动改工单状态除非团队明确授权；默认只读+提醒。",
    categories: ["enterprise","devtools"],
    platforms: ["feishu","wecom","chatgpt"],
    sourceUrl: "https://x.com/iamlukethedev/status/2071445022445027574",
    sourceLabel: "X 原帖",
    upvotes: 72,
    trending: false,
    tags: ["Jira","进度播报","飞书","企微","企业协作"],
    howItWorks: [
      "配置工单项目、PR 关联字段与播报频道",
      "定时汇总状态并生成「可合并 / 阻塞 / 风险」三段",
      "发到群里并 @ 责任人，人工更新工单流转",
    ],
    tips: [
      "播报只突出变化项，避免刷屏导致被静音",
      "敏感仓库名与客户标识做脱敏或别名",
    ],
  },
  {
    id: "130",
    slug: "quota-leftover-reviewable-pr-batch",
    title: "额度将尽时批量产出可审 PR",
    summary: "在订阅额度快用完前，把积压的小改进整理成若干可独立审阅的小 PR，避免浪费额度。",
    description: "独立开发者常见：月度 AI 额度将清空，与其闲置不如消化「低风险小改进」清单（文档、类型补全、简单重构、测试补齐）。Agent 按「单 PR 单主题、可快速审」原则切分任务并开草稿；人只做合并裁决。不做无验收的大爆炸改动，也不编造不存在的性能数字。",
    categories: ["devtools"],
    platforms: ["chatgpt","claude","deepseek"],
    sourceUrl: "https://news.ycombinator.com/item?id=50073611",
    sourceLabel: "Hacker News",
    upvotes: 79,
    trending: false,
    tags: ["额度","小 PR","技术债","独立开发者"],
    howItWorks: [
      "列出额度耗尽前可完成的小主题任务池",
      "Agent 按主题开独立分支与可审 PR",
      "人工快速浏览后合并或关闭，记录未完成项到下月",
    ],
    tips: [
      "优先选有测试保护的目录，降低「赶工引入回归」概率",
      "每个 PR 标题写清动机，方便额度周期后回看",
    ],
  },
  {
    id: "131",
    slug: "pdf-form-fill-tool-calling-agent",
    title: "用工具调用填写 PDF 表单",
    summary:
      "把证件信息、表格字段或表格数据交给带工具调用的 Agent，在浏览器或本地自动填入 PDF 表单并导出可核对稿。",
    description:
      "个人办事与小微企业常被「重复填同一套 PDF」卡住：报税附表、入职资料、保险申请、报名表。带工具调用的 Agent 读取结构化数据源（表格行、用户口述字段），定位 PDF 可填字段并写入，再导出供人工核对后提交。适合国内办事场景本地化：敏感字段默认脱敏预览，正式提交前必须人眼过一遍。不对标站正文做翻译，灵感来自公开讨论中的工具调用填表实践。",
    categories: ["life", "efficiency"],
    platforms: ["chatgpt", "claude", "deepseek"],
    sourceUrl: "https://news.ycombinator.com/item?id=47995318",
    sourceLabel: "Hacker News",
    upvotes: 88,
    trending: false,
    tags: ["PDF", "表单", "工具调用", "个人效率", "生活办事"],
    howItWorks: [
      "准备结构化字段表（姓名、证件号、地址等）并标明必填项",
      "Agent 用工具打开目标 PDF，按字段名映射写入并高亮未匹配项",
      "导出草稿 PDF，人工核对后正式提交或盖章",
    ],
    tips: [
      "身份证号、银行卡号等先用掩码预览，确认映射正确再写全量",
      "遇到扫描版「假表单」先 OCR 成可填字段，或改走打印手填",
    ],
    approach: `公开讨论里，作者展示的是「客户端工具调用」填 PDF：模型提出要改哪个字段，真正的写入发生在浏览器本地的 PDF 编辑器里，改动能当场看见、点一下就能改回。数据源可以是口述、表格行，或经 MCP/检索接到的 CRM、人事系统字段；填完后留出人工核对，再导出提交。

落到国内办事场景时，同一套路可接飞书多维表、企微文档表格或本地表格当字段源；敏感证件号、银行卡先掩码预览，映射确认后再写全量。扫描件若只是图片「假表单」，需先做成可填字段或改手填，不要假装已经写进官方 PDF。`,
    outcomes: [
      "源未披露填对率、耗时下降等量化；公开讨论与演示只描述流程已接通「取字段→工具写入 PDF→人眼改正」。",
      "重复填报从逐格复制粘贴，变成先批量预填、再只改错项与缺项。",
      "字段写入过程可见、可点选改正，减少「黑盒替你交表」的不安。",
    ],
    caveats: [
      "公开源未给出实测字段准确率或办结率，上线后需用自有表格复盘，勿把「流程跑通」当成效果承诺。",
      "正式提交前必须人眼核对；证件号、税号、签名栏等高风险字段默认脱敏预览。",
      "若 PDF 实际是扫描图或锁定不可填，工具调用写不进去，需改 OCR 或打印手填路径。",
    ],
    prompts: [
      {
        title: "字段映射与填表指令",
        body: `你是 PDF 表单填写助手，只能根据给定字段表写入，禁止编造未提供的证件号、地址或日期。

任务：
1. 对照「目标字段名」与「数据源」，列出映射表：字段名 → 取值；找不到的标「缺」。
2. 对身份证号、银行卡号先输出掩码版（仅保留后四位），等我确认「写全量」后再给明文。
3. 输出将要调用的填表动作清单（字段名、值、是否必填）；不要声称已经提交给任何机关。

目标 PDF 字段：
{{pdf_fields}}

数据源：
{{source_row}}`,
      },
      {
        title: "提交前核对清单",
        body: `根据已填草稿字段，生成一份提交前人工核对清单。逐项标出：姓名/证件号/地址/日期是否齐全、格式是否像官方要求、有无把测试数据留在正式稿。不要编造核对结果；缺信息就写「待补」。

已填字段：
{{filled_fields}}`,
      },
    ],
    primarySource: {
      url: "https://news.ycombinator.com/item?id=47995318",
      label: "Hacker News · Show HN 讨论串回复（Filling PDF forms with AI / client-side tool calling）",
      date: "2026-05-03",
      dateLabel: "讨论",
    },
  },
  {
    id: "132",
    slug: "invoice-extract-to-ledger-sheet",
    title: "发票信息抽取并归档记账表",
    summary:
      "上传或转发发票/收据图片与 PDF，Agent 抽取金额、税号、品类后写入记账表，并在企微或飞书提醒待核销项。",
    description:
      "财务与行政重复劳动：每张开票要手工录入表格。自托管或工作流式 Agent 解析发票字段，写入飞书多维表格 / 企微文档表格 / 本地表格，并按规则打标签（差旅、办公、客户招待）。默认只写「待确认」行，人工核对后再过账；不自动发起付款。可与报销机器人衔接：群里丢图即建行。一手源为公开开源自动化仓库，正文为中文原创本地化。",
    categories: ["enterprise", "efficiency"],
    platforms: ["feishu", "wecom", "chatgpt", "n8n"],
    sourceUrl: "https://github.com/Fabiano225/ai-invoice-automation",
    sourceLabel: "GitHub · ai-invoice-automation",
    upvotes: 91,
    trending: false,
    tags: ["发票", "记账", "飞书", "企微", "企业自动化"],
    howItWorks: [
      "收集发票图片/PDF 到指定文件夹或群机器人收件箱",
      "Agent 抽取开票方、金额、税额、日期、品类并校验合计",
      "写入记账表「待确认」列，通知财务在飞书/企微核对后过账",
    ],
    tips: [
      "先做税额合计校验，对不上的行强制人工，勿静默入账",
      "客户名与税号可建别名表，减少 OCR 错字导致的重复供应商",
    ],
    approach: `公开仓库描述的是一条自托管抽取流：网页或入口上传发票图片/PDF，经 n8n 分流（图走视觉模型、PDF 先抽文本再分析），抽出日期、商户、价税、税率与品类等结构化字段，先回给前端让人改，确认后再归入网盘目录并追加到年度记账表。

国内落地时，网盘与表格可换成飞书云空间 + 多维表，或企微文档/微盘；群里丢图即可建「待确认」行，财务核对合计后再过账。默认不自动付款、不自动报销审批，只解决「录入与归档」这一段。`,
    outcomes: [
      "源未披露抽取准确率或人效数字；公开仓库只描述流程已接通「上传→抽取→人工复核→归档表」。",
      "发票从手工抄表，变成先机器预填、人只改错项后再入账。",
      "原件按用户/月份归档，记账表按年追加，待核销项可在飞书/企微提醒。",
    ],
    caveats: [
      "公开源未给出实测 OCR/抽取准确率或节时数据，上线后需用自有票样复盘，勿把「流程跑通」当成效果承诺。",
      "税额合计对不上必须强制人工；勿静默写入已过账列，更不要自动发起付款。",
      "发票含税号与消费明细，存储与机器人权限需按公司财务合规配置。",
    ],
    prompts: [
      {
        title: "发票字段抽取",
        body: `你是发票信息抽取助手。只根据图像/文本中可见内容输出 JSON，禁止编造税号、金额或日期。

输出字段：
- date（开票/消费日期，未知则 null）
- merchant（开票方或商户名）
- gross_amount（价税合计数字，未知则 null）
- tax_amount（税额，看不清则 null）
- category（差旅/办公/招待/其他，依品名推断并标注置信：高/中/低）
- notes（合计校验问题或模糊处）

规则：若价税与分项加总对不上，必须在 notes 写明「合计不符，待人工」；不要自行改数凑平。

发票文本或 OCR：
{{invoice_text}}`,
      },
      {
        title: "待确认入账播报",
        body: `把下列「待确认」发票行整理成一条给财务的飞书/企微播报：列出商户、金额、日期、品类；合计不符的行置顶并标红字提醒。不要建议付款或审批通过。

待确认行：
{{pending_rows}}`,
      },
    ],
    primarySource: {
      url: "https://github.com/Fabiano225/ai-invoice-automation",
      label: "GitHub · Fabiano225/ai-invoice-automation",
      date: "2026-09-22",
      dateLabel: "仓库创建",
    },
  },
  {
    id: "133",
    slug: "support-ticket-triage-reply-draft",
    title: "客服工单分拣与回复草稿",
    summary:
      "把客服邮箱或工单系统里的新单分拣优先级与类型，并起草可编辑的中文回复草稿，人工点发送。",
    description:
      "中小团队客服高峰时，分拣与套话回复占大量时间。Agent 读取工单正文与历史订单/知识库片段，输出：优先级、标签、建议接手角色，以及一版可改的中文回复。对接飞书/企微群可做「今日待回」播报。默认不自动外发；涉及退款、法务承诺必须人工。与「个人收件箱整理」不同，本条聚焦对外客服工单与知识库接地。",
    categories: ["efficiency", "enterprise"],
    platforms: ["feishu", "wecom", "claude", "chatgpt"],
    sourceUrl: "https://github.com/nbashaw/claude-cs",
    sourceLabel: "GitHub · claude-cs",
    upvotes: 86,
    trending: false,
    tags: ["客服", "工单", "回复草稿", "企微", "飞书"],
    howItWorks: [
      "同步新工单与相关客户上下文（订单、上次对话摘要）",
      "Agent 输出标签、优先级与中文回复草稿",
      "客服在飞书/企微或工单台编辑后发送，并回写结案原因",
    ],
    tips: [
      "把「禁止承诺清单」（免费延期、私下折扣等）写进系统提示",
      "高情绪投诉单独队列，草稿仅作参考，必须真人接管",
    ],
    approach: `公开仓库是一份「客服自动化搭建技能」：引导团队摸清自己的工单台、账单与数据库接口，再生成分拣脚本、常见场景回复模板，以及「先提最紧急单」的工作流。运行时会拉未结工单、按紧急程度打标，并在你确认后才去取上下文、起草回复或调用退款等脚本。

国内团队可把同一分层接到飞书/企微客服群与自有工单系统：Agent 只产出优先级、标签与中文草稿，「今日待回」播报到群；发送、退款、补偿一律人工点确认。禁止承诺清单（私下折扣、口头延期等）写进系统提示，高情绪投诉进真人队列。`,
    outcomes: [
      "源未披露响应时长或一次解决率等量化；公开仓库只描述可搭建「分拣→取上下文→草稿/脚本」流程。",
      "新单从人肉翻列表，变成先按紧急度排序并给出可编辑中文草稿。",
      "飞书/企微可播报待回清单，结案原因回写后便于复盘话术。",
    ],
    caveats: [
      "公开源未给出实测人效或满意度数据，上线后需用自有工单复盘，勿把「流程跑通」当成效果承诺。",
      "默认禁止自动外发；退款、取消订阅、法务承诺必须人工执行并留痕。",
      "对接工单台与客户库需要最小权限令牌；高情绪投诉草稿仅供参考，须真人接管。",
    ],
    prompts: [
      {
        title: "工单分拣与草稿",
        body: `你是客服分拣助手。根据工单与客户上下文，输出：
1) priority：紧急/高/中/低（简述理由）
2) tags：类型标签（退款/故障/咨询/投诉等）
3) owner_role：建议接手角色
4) draft_reply：可编辑中文回复草稿

硬性规则：
- 禁止承诺免费延期、私下折扣、未授权赔偿。
- 涉及退款或账号变更，草稿里只写「将提交人工审核」，不要假装已办理。
- 上下文不足时在草稿首行写「待核实：…」，不要编造订单状态。

禁止承诺清单：
{{forbid_list}}

工单：
{{ticket}}

客户上下文：
{{customer_context}}`,
      },
      {
        title: "今日待回播报",
        body: `把未回工单整理成一条飞书/企微群播报：按优先级排序，每行含单号、客户、标签、一句话摘要。高情绪投诉单独置顶并写「需真人接管」。不要直接生成可外发的最终回复。

未回列表：
{{open_tickets}}`,
      },
    ],
    primarySource: {
      url: "https://github.com/nbashaw/claude-cs",
      label: "GitHub · nbashaw/claude-cs",
      date: "2026-01-11",
      dateLabel: "仓库创建",
    },
  },
  {
    id: "134",
    slug: "url-to-structured-notes-agent",
    title: "任意链接转结构化笔记",
    summary:
      "丢进一篇文章或文档链接，Agent 抓取可读正文后生成标题、摘要、要点与行动项，写入飞书文档或 Notion。",
    description:
      "知识工作者收藏夹堆满却很少复盘。工作流式 Agent 拉取 URL 正文（去广告与导航），用模型抽出结构化字段：一句话摘要、三点论据、可执行下一步、相关人物/产品，再写入飞书云文档、多维表格或 Notion。适合个人效率与内容选题沉淀；付费墙与登录墙内容需用户自行粘贴正文，勿伪造抓取成功。灵感来自公开 n8n 社区工作流讨论，正文中文原创。",
    categories: ["efficiency", "content"],
    platforms: ["feishu", "n8n", "chatgpt", "claude"],
    sourceUrl:
      "https://community.n8n.io/t/turns-any-article-into-a-structured-notion-note/297566",
    sourceLabel: "n8n Community",
    upvotes: 84,
    trending: false,
    tags: ["链接", "笔记", "飞书文档", "Notion", "个人效率"],
    howItWorks: [
      "在机器人或表单提交 URL（或粘贴正文）",
      "清洗可读正文并生成固定模板字段",
      "写入飞书文档/多维表或 Notion，并可选推送到选题频道",
    ],
    tips: [
      "模板固定「摘要/要点/行动项」三块，方便周回顾检索",
      "对竞品与内部纪要加权限标签，避免公开空间误写",
    ],
    approach: `社区公开工作流的做法很直接：Webhook 收 URL，拉页面后用代码节点去掉脚本/样式/标签，截一段可读正文再交给模型，产出标题、摘要、要点与标签等固定 JSON，最后写入笔记库属性。关键不在「再装一个收藏 App」，而在先把页面噪音剥干净，再结构化。

国内可把写入目标换成飞书云文档或多维表，选题频道用飞书群机器人播一条；遇到付费墙、登录墙或纯前端渲染页，改为用户粘贴正文再跑同一模板，不要假装抓取成功。竞品与内部材料加权限标签，避免写进公开空间。`,
    outcomes: [
      "源未披露阅读复盘率或节省时长等量化；公开帖只描述流程已接通「URL→清洗正文→结构化→写入笔记库」。",
      "收藏从「链睡着」变成固定字段笔记，便于周回顾检索摘要与行动项。",
      "同一模板可推送到飞书选题频道，减少重复打开原文。",
    ],
    caveats: [
      "公开源未给出抓取成功率或笔记质量指标，上线后需用自有链接集复盘，勿把「流程跑通」当成效果承诺。",
      "部分站点会拦自动请求；JS 重渲染页面可能只有壳 HTML，需换可读正文来源或手工粘贴。",
      "付费/登录墙内容勿伪造抓取成功；内部纪要与竞品材料注意空间权限。",
    ],
    prompts: [
      {
        title: "链接转研究笔记",
        body: `将下文整理为研究笔记。只依据给定正文，禁止编造未出现的数据、结论或引语。

输出 JSON：
{
  "title": "",
  "summary": "一句话摘要",
  "key_insights": ["要点1", "要点2", "要点3"],
  "action_items": ["可执行下一步，没有则空数组"],
  "tags": [""],
  "source_url": "{{url}}"
}

正文：
{{article_text}}`,
      },
      {
        title: "选题频道播报",
        body: `根据结构化笔记写一条不超过 120 字的飞书群播报：标题 + 一句话摘要 + 一个行动项（若有）。不要外泄正文里的内部人名或未公开数据；若笔记标记为内部，只输出「已写入内部空间，略」。

笔记 JSON：
{{note_json}}`,
      },
    ],
    primarySource: {
      url: "https://community.n8n.io/t/turns-any-article-into-a-structured-notion-note/297566",
      label: "n8n Community · Turns any article into a structured Notion note",
      date: "2026-05-30",
      dateLabel: "发布",
    },
  },
  {
    id: "135",
    slug: "travel-email-to-calendar-agent",
    title: "邮件行程识别写入日历",
    summary:
      "从机票、酒店、会议邀请邮件中抽出时间与地点，生成飞书/系统日历事件草稿，确认后再写入。",
    description:
      "出差与跨城会议邮件散落各处，漏加日历是常态。Agent 监控出行相关邮件（航司、酒店、会议平台），抽取出发/到达、时区、确认号与地址，生成日历草稿；用户在飞书日历或系统日历确认后落盘，并可附带「出发前提醒」。默认不自动改已有日程冲突，冲突时只告警。一手讨论见公开 HN 线程；飞书日历写入可对照开放平台日历接口做企业落地。",
    categories: ["efficiency", "life"],
    platforms: ["feishu", "chatgpt", "claude", "n8n"],
    sourceUrl: "https://news.ycombinator.com/item?id=49949563",
    sourceLabel: "Hacker News",
    upvotes: 87,
    trending: false,
    tags: ["行程", "日历", "邮件", "飞书", "生活办事"],
    howItWorks: [
      "筛选含行程关键词的邮件并抽取结构化字段",
      "生成日历草稿（含时区与地点），标出与现有日程的冲突",
      "用户确认后写入飞书/系统日历并设提醒",
    ],
    tips: [
      "时区按到达地而非收件箱本地时区解析，避免早晚差一小时",
      "确认号可放描述字段，勿放公开可订阅日历标题",
    ],
    approach: `公开讨论里，作者用固定项目文件夹承载「行程邮件→日历」脚本与文档：先进入该目录启动对话式 Agent，再告知收件箱里有新邮件，由 Agent 按既有脚本处理预订信息并落到日历。关键不在「再记一套记忆」，而在把可复用流程与说明放在同一目录，需要时随时恢复。

国内落地时，邮件源可接企业邮或个人邮筛选规则（航司/酒店/会议邀请关键词），日历草稿写入飞书日历或系统日历；确认号、登机口等放描述字段，标题只写可读行程摘要。冲突只告警、不静默改已有日程；时区按到达地解析，出发前提醒由用户确认后落盘。`,
    outcomes: [
      "源未披露漏加率、抽取准确率或节时等量化；公开讨论只描述个人流程已接通「进项目目录→启动 Agent→处理新邮件行程→写入日历」。",
      "行程从散落在多封确认信里，变成先生成可核对的日历草稿再落盘。",
      "同一文件夹可保留脚本与说明，下次出差可直接复用，减少每次从零口述字段。",
    ],
    caveats: [
      "公开源未给出实测字段准确率或冲突检出率，上线后需用自有确认信复盘，勿把「流程跑通」当成效果承诺。",
      "默认须人工确认后再写入；勿自动覆盖已有日程，冲突只告警。",
      "确认号、证件相关字段勿放进可公开订阅的日历标题；换邮箱或日历租户后要重核权限与时区规则。",
    ],
    prompts: [
      {
        title: "行程邮件结构化抽取",
        body: `你是行程邮件解析助手。只根据给定邮件正文抽取字段，禁止编造未出现的航班号、酒店名、时间或确认号。

输出 JSON：
- type：机票/酒店/会议/其他
- title：简短可读标题（不含确认号）
- start / end：ISO 8601，未知则 null
- timezone：到达地或活动地时区；无法判断则 null 并在 notes 说明
- location：地点或航线摘要
- confirmation：确认号（可空）
- notes：冲突风险、歧义或缺字段

规则：本地收件箱时区不得默认当成行程时区；时间写不清就标待人工，不要四舍五入猜。

邮件正文：
{{email_body}}`,
      },
      {
        title: "日历草稿确认摘要",
        body: `把下列结构化行程整理成一段给人确认的飞书/系统日历草稿摘要：标题、起止时间（含时区）、地点、提醒建议、与现有日程的潜在冲突（若提供）。确认号只放描述区。不要声称已经写入日历。

行程 JSON：
{{trip_json}}

现有日程冲突候选（可空）：
{{conflicts}}`,
      },
    ],
    primarySource: {
      url: "https://news.ycombinator.com/item?id=49949563",
      label: "Hacker News · 讨论串回复（文件夹工作流：行程邮件写入日历）",
      date: "2026-10-04",
      dateLabel: "讨论",
    },
  },
  {
    id: "136",
    slug: "handwritten-appt-to-calendar-pdf",
    title: "手写日程入历并归档 PDF",
    summary:
      "拍下手写日程本或便利贴，Agent 识别日期时间并写入日历，同时把原图归档为可检索 PDF。",
    description:
      "不少人仍用手写本管预约：医院、家校、线下拜访。拍照后由 Agent OCR 日期与事项，生成日历候选；确认后写入飞书或手机日历，原图打包进按月 PDF 归档，方便报销或复盘。识别不确定时标黄人工改，不臆造不存在的星期。适合生活办事与个人效率双场景。",
    categories: ["life", "efficiency"],
    platforms: ["feishu", "chatgpt", "claude", "doubao"],
    sourceUrl: "https://news.ycombinator.com/item?id=49627493",
    sourceLabel: "Hacker News",
    upvotes: 78,
    trending: false,
    tags: ["手写", "OCR", "日历", "归档", "生活办事"],
    howItWorks: [
      "拍照上传手写日程页",
      "OCR 出候选事件列表，不确定项标黄",
      "确认后写入日历，并将原图合并进当月归档 PDF",
    ],
    tips: [
      "拍摄时保证日期数字清晰，避免反光导致「3/8」互认错",
      "归档 PDF 按月命名，便于年底报销批量检索",
    ],
    approach: `公开讨论把这类能力当作可自建的轻量 Agent 示例：对着日程本拍照做 OCR，抽出预约后写入日历；同一思路也可从邮件里找出带 PDF 的附件再归档到本地文件库。重点是「自己拥有数据与集成」，用够用的小模型跑简单工具链，而不是另开一个黑盒订阅应用。

国内落地可拍医院/家校/拜访手写页，生成飞书或手机日历候选事件；不确定的日期与星期标黄等人改，确认后再写入。原图按月合并进可检索 PDF（或飞书云空间目录），方便年底报销与复盘，不臆造看不清的数字。`,
    outcomes: [
      "源未披露 OCR 准确率、入历成功率或节时等量化；公开讨论只把「手写预约 OCR→日历」与「邮件 PDF→本地归档」列为可自建示例流程。",
      "手写预约从事后补记，变成拍照后生成可核对候选再入历。",
      "原图进按月 PDF/云空间，检索与报销时不必翻纸本。",
    ],
    caveats: [
      "公开源未给出实测识别率或归档完整性数据，上线后需用自有手写样张复盘，勿把「流程跑通」当成效果承诺。",
      "日期数字不清必须标黄人工；禁止按习惯补全不存在的星期或时间。",
      "归档 PDF 含就医/家校等隐私，存储与分享权限要按个人或公司规范配置。",
    ],
    prompts: [
      {
        title: "手写日程 OCR 结构化",
        body: `你是手写日程识别助手。只根据图像/OCR 文本中可见内容输出事件列表，禁止编造看不清的日期、星期或地点。

对每条事件输出：
- raw_text：原文摘录
- date / time：能确定则写，否则 null
- title：事项短标题
- confidence：高/中/低
- needs_review：true/false（低置信或数字歧义必须 true）
- notes：如「3 与 8 易混」等

规则：不确定就标黄待改，不要按上下文「猜一个合理日期」。

OCR 文本：
{{ocr_text}}`,
      },
      {
        title: "入历前确认清单",
        body: `把候选事件整理成给人确认的清单：按日期排序；needs_review=true 的置顶并写明歧义点。确认后的动作是「写入飞书/手机日历 + 原图并入当月归档 PDF」。不要声称已经写入。

候选事件：
{{candidates}}`,
      },
    ],
    primarySource: {
      url: "https://news.ycombinator.com/item?id=49627493",
      label: "Hacker News · 讨论串回复（自建 Agent：手写预约 OCR 入历等示例）",
      date: "2026-09-09",
      dateLabel: "讨论",
    },
  },
  {
    id: "137",
    slug: "daily-appt-voice-sms-reminder",
    title: "预约语音与短信日提醒",
    summary:
      "按预约表每天自动触发语音或短信/企微提醒，降低到店爽约，适合诊所、教培与到店服务。",
    description:
      "到店服务行业痛点是爽约。基于 n8n 等自动化，Agent/工作流读取次日预约名单，在约定窗口发送短信、语音电话或企微/飞书应用消息提醒，并记录回执。内容模板需合规：明确身份、时间地点、取消方式；勿骚扰式多次拨打。国内落地可换运营商短信与企微客户联系能力，保留人工停用名单。一手源为 DEV 上公开的 n8n 提醒搭建文。",
    categories: ["life", "efficiency"],
    platforms: ["wecom", "feishu", "n8n", "chatgpt"],
    sourceUrl:
      "https://dev.to/sabbschow/automated-appointment-reminder-with-voice-call-and-sms-using-n8n-10bi",
    sourceLabel: "DEV.to · n8n 提醒",
    upvotes: 80,
    trending: false,
    tags: ["预约", "提醒", "短信", "企微", "生活办事"],
    howItWorks: [
      "维护预约表（顾客、时间、渠道偏好、退订标记）",
      "每日定时生成提醒文案并经语音/短信/企微通道发出",
      "记录送达与回复，异常单转人工回访",
    ],
    tips: [
      "提供一键退订/勿再呼叫，避免营销式骚扰投诉",
      "高峰前 24h + 2h 两档即可，过多提醒反而降信任",
    ],
    approach: `作者用 n8n 搭了一条端到端预约提醒流：每天早晨定时跑，从日历拉出当日预约，先用语音机器人拨打提醒电话，短暂间隔后再发一条个性化短信跟进。国内落地时，日历可换成飞书/企微日程或自建预约表，语音通道可换成合规外呼能力，短信可换成运营商短信或企微/飞书应用消息；发出前仍建议对人核对模板与停用名单。

提醒文案只写清楚身份、时间、地点和取消/改约方式，不做营销话术。未在停用名单、且渠道偏好允许的联系人，才进入当日发送队列。`,
    outcomes: [
      "源未披露量化爽约率或接通率；公开文只描述流程已接通「日触发→日历取约→语音→短信跟进」。",
      "提醒从人工逐条拨打，变成同一工作流按日批量触达，话术口径可统一。",
      "语音与短信分两步发出，顾客至少有一个通道能收到当日预约信息。",
    ],
    caveats: [
      "公开源未给出实测接通率、爽约下降幅度或成本数据，上线后需用自有预约表复盘，勿把「流程跑通」当成效果承诺。",
      "外呼与短信需合规授权与退订入口；高峰前两档提醒通常够用，多次连拨容易被投诉。",
      "换租户、换号码或换日历源后，权限与停用名单要重新核对。",
    ],
    prompts: [
      {
        title: "当日提醒文案",
        body: `你是到店预约提醒助手。根据下面的预约记录，生成一条简短提醒（可用于短信或企微/飞书应用消息）。

要求：
1. 只根据给定字段写作，不要编造未提供的门店优惠或医生姓名。
2. 必须包含：称呼（若有）、到店日期时间、地点、如何取消或改约。
3. 语气礼貌、不超过 120 字；不要营销口号，不要连续感叹号。
4. 若记录标记为已退订或勿联系，输出「跳过」三字即可。

预约记录：
{{appointment}}`,
      },
      {
        title: "语音开场白",
        body: `根据预约记录写一段 20 秒内的语音外呼开场白。先报机构名称与来意，再说时间地点，最后告知可按键改约或回复短信取消。不要承诺排队优先或价格。若缺少时间或地点，开场白改为请对方回拨人工号，不要猜测。

预约记录：
{{appointment}}`,
      },
    ],
    primarySource: {
      url: "https://dev.to/sabbschow/automated-appointment-reminder-with-voice-call-and-sms-using-n8n-10bi",
      label: "DEV.to · Automated Appointment Reminder with Voice call and SMS using n8n",
      date: "2025-11-10",
      dateLabel: "发布",
    },
  },
  {
    id: "138",
    slug: "bg-agent-email-approval-inbox",
    title: "后台 Agent 邮件式审批收件箱",
    summary:
      "让后台 Agent 跑长任务，完成件像未读邮件一样进审批收件箱，负责人批「合并/重做/丢弃」后再落库。",
    description:
      "企业自动化怕的是 Agent 静默改生产。模式是：后台任务跑完进入「未读」队列（邮件风格收件箱或飞书/企微审批卡片），展示摘要、风险与产物链接；人批准后才合并代码、发公告或改表。适合内容发布、数据回填、批量运营动作。默认拒绝无审批自动外发。灵感来自公开 HN 讨论的桌面后台 Agent + 审批收件箱形态，中文站按企业闸门叙事改写。",
    categories: ["enterprise", "efficiency"],
    platforms: ["feishu", "wecom", "chatgpt", "claude"],
    sourceUrl: "https://news.ycombinator.com/item?id=49713894",
    sourceLabel: "Hacker News",
    upvotes: 90,
    trending: false,
    tags: ["审批", "后台Agent", "收件箱", "飞书", "企微"],
    howItWorks: [
      "后台 Agent 完成任务后投递「未读」审批项（摘要+产物）",
      "负责人在邮件式收件箱或飞书/企微卡片上选择通过/打回",
      "通过后执行落库或发布；打回则带批注重跑",
    ],
    tips: [
      "高风险动作（对外发送、删数据、改权限）强制两人批",
      "审批卡片只放摘要与链接，勿把密钥贴进群消息",
    ],
    approach: `Show HN 公开的自托管桌面应用，把后台 Agent 跑完的结果收进邮件式界面：完成件进「未读」，等你拍板的进「待办/Action」。会话可中断后在另一设备续批；工具调用与技能按条展示，审批暂停会跨会话保留。自带或可接 MCP/技能目录，模型自备。

企业落地时，同一闸门可映射为飞书/企微审批卡片或内部「未读」队列：摘要、风险等级与产物链接给人看，通过后才合并、发公告或改表；打回则带批注重跑。对外发送、删数据、改权限默认拒绝无审批自动执行，卡片里不贴密钥。`,
    outcomes: [
      "作者称内部版在亚马逊组织内曾有逾 2000 人用于会前准备、邮件起草、Slack 摘要、CRM 记录等；开源版已剥离内部技能目录，公开帖未再给出开源后的用量、审批吞吐或差错率量化。",
      "后台长任务从「多个终端/多个评论串里找谁卡住了」，收成一个收件箱式未读与待批列表。",
      "审批可跨会话、跨设备续办，通过后才落库或发布，降低静默改生产的风险。",
    ],
    caveats: [
      "公开源给出的「逾 2000 人」指内部版场景；开源发行版更瘦，勿把内部用量直接当开源效果承诺。",
      "高风险动作须强制人批（可双人）；审批卡片只放摘要与链接，禁止贴密钥或令牌。",
      "自托管需自行负责模型密钥、技能权限与审计；无厂商 SLA 时要自备回滚与值班。",
    ],
    prompts: [
      {
        title: "审批收件箱摘要",
        body: `你是后台任务审批摘要助手。根据任务产物与风险标记，生成一条「未读/待批」卡片文案。

必须包含：
1) 一句话做了什么
2) 影响范围（系统/表/对外渠道）
3) 风险等级：低/中/高及理由
4) 建议动作：通过合并 / 打回重做 / 丢弃
5) 产物链接占位（不要编造 URL）

硬性规则：不要在文案里输出密钥、Cookie 或完整令牌；缺信息就写「待补」。不要声称已经合并或已外发。

任务记录：
{{job_record}}`,
      },
      {
        title: "打回重做批注",
        body: `根据审批人意见，写一段可附在重跑任务上的批注：列出错处、必须保留的约束、下次产物要多附什么核对材料。语气简洁，不要改写为已批准。

原任务摘要：
{{job_summary}}

审批意见：
{{reviewer_notes}}`,
      },
    ],
    primarySource: {
      url: "https://news.ycombinator.com/item?id=49713894",
      label: "Hacker News · Show HN: Pizza Bot – An inbox for AI agents that work in the background",
      date: "2026-09-15",
      dateLabel: "发布",
    },
  },
  {
    id: "139",
    slug: "wecom-feishu-thread-support-bug-check",
    title: "企微/飞书线程触发支持查询与缺陷排查",
    summary: "在企微或飞书支持线程里 @Agent，自动查订单/日志/缺陷状态并回帖摘要，减少客服来回切系统。",
    description: "一线支持常在群线程里问「这单到哪了」「是不是已知缺陷」。Agent 读取线程上下文与工单号，只读查询订单、错误日志摘要或缺陷库状态，把结论回帖到同一线程，并给出建议下一步（升级研发/补资料/关闭）。默认只读、不改生产数据；敏感字段脱敏。与「客服工单分拣草稿」不同：本条强调即时线程内查询，而非批量分拣与外发回复。灵感来自公开 HN 上 Slack 线程触发支持查询的讨论，正文中文原创并本地化到企微/飞书。",
    categories: ["enterprise", "efficiency"],
    platforms: ["wecom", "feishu", "chatgpt", "claude"],
    sourceUrl: "https://news.ycombinator.com/item?id=50166597",
    sourceLabel: "Hacker News",
    upvotes: 89,
    trending: false,
    tags: ["企微", "飞书", "支持线程", "缺陷排查", "企业协作"],
    howItWorks: [
      "在指定支持群启用机器人，识别线程中的单号/错误码关键词",
      "只读查询订单、日志摘要或缺陷库，生成脱敏结论",
      "回帖到原线程并标注可信度与建议接手角色",
    ],
    tips: [
      "查询权限用只读账号，禁止 Agent 直接改单或关缺陷",
      "对「是否退款」类问题只给政策摘要，最终答复必须真人",
    ],
    approach: `公开讨论描述的是支持线程里 @机器人 跑查询：读取线程任务，在隔离环境中对接数据库、支付、缺陷库、分析与 MCP 等只读能力，把结果与文件回帖到同一线程。破坏性工具默认关闭，外呼动作留回执与审计；沙箱内不常驻密钥，需要时按名申请并记日志。

国内可把触发面换到企微/飞书支持群线程：识别单号与错误码，只读查订单状态、日志摘要或缺陷库，回帖脱敏结论并建议下一步（升级研发/补资料/关闭）。默认不改单、不关缺陷；退款与补偿只给政策摘要，最终答复必须真人。`,
    outcomes: [
      "作者称其公司 Spur 有 13 人每日使用该机器人；公开帖未披露查询准确率、平均响应时长或缺陷命中率等量化。",
      "支持从「等研发随手跑 SQL」，变成线程内直接拿回只读查询摘要。",
      "结论回帖在原线程，减少客服在工单台、库表、缺陷库之间来回切换。",
    ],
    caveats: [
      "「13 人每日使用」是作者自述团队用量，不是公开准确率或人效测评；上线后需用自有工单复盘。",
      "查询账号必须只读；破坏性工具默认拒绝，退款/改单/关缺陷禁止 Agent 直接执行。",
      "线程里可能出现提示注入；外呼与密钥申请要留审计，回帖对手机号、证件等做脱敏。",
    ],
    prompts: [
      {
        title: "线程支持查询回帖",
        body: `你是企微/飞书支持线程里的只读查询助手。根据线程上下文与查询结果写回帖摘要。

输出结构：
1) 结论（一句话）
2) 依据（订单/日志/缺陷字段，已脱敏）
3) 可信度：高/中/低
4) 建议下一步：升级研发 / 请客户补资料 / 可关闭（仅建议）
5) 未查到或权限不足时的待核实清单

硬性规则：禁止改单、关缺陷、承诺退款；涉及金额与证件只掩码；不要编造未返回的查询结果。

线程上下文：
{{thread}}

查询结果：
{{query_result}}`,
      },
      {
        title: "是否已知缺陷对照",
        body: `对照缺陷库摘要，判断线程所述现象是否像已知缺陷。只依据给定条目，输出：匹配候选、相似点、不同点、是否建议升级研发。若条目不足，写「无法判定」而不是猜。

现象描述：
{{symptom}}

缺陷库候选：
{{bug_candidates}}`,
      },
    ],
    primarySource: {
      url: "https://news.ycombinator.com/item?id=50166597",
      label: "Hacker News · Show HN 讨论串回复（Doozy：Slack 线程触发支持查询）",
      date: "2026-10-20",
      dateLabel: "讨论",
    },
  },
  {
    id: "140",
    slug: "mcp-cross-mailbox-email-agent",
    title: "跨邮箱 MCP 邮件查询与处理",
    summary: "通过 MCP 连接多个邮箱提供商，用自然语言检索、摘要与起草跨箱邮件动作，适合一人多邮箱场景。",
    description: "自由职业者与运营常同时用公司邮、个人邮、别名箱。Agent 经 MCP 或统一连接器跨邮箱检索（按主题、发件人、附件类型），汇总线索并起草转发/标签/归档建议；发送与删除仍需确认。与「个人收件箱紧急度分拣」不同：重点是跨提供商统一查询与处理编排，而非单一收件箱优先级。不编造未检索到的邮件内容。",
    categories: ["efficiency"],
    platforms: ["chatgpt", "claude", "n8n", "feishu"],
    sourceUrl: "https://news.ycombinator.com/item?id=49743163",
    sourceLabel: "Hacker News",
    upvotes: 82,
    trending: false,
    tags: ["MCP", "邮件", "多邮箱", "个人效率", "检索"],
    howItWorks: [
      "配置各邮箱的只读/有限写 MCP 连接与范围",
      "用自然语言提问，Agent 跨箱检索并生成结构化摘要",
      "对转发、标签、归档给出待确认动作清单，用户一键批准",
    ],
    tips: [
      "默认可读不可发；外发单独开权限并记审计日志",
      "别名箱与主箱去重，避免同一线程重复进摘要",
    ],
    approach: `公开讨论里，作者在做基于 MCP 与 Agent 的跨邮箱智能层：先接主流邮箱提供商，经 MCP 让不同大模型都能查询；强调邮件内容瞬时处理、不落库长期存信，再把可查询的「邮件智能」提供给对话端。目标是一人多箱时用统一自然语言界面检索与理解，而不是再绑死单一邮箱客户端。

个人或小团队落地时，可为公司邮、个人邮、别名箱分别配只读 MCP/连接器，用一句话跨箱检索主题、发件人与附件类型，汇总线索并给出转发/标签/归档的待确认清单。发送与删除默认关闭，须单独授权并记审计；别名与主箱去重，避免同一线程重复进摘要。不编造未检索到的正文。`,
    outcomes: [
      "源未披露检索命中率、处理量或节时等量化；公开讨论只描述产品形态为「MCP 跨提供商邮件 + Agent 瞬时处理 + 私有测试」，当时仍在等各平台审批。",
      "多邮箱从分别打开多个客户端翻找，变成同一自然语言入口跨箱检索与摘要。",
      "转发/标签/归档以待确认动作清单呈现，发送与删除仍由人批准。",
    ],
    caveats: [
      "公开源未给出实测检索质量或隐私审计报告，上线后需用自有多箱样本复盘，勿把「流程跑通」当成效果承诺。",
      "默认可读不可发；外发与删除单独开权限并留审计，禁止静默群发。",
      "连接器授权范围按箱最小化；别名箱需去重；勿把未检索到的内容写成「已找到」。",
    ],
    prompts: [
      {
        title: "跨邮箱检索摘要",
        body: `你是跨邮箱检索助手。只根据给定检索命中列表写结构化摘要，禁止编造未出现的邮件、附件或承诺。

输出：
- summary：跨箱线索综述
- items：每条含 mailbox、subject、from、date、why_relevant
- duplicates：疑似同一线程的合并说明
- missing：用户问题里仍未覆盖的点

规则：没有命中就明确写「未找到」，不要用推测填空。

用户问题：
{{question}}

命中列表：
{{hits}}`,
      },
      {
        title: "待确认邮件动作清单",
        body: `根据摘要生成待确认动作清单：标签、归档、转发对象（若用户已指定）、删除候选。每条动作含风险提示。默认不包含「立即发送新邮件」；若用户明确要求起草，只输出草稿并标注「待批准发送」。

摘要：
{{email_summary}}

用户意图：
{{intent}}`,
      },
    ],
    primarySource: {
      url: "https://news.ycombinator.com/item?id=49743163",
      label: "Hacker News · Ask HN 讨论串回复（MCP 跨邮箱邮件 Agent）",
      date: "2026-09-17",
      dateLabel: "讨论",
    },
  },
  {
    id: "141",
    slug: "subscription-cancel-refund-helper",
    title: "订阅取消与退款办理助手",
    summary: "按订阅平台路径整理取消与退款步骤，生成话术与材料清单，浏览器 Agent 可协助点选但关键操作需人确认。",
    description: "个人生活中取消视频会员、SaaS、电商自动续费常踩「找不到入口」。Agent 根据平台公开帮助文档整理取消路径、保留证据清单（订单号、扣款截图）与客服话术；若接浏览器 Agent，只导航到设置页，提交取消/退款前必须人点确认。可本地化到国内常见应用商店与支付渠道说明。与 Stripe 失败支付催收草稿不同：本条面向消费者侧「我要退订/要退款」。不保证一定退成，不教绕过平台风控。",
    categories: ["life", "efficiency"],
    platforms: ["chatgpt", "claude", "grok", "doubao"],
    sourceUrl: "https://x.com/ChrisGPT/status/2049341524958151000",
    sourceLabel: "X 原帖",
    upvotes: 77,
    trending: false,
    tags: ["订阅", "退款", "取消", "生活办事", "浏览器Agent"],
    howItWorks: [
      "说明平台与订阅类型，Agent 拉取公开取消/退款路径摘要",
      "生成材料清单与客服话术，标出易漏步骤",
      "可选浏览器辅助导航；提交前强制人工确认",
    ],
    tips: [
      "先截图订阅状态与最近扣款，再点取消，便于争议",
      "涉及银行拒付前先走商家客服，避免误伤信用",
    ],
    approach: `公开 X 帖里，作者用带浏览器能力的对话式 Agent（帖文称 GPT-5.5 via Codex）处理亚马逊订阅：先在设置页走取消，再进帮助页打开「与客服在线聊」，对「订阅仍显示有效」用「账期结束前仍可访问、但要立刻停扣并退款」说明，直到对方确认退款后结束会话。帖中自述约省下 15 美元、几分钟内跑完；这是作者单次经历，不是平台通用成功率。

国内落地时，Agent 应先按目标平台的公开帮助文档整理取消路径、证据清单（订单号、扣款截图、订阅状态）与客服话术；浏览器 Agent 只导航到设置/帮助页，提交取消或退款前必须人点确认。可换到国内常见应用商店、视频会员与支付渠道说明；不教绕过风控，不保证一定退成。`,
    outcomes: [
      "作者自述该次退款约省下 15 美元、几分钟内办完（帖文原话量级，非我方实测，亦非全平台成功率）。",
      "取消与在线客服从人肉点选，变成「设置取消→帮助页沟通」同一浏览器会话里连贯完成。",
      "公开帖未给出多平台样本或退款成功率；可复用的是路径整理、证据清单与提交前人工确认闸门。",
    ],
    caveats: [
      "「约 15 美元」是作者单次自述，不是可推广的退款率或节时承诺；换平台后路径与政策不同，须用自有订单复盘。",
      "提交取消/退款/银行拒付前必须人确认；拒付前优先走商家客服，避免误伤信用。",
      "浏览器 Agent 可能误点营销入口或暴露登录态；关键页只导航、敏感操作停手等人；勿教规避平台风控。",
    ],
    prompts: [
      {
        title: "取消与退款路径清单",
        body: `你是订阅取消与退款办理助手。只根据用户给出的平台名称、订阅类型与公开帮助信息，整理可执行清单，禁止编造未提供的入口名称、政策条文或「一定能退」的承诺。

输出：
1) 推荐路径（设置内取消 / 应用商店 / 网页帮助 / 在线客服）及先后顺序
2) 提交前证据清单（订单号、扣款截图、订阅状态等）
3) 易漏步骤与常见卡点
4) 不适合自动提交、必须人工确认的动作

用户信息：
{{subscription_context}}`,
      },
      {
        title: "客服沟通话术草稿",
        body: `根据下列事实写一段简短客服沟通草稿（可用于在线聊或邮件）。要求：说明要取消并希望如何处理已扣款项；引用用户提供的订单号/扣款日期；语气礼貌、不威胁、不编造政策。若事实不足，列出待用户补全的字段，不要猜测金额。

事实：
{{refund_facts}}`,
      },
    ],
    primarySource: {
      url: "https://x.com/ChrisGPT/status/2049341524958151000",
      label: "X · @ChrisGPT（浏览器 Agent 取消订阅并沟通退款）",
      date: "2026-04-29",
      dateLabel: "发布",
    },
  },
  {
    id: "142",
    slug: "churn-expansion-signal-reply-draft",
    title: "流失扩容信号识别与客服回复草稿",
    summary: "从工单、用量与对话里识别流失或扩容信号，推送到企微/飞书并附可编辑的跟进回复草稿。",
    description: "客户成功与销售要盯「要流失」和「可能加购」两类信号。Agent 聚合工单情绪、活跃度下降、席位用量上升等规则，打标签后推到企微/飞书责任人，并附中文跟进草稿（挽留或扩容）。默认不自动改 CRM 阶段；报价与折扣必须人批。与「客服工单分拣」互补：本条偏生命周期信号与一对一跟进，而非一线 FAQ 分拣。",
    categories: ["enterprise", "efficiency"],
    platforms: ["wecom", "feishu", "chatgpt", "claude"],
    sourceUrl: "https://zapier.com/blog/ai-agent-use-cases/",
    sourceLabel: "Zapier · AI agent use cases",
    upvotes: 85,
    trending: false,
    tags: ["流失", "扩容", "客户成功", "企微", "飞书"],
    howItWorks: [
      "配置信号规则（活跃下降、差评、席位打满等）",
      "日更扫描并生成带证据的信号卡片",
      "推送责任人并附跟进草稿，人工编辑后发出并回写结果",
    ],
    tips: [
      "信号卡片必须带来源证据链接，避免「空报警」",
      "挽留话术禁止承诺未备案的折扣或功能",
    ],
    approach: `Zapier 公开用例文里，Healthie 用 Agent 每周一扫描 Salesforce、HubSpot、Vitally、Help Scout，抓早期流失或扩容信号，再把排好优先级的摘要发到 Slack，给客户支持与产品负责人审阅跟进——重点是「续约谈崩之前」就有人看见账户健康变化，而不是等季度会议才发现。

国内落地可把扫描结果与跟进草稿推到企微/飞书责任人：信号卡片必须带来源证据链接（工单、用量、对话片段），并附可编辑的挽留或扩容中文草稿。默认不自动改 CRM 阶段；报价、折扣与功能承诺必须人批后再发出，并回写跟进结果。`,
    outcomes: [
      "源未披露流失挽回率、扩容转化率或信号准确率等量化；公开文只描述 Healthie 已接通「多系统周扫→优先级摘要→Slack 审阅跟进」流程。",
      "客户成功从季度回顾才发现风险，变成按周拿到带优先级的流失/扩容信号清单。",
      "跟进从口头提醒，变成推送到企微/飞书并附可编辑回复草稿，发出前仍由人改。",
    ],
    caveats: [
      "公开源未给出实测准确率或挽回金额，上线后需用自有账户健康数据复盘，勿把「流程跑通」当成效果承诺。",
      "信号卡片无证据链接易成空报警；挽留话术禁止承诺未备案折扣或功能。",
      "默认禁止 Agent 自动改 CRM 阶段或自动外发；换租户后权限、字段映射与责任人路由要重核。",
    ],
    prompts: [
      {
        title: "流失/扩容信号卡片",
        body: `你是客户成功信号助手。只根据给定账户证据生成一张信号卡片，禁止编造未出现的工单、用量或合同日期。

输出：
- signal_type：流失风险 / 扩容机会 / 观察中
- priority：高/中/低及理由
- evidence：条目列表（来源系统+摘要+链接占位）
- suggested_owner：建议责任角色
- open_questions：待人工核实点

规则：证据不足就标「观察中」，不要为了「有信号」硬升优先级。

账户材料：
{{account_bundle}}`,
      },
      {
        title: "跟进回复草稿",
        body: `根据信号卡片写一段可发给客户的中文跟进草稿（挽留或扩容）。语气专业克制；禁止承诺未备案的折扣、功能上线日期或赔偿。文末列出「发出前须人工确认」清单。不要声称已经发送或已改 CRM。

信号卡片：
{{signal_card}}

允许话术边界（可空）：
{{policy_bounds}}`,
      },
    ],
    primarySource: {
      url: "https://zapier.com/blog/ai-agent-use-cases/",
      label: "Zapier · 7 AI agent use cases（Churn risk monitoring / Healthie）",
      date: "2026-01-09",
      dateLabel: "发布",
    },
  },
  {
    id: "143",
    slug: "im-group-business-risk-patrol",
    title: "企微/飞书群巡检业务风险并出跟进清单",
    summary: "定时巡检指定业务群，揪出投诉升级、合规敏感词与承诺过度表述，输出可执行跟进清单。",
    description: "业务群消息量大，管理者难以及时发现「要炸的雷」。Agent 按白名单群定时扫描近期消息，标注投诉升级、对外乱承诺、敏感合规词与未闭环 @，生成跟进清单（谁、什么事、建议动作）发到管理小群。与「企微群信号日摘要」不同：本条聚焦风险巡检与跟进清单，而非综合信号日报。默认不在大群自动回复，避免二次暴露。",
    categories: ["enterprise", "efficiency"],
    platforms: ["wecom", "feishu", "chatgpt", "deepseek"],
    sourceUrl: "https://x.com/FarmercistSol_/status/2106410228036108652",
    sourceLabel: "X 原帖",
    upvotes: 83,
    trending: false,
    tags: ["群巡检", "风险", "企微", "飞书", "合规"],
    howItWorks: [
      "配置巡检群、敏感词库与升级规则",
      "定时拉取增量消息并分类风险项",
      "向管理小群输出跟进清单，人工认领后回写状态",
    ],
    tips: [
      "敏感词分「必拦」与「需人工」两级，降低误报打扰",
      "巡检账号只用可读权限，勿授予发消息到客户大群的权限",
    ],
    approach: `公开 X 帖（含 #ad / Paid partnership 标注）里，服装品牌主用 Lindy 回看销售、客服、库存、评价等 Slack 频道：一次汇总出客户需求、未结客服问题、低库存与缺货、近期评价反馈，并落成可执行下一步（补货、跟进未结单、向客户确认有货、围绕旺季兴趣做计划），而不是只在群里问答。

国内可映射为企微/飞书白名单业务群的定时巡检：扫增量消息，标注投诉升级、对外过度承诺、合规敏感词与未闭环 @，把「谁、什么事、建议动作」跟进清单推到管理小群，由人认领后回写状态。默认不在客户大群自动回复，巡检账号只读，避免二次暴露。`,
    outcomes: [
      "作者自述该次巡检汇总出客户需求、5 个未结客服问题、低库存/缺货与评价反馈，并生成补货与跟进等下一步（帖内自述，非我方实测；帖为付费合作披露）。",
      "多频道业务信号从人工翻群，收成一份带下一步动作的跟进清单。",
      "公开帖未披露长期误报率、闭环时长或营收影响等量化；可复用的是「只读巡检→管理小群清单→人认领」。",
    ],
    caveats: [
      "源帖标注 #ad / Paid partnership，效果为作者单次演示自述；「5 个未结问题」等勿当成通用 KPI 承诺。",
      "巡检账号只用可读权限，禁止授予向客户大群发消息的权限；默认不在大群自动回复。",
      "敏感词宜分「必拦」与「需人工」；误报与隐私（客户原话）要在管理小群内收敛，并留认领与回写。",
    ],
    prompts: [
      {
        title: "群消息风险分类",
        body: `你是企微/飞书业务群风险巡检助手。只根据给定增量消息与词库规则分类，禁止编造未出现的发言或 @ 对象。

对每条风险输出：
- category：投诉升级 / 过度承诺 / 合规敏感 / 未闭环@ / 其他
- severity：必拦 / 需人工 / 观察
- who / what / evidence_quote（短摘录）
- suggested_action

规则：不确定就标「需人工」；不要在输出里扩写客户隐私细节。

消息：
{{messages}}

规则词库：
{{rulebook}}`,
      },
      {
        title: "管理小群跟进清单",
        body: `把风险项整理成发给管理小群的跟进清单：按严重度排序；每条含负责人候选、建议动作、是否需法务/客成介入。文首声明「请认领，勿转发到客户大群」。不要声称已经通知客户或已经改库存。

风险项：
{{risk_items}}`,
      },
    ],
    primarySource: {
      url: "https://x.com/FarmercistSol_/status/2106410228036108652",
      label: "X · @FarmercistSol_（Lindy 巡检 Slack 业务频道并出跟进清单）",
      date: "2026-10-03",
      dateLabel: "发布",
    },
  },
  {
    id: "144",
    slug: "competitor-ad-daily-digest-to-im",
    title: "竞品广告日研报推送到飞书企微",
    summary: "每日抓取竞品公开广告素材与文案变化，整理成一页研报推送到飞书或企微投放群。",
    description: "增长与投放同学需要盯竞品广告创意，而不是整站产品更新。Agent 按竞品名单汇总公开可访问的广告库/落地页文案变化，输出「新创意、主卖点、预估受众角度」一页纸，定时推到飞书/企微。与「竞品产品周报」区分：只谈广告与投放向信号，不做功能路线图臆测。不抓取需登录的非公开后台，不编造花费数据。",
    categories: ["content", "efficiency"],
    platforms: ["feishu", "wecom", "chatgpt", "n8n"],
    sourceUrl: "https://x.com/cjfeth/status/2034220127042834715",
    sourceLabel: "X 原帖",
    upvotes: 81,
    trending: false,
    tags: ["竞品广告", "投放", "日研报", "飞书", "企微"],
    howItWorks: [
      "维护竞品与公开广告源列表",
      "日更抓取可公开访问的素材/文案并做去重对比",
      "生成一页研报推送到飞书/企微投放群",
    ],
    tips: [
      "研报只写观察到的文案与版式变化，勿臆造对方预算",
      "素材截图注意版权：内部研报可用，勿二次公开发布原创意",
    ],
    approach: `公开 X 帖描述用 Manus 自动化给创意策略同学日更「点子与调研」：一边从目标受众常出没的公开场域挖新角度、概念与失败解法，一边抓取竞品公开广告库的主文案与标题，对照研究数据标出供给不足处，再汇总成主报告自动推进团队 Slack。

国内落地时，维护竞品与可公开访问的广告库/落地页列表，日更去重对比文案与版式变化，输出一页「新创意、主卖点、受众角度」研报推到飞书或企微投放群。只写观察得到的变化，不臆造花费与预算；不登录非公开后台；素材截图限内部研报，勿二次公开发布原创意。`,
    outcomes: [
      "源未披露研报阅读率、创意采用率或花费对比等量化；公开帖只描述已接通「日更受众调研 + 竞品广告库文案扫描 → 主报告进 Slack」。",
      "竞品广告观察从人手翻库，变成每日一页可扫的投放向研报。",
      "创意策略输入与竞品文案变化落在同一报告里，便于投放群对齐「看见了什么、还缺什么角度」。",
    ],
    caveats: [
      "公开源未给出实测采用率或效果提升数字，上线后需用自有投放复盘，勿把「流程跑通」当成效果承诺。",
      "禁止臆造对方预算/花费；只使用可公开访问来源，不抓需登录的非公开后台。",
      "竞品素材截图有版权风险：内部研报可用，勿二次公开发布原创意或整页照搬文案对外投放。",
    ],
    prompts: [
      {
        title: "竞品广告变化摘录",
        body: `你是竞品广告观察助手。只根据给定的公开广告/落地页抓取结果做去重对比，禁止编造未出现的花费、投放量或「一定赢」的结论。

输出：
- new_or_changed：新创意或文案/版式变化列表（竞品名、主文案、标题、观察到的卖点）
- unchanged_notable：仍在跑且值得盯的旧创意（可空）
- gaps：相对我方既有角度，可能供给不足的方向（标注为假说）
- unknowns：抓取失败或字段缺失

抓取结果：
{{ad_scrape}}

我方既有角度（可空）：
{{our_angles}}`,
      },
      {
        title: "飞书/企微一页日研报",
        body: `把上述摘录压成一页投放群日研报：今日新变化、主卖点、受众角度假说、建议人工复看的 3 条链接占位。语气陈述观察，不写预算数字，不写「抄这条就能赢」。文末加「仅供内部，勿外发原素材」。

摘录：
{{ad_digest}}`,
      },
    ],
    primarySource: {
      url: "https://x.com/cjfeth/status/2034220127042834715",
      label: "X · @cjfeth（Manus 日更竞品广告库研报推 Slack）",
      date: "2026-03-18",
      dateLabel: "发布",
    },
  },
  {
    id: "145",
    slug: "invoice-inventory-po-agent",
    title: "发票对库存校验并生成采购单",
    summary:
      "核对进项发票与库存水位，缺货或低于安全库存时生成采购单草稿，推送到飞书/企微待批。",
    description:
      "仓储与采购常出现「票到了货不够」或重复下单。Agent 读取发票明细与库存表，校验品名/规格/数量，标出差异与低于安全库存的 SKU，并生成采购单草稿（供应商、数量、期望到货日）。默认不自动下单或付款；审批在飞书/企微完成后再同步。与「发票抽取记账」互补：本条偏进销存校验与采购触发。一手灵感来自公开 n8n/Agent 实践文，正文中文原创。",
    categories: ["enterprise", "efficiency"],
    platforms: ["feishu", "wecom", "n8n", "chatgpt"],
    sourceUrl:
      "https://dev.to/nova_gg/n8n-review-2026-i-used-it-for-8-months-to-build-ai-agents-honest-verdict-kif",
    sourceLabel: "DEV.to · n8n Agent 实践",
    upvotes: 84,
    trending: false,
    tags: ["发票", "库存", "采购单", "飞书", "企微"],
    howItWorks: [
      "同步进项发票行与库存/安全库存表",
      "校验差异并列出需补货 SKU",
      "生成采购单草稿推飞书/企微，人工批准后再下发供应商",
    ],
    tips: [
      "SKU 别名表先建好，减少品名 OCR/简称导致的误报缺货",
      "采购单金额超阈值必须双人批，防止 Agent 放大数量",
    ],
    approach: `DEV.to 上作者回顾用 n8n 做迪拜客户进销存向 Agent：邮件触发识别含 Invoice 的来信，抽 PDF，用视觉模型抽出供应商/金额/明细，对照 Google Sheets 库存校验，金额合理则在 ERP 建采购单，并 Slack 通知采购组、回邮确认。全文约 23 个节点，作者称搭建约 3 天，并培训业务经理自行改校验规则。

国内落地可把通知与审批换到飞书/企微：进项发票行与库存/安全库存表对齐后，标出品名规格数量差异与低于安全库存的 SKU，生成采购单草稿（供应商、数量、期望到货日）待批；人批准后再下发供应商。默认不自动付款、不下无审批的采购单；先建 SKU 别名表，降低简称/OCR 误报。`,
    outcomes: [
      "作者自述客户从每周人工处理约 40–50 张发票（约每天 2 小时）变为约 90% 自动处理，大约每周节省 8–10 小时；另称该流约 23 节点、搭建约 3 天（均为作者文内自述，非我方实测）。",
      "进项票与库存校验、采购单创建、采购组通知收成同一条可回放的工作流。",
      "业务侧可在可视化画布上改校验规则与供应商，减少事事找开发改脚本。",
    ],
    caveats: [
      "「90% / 每周 8–10 小时」等为作者客户案例自述，依赖其票样与 ERP；换租户后须用自有发票与库存复盘，勿直接当效果承诺。",
      "默认禁止自动付款与无审批下单；超阈值采购须双人批，防止数量被放大。",
      "PDF 损坏、模型抽数畸形、ERP 宕机等边缘情况要有失败重放与人工队列；SKU 别名表未建好时易误报缺货。",
    ],
    prompts: [
      {
        title: "发票行对库存校验",
        body: `你是进项发票与库存校验助手。只根据给定发票明细与库存表比对，禁止编造未出现的 SKU、数量或供应商。

输出：
- matches：品名/规格/数量一致的行
- mismatches：差异行（发票值、库存值、差异说明）
- below_safety：低于安全库存的 SKU 与缺口
- needs_alias：疑似别名未映射、需人工的品名

规则：对不上就进 mismatches 或 needs_alias，不要按「常见规格」猜。

发票明细：
{{invoice_lines}}

库存表：
{{inventory}}`,
      },
      {
        title: "采购单草稿（待批）",
        body: `根据校验结果生成采购单草稿，推给飞书/企微审批。字段：供应商、SKU、数量、期望到货日、金额估算（若有单价）、超阈值是否触发双人批。文首标明「草稿，未下发供应商」。禁止写「已下单」或「已付款」。

校验结果：
{{validation}}

采购政策（可空）：
{{po_policy}}`,
      },
    ],
    primarySource: {
      url: "https://dev.to/nova_gg/n8n-review-2026-i-used-it-for-8-months-to-build-ai-agents-honest-verdict-kif",
      label: "DEV.to · n8n Review 2026: I Used It for 8 Months to Build AI Agents (Honest Verdict)",
      date: "2026-04-01",
      dateLabel: "发布",
    },
  },
  {
    id: "146",
    slug: "voice-note-to-im-ticket-agent",
    title: "语音备忘转企微飞书工单并复盘",
    summary:
      "把通勤或巡场时的语音备忘转写为结构化工单，推到企微/飞书，并在周末输出处理复盘。",
    description:
      "管理者口头交代多、事后难追溯。Agent 接收语音备忘，转写后抽取事项、责任人、截止日期与优先级，在企微或飞书创建任务/工单；周期结束汇总完成率与延误原因。默认创建前可预览；不自动 @ 全体。与「会议纪要待办」不同：本条入口是零散语音而非整场会议。",
    categories: ["efficiency", "enterprise"],
    platforms: ["wecom", "feishu", "chatgpt", "doubao"],
    sourceUrl: "https://rumjahn.substack.com/p/the-complete-guide-to-openai-codex",
    sourceLabel: "Substack · Codex 指南（语音/任务向线索）",
    upvotes: 86,
    trending: false,
    tags: ["语音", "工单", "企微", "飞书", "复盘"],
    howItWorks: [
      "上传或转发语音备忘，完成转写与字段抽取",
      "生成工单预览，确认后写入企微/飞书任务",
      "周期汇总完成与逾期项，输出一页复盘",
    ],
    tips: [
      "说话时带上「谁、什么时候、验收标准」三要素，转写质量显著提升",
      "敏感人名与客户名可先用代号，工单可见范围再解敏",
    ],
    approach: `Substack 上作者介绍 Codex 工作流时提到一类可复用 Skill：把关于功能需求的语音备忘交给 Agent，自动整理成格式规范的 Linear 工单；同文还写到可把类似技能挂到定时自动化上反复跑。公开文把这条语音→工单技能当作日常工具链的一环来描述，并未单独给出该技能的创建量或完成率数字。

国内落地时，入口换成通勤/巡场语音备忘：转写后抽取事项、责任人、截止日期与优先级，先出工单预览，人确认后再写入企微或飞书任务；周期结束汇总完成与逾期项成一页复盘。默认不自动 @ 全体；敏感人名与客户名可先用代号，工单可见范围再解敏。说话时尽量带上「谁、什么时候、验收标准」三要素。`,
    outcomes: [
      "源未披露语音→工单的创建量、字段准确率或复盘后完成率等量化；公开文只描述已接通「语音备忘→格式化工单（Linear）」这一 Skill 环节。",
      "零散口头交代从事后难追溯，变成可预览再写入企微/飞书的结构化工单。",
      "周期复盘有统一字段可汇总完成与逾期项，便于对照延误原因，而不是翻聊天记录。",
    ],
    caveats: [
      "公开源未给出该语音工单技能的实测准确率或完成率，上线后需用自有语音样本与任务表复盘，勿把「流程跑通」当成效果承诺。",
      "创建前必须预览；禁止自动 @ 全体；敏感人名/客户名宜先代号再解敏。",
      "转写质量依赖口齿与三要素是否齐全；缺责任人或截止日期时应标「待补全」而不是猜测。",
    ],
    prompts: [
      {
        title: "语音备忘抽工单字段",
        body: `你是语音备忘转工单助手。只根据给定转写文本抽取字段，禁止编造未出现的责任人、日期或验收标准。

输出：
- title：短标题
- assignee：责任人（未知则「待指定」）
- due：截止日期（未知则「待补全」）
- priority：高/中/低及依据
- acceptance：验收标准（原文有则摘，无则「待补全」）
- open_questions：需口头再确认的点

规则：缺关键字段不要猜；不要 @ 全体。

转写：
{{transcript}}`,
      },
      {
        title: "周期工单复盘一页纸",
        body: `根据下列工单状态表写一页复盘（可发飞书/企微）：完成数、逾期数、主要延误原因归类、下周建议优先级。只使用表内字段；不要编造完成率百分比（除非表里已有）。文首标明「内部复盘草稿」。

工单状态表：
{{ticket_status}}`,
      },
    ],
    primarySource: {
      url: "https://rumjahn.substack.com/p/the-complete-guide-to-openai-codex",
      label: "Substack · The complete guide to OpenAI Codex（语音备忘→Linear 工单 Skill 线索）",
      date: "2026-02-06",
      dateLabel: "发布",
    },
  },
  {
    id: "147",
    slug: "notes-vault-cli-summarize-agent",
    title: "本地笔记库 CLI 汇总数月笔记",
    summary:
      "用 CLI Agent 扫描本地笔记库（Logseq/Obsidian 类），按主题汇总数月内容并生成回顾稿。",
    description:
      "笔记写得多、回顾少。在本地仓库目录运行 CLI Agent，按标签或时间窗检索，输出主题摘要、未闭环行动项与值得重读的条目，可再贴进飞书文档做周回顾。全程本地优先，不默认上传整库到公网。适合个人效率与学习积累。",
    categories: ["efficiency", "education"],
    platforms: ["chatgpt", "claude", "deepseek", "grok"],
    sourceUrl: "https://news.ycombinator.com/item?id=48897407",
    sourceLabel: "Hacker News",
    upvotes: 79,
    trending: false,
    tags: ["笔记", "CLI", "回顾", "Obsidian", "个人效率"],
    howItWorks: [
      "指定笔记库路径与时间/标签过滤",
      "Agent 只读扫描并聚类主题",
      "输出回顾稿与行动项清单，可选同步到飞书文档",
    ],
    tips: [
      "先用 `.gitignore` 排除日记私密目录再让 Agent 扫描",
      "回顾稿固定模板：主题 / 进展 / 未完成，方便跨周对比",
    ],
    approach: `Hacker News 讨论里，评论者说明安装 Logseq 时会带上 CLI，把官方 CLI 文档贴给 Codex 后，Agent 就能按文档操作；据此可对数月 journal 做汇总，并用导出的 .edn + git 做版本管理。另可开启 markdown-mirror（库→Markdown 单向同步），方便 Agent 读库。帖中强调开源与标签/状态（如求职进度、研究项目状态）让查询更自然，但未给出汇总耗时或准确率数字。

国内落地可对本地 Logseq/Obsidian 类笔记库跑 CLI Agent：按路径、时间窗或标签只读扫描，聚类主题后输出回顾稿、未闭环行动项与值得重读条目，再可选贴进飞书文档做周回顾。全程本地优先，不默认上传整库；扫描前用忽略规则排除日记等私密目录；回顾稿固定「主题 / 进展 / 未完成」模板便于跨周对比。`,
    outcomes: [
      "源未披露汇总数月笔记的耗时、主题覆盖率或行动项召回等量化；公开评论只描述已接通「Logseq CLI 文档→Codex 操作→journal 跨月汇总」，并提到 markdown-mirror 利于 Agent。",
      "回顾从人手翻日记，变成按时间/标签过滤后的主题摘要与未闭环清单。",
      "可选把回顾稿同步到飞书文档，方便周会对照，而不必把整库上传公网。",
    ],
    caveats: [
      "公开源未给出实测准确率或节时数据，上线后需用自有笔记库复盘，勿把「能汇总」当成质量承诺。",
      "先排除私密目录再扫描；默认只读，勿让 Agent 批量改写原文笔记。",
      "评论者称相关能力仍偏 alpha，CLI/镜像行为可能随版本变化，升级后要重核文档与权限。",
    ],
    prompts: [
      {
        title: "笔记库主题回顾稿",
        body: `你是本地笔记库回顾助手。只根据给定的笔记摘录（已按时间/标签过滤）聚类主题，禁止编造未出现的条目或结论。

输出固定模板：
1) 主题列表（每主题 3–6 条要点）
2) 进展：本期内有明确推进的项
3) 未完成：仍开放的行动项（原文依据）
4) 值得重读：带路径/标题占位
5) 缺口：材料不足、无法判断之处

笔记摘录：
{{notes_excerpt}}`,
      },
      {
        title: "飞书周回顾粘贴版",
        body: `把上述回顾稿压成可直接贴进飞书文档的周回顾：标题含时间窗；段落短；行动项用复选框语法；文末声明「仅基于本地摘录，未上传整库」。不要添加未在回顾稿出现的承诺或截止日期。

回顾稿：
{{review_draft}}`,
      },
    ],
    primarySource: {
      url: "https://news.ycombinator.com/item?id=48897407",
      label: "HN · comment 48897407（Logseq CLI + Codex 汇总数月 journal）",
      date: "2026-07-13",
      dateLabel: "讨论",
    },
  },
  {
    id: "148",
    slug: "wecom-customer-session-triage-draft",
    title: "企微客户会话分拣与回复草稿",
    summary:
      "对企业微信客户会话做意图分拣与优先级标注，并生成可编辑回复草稿，人工确认后发送。",
    description:
      "企微客户会话与邮箱工单不同：即时、口语、夹杂图片。Agent 读取会话线程，判断咨询/投诉/物流/商务意图，打优先级，并起草中文回复；高风险（退款、法律、舆情）强制转人工。与「企微 FAQ 自动应答」区分：本条是会话级分拣+草稿，而非侧边栏标准答案检索；与「邮箱工单分拣」区分入口为企微会话。灵感来自公开即时通讯客服 Agent 讨论，本地化到企微。",
    categories: ["enterprise", "efficiency"],
    platforms: ["wecom", "coze", "chatgpt", "deepseek"],
    sourceUrl: "https://x.com/aiautomationexp/status/2110035889871257677",
    sourceLabel: "X 原帖",
    upvotes: 88,
    trending: false,
    tags: ["企微", "客户会话", "分拣", "回复草稿", "客服"],
    howItWorks: [
      "接入企微客户联系/会话存档许可范围内的消息",
      "输出意图、优先级与回复草稿",
      "坐席编辑发送，并回写标签与结案原因",
    ],
    tips: [
      "会话存档与隐私合规先找法务确认范围与留存周期",
      "禁止草稿里出现未备案的报价与「一定能退」表述",
    ],
    approach: `公开 X 帖里，作者称搭了一条商务 WhatsApp 客服 Agent：客户消息进来后，Agent 检索资料、查日历、把过程记到 Sheets/Notion，再在 WhatsApp 与邮件侧回复，并标注为自动流转。帖文是产品演示向短述，未给出接通率、误回率或人机接管比例等量化。

国内映射为企微客户会话：在客户联系/会话存档的许可范围内读取线程，判断咨询/投诉/物流/商务等意图并打优先级，生成可编辑中文回复草稿；退款、法律、舆情等高风险强制转人工。坐席改完再发，并回写标签与结案原因。禁止草稿出现未备案报价与「一定能退」；合规范围与留存周期先找法务确认。`,
    outcomes: [
      "源未披露分拣准确率、首响时长或自动发送占比等量化；公开帖只描述已接通「客户消息→检索/日历/记表→WhatsApp+邮件回复」自动链。",
      "企微会话从纯人工翻线程，变成「意图+优先级+可编辑草稿」一张卡片，发出前仍由人改。",
      "高风险类型可强制进人工队列，降低误承诺退款或法律口径的风险面。",
    ],
    caveats: [
      "公开源未给出实测准确率或节省人时，上线后需用自有会话样本复盘，勿把「流程演示」当成效果承诺。",
      "会话存档与隐私合规须先做法务确认；默认禁止自动外发，坐席确认后才发送。",
      "禁止草稿含未备案报价与「一定能退」；图片/语音未识别清楚时应标「待人工看原消息」，不要猜。",
    ],
    prompts: [
      {
        title: "会话意图与优先级",
        body: `你是企微客户会话分拣助手。只根据给定会话线程判断意图与优先级，禁止编造未出现的订单号、承诺或政策。

输出：
- intent：咨询 / 投诉 / 物流 / 商务 / 其他
- priority：高/中/低及理由
- risk_flags：退款/法律/舆情/无
- evidence_quotes：短摘录（可多条）
- handoff：是否强制转人工及原因

规则：高风险一律 handoff=是；证据不足就降低优先级并列出待核实点。

会话：
{{thread}}`,
      },
      {
        title: "中文回复草稿（待发）",
        body: `根据分拣结果写一段可编辑的中文回复草稿。语气礼貌克制；禁止未备案报价、禁止「一定能退/一定赔偿」。若 risk_flags 非空，草稿改为安抚+说明将由专人跟进，不要给结论。文首标明「草稿，未发送」。

分拣结果：
{{triage}}

允许话术边界（可空）：
{{policy_bounds}}`,
      },
    ],
    primarySource: {
      url: "https://x.com/aiautomationexp/status/2110035889871257677",
      label: "X · @aiautomationexp（WhatsApp 商务客服 Agent 演示）",
      date: "2026-10-13",
      dateLabel: "发布",
    },
  },
  {
    id: "149",
    slug: "scheduled-recurring-agent-tasks",
    title: "定时循环任务挂飞书企微提醒",
    summary:
      "把日报汇总、对账核对、目录清理等循环工作做成定时 Agent 任务，完成后在飞书/企微通知结果。",
    description:
      "团队里大量「每周五都要做」的琐事适合交给定时 Agent：拉数、对差异、生成摘要、清理过期草稿。任务按日历触发，产出写入约定文档，并在飞书/企微发送完成卡；失败则告警。与一次性聊天式委托不同：强调可调度、可观测、可停用。不自动对外发送客户邮件除非审批通过。",
    categories: ["enterprise", "efficiency"],
    platforms: ["feishu", "wecom", "n8n", "chatgpt"],
    sourceUrl:
      "https://aiblewmymind.substack.com/p/claude-cowork-scheduled-tasks-6-ways",
    sourceLabel: "Substack · 定时任务实践",
    upvotes: 87,
    trending: false,
    tags: ["定时任务", "循环工作", "飞书", "企微", "企业自动化"],
    howItWorks: [
      "登记循环任务：触发时间、输入源、成功标准",
      "到点执行并写结果到文档/表格",
      "向飞书/企微推送成功摘要或失败告警",
    ],
    tips: [
      "每个任务设最大运行时长与重试上限，避免卡死占额度",
      "变更生产数据的任务必须带「干跑」开关",
    ],
    approach: `Substack 上作者介绍 Claude Cowork 的 scheduled tasks：提示词写一次，选按小时/日/周等节奏，到点自动跑，跑完产出等人审。文中称实测 6 类用法（晨间邮件摘要、文件整理、Stripe 报表、发票归类对账、Apple Notes 整理、机票价格追踪），并说明可用 /schedule 或侧边栏新建任务、可暂停/恢复/按需重跑；后文还提到云端可在电脑合盖后继续跑。公开可读部分强调流程与用例清单，未给出各任务节省分钟数或成功率表。

国内落地把循环琐事（日报汇总、对账核对、目录清理等）登记为定时 Agent：写清触发时间、输入源与成功标准，到点执行并把结果写入约定飞书/企微文档或表格，再推送完成卡；失败则告警。与一次性聊天委托不同，强调可调度、可观测、可停用；对外客户邮件默认不自动发送，除非审批通过。每任务设最大时长与重试上限；改生产数据必须带「干跑」开关。`,
    outcomes: [
      "源未披露各定时任务的成功率、平均耗时或节省人时等量化；公开文只描述已接通「写提示→选节奏→到点自动跑→产出待审」，并列出作者实测的 6 类用例。",
      "「每周五都要做」的拉数/对账/清理，从靠人记得，变成可暂停、可重跑的调度项。",
      "成功摘要或失败告警可挂到飞书/企微，便于值班同学看见结果而不必盯着对话窗口。",
    ],
    caveats: [
      "公开源未给出实测 SLA 或成本数字，上线后需用自有任务日志复盘，勿把「用例能跑」当成稳定性承诺。",
      "变更生产数据必须先干跑；对外客户邮件默认禁止自动发送，须审批。",
      "设最大运行时长与重试上限，避免卡死占额度；本地文件夹触发时还要考虑机器休眠导致漏跑。",
    ],
    prompts: [
      {
        title: "循环任务登记卡",
        body: `你是定时任务设计助手。根据用户描述输出一张可调度的任务登记卡，禁止编造未提供的数据源或权限。

输出：
- name / cadence / timezone
- inputs：输入源与路径/连接器
- success_criteria：怎样算成功
- outputs：写到哪份文档/表格
- notify：飞书/企微成功卡与失败告警对象
- dry_run：是否必须先干跑
- limits：最大时长、重试上限
- external_send：是否涉及对外发送（默认否）

用户描述：
{{task_brief}}`,
      },
      {
        title: "完成卡 / 失败告警文案",
        body: `根据本次运行日志生成发往飞书或企微的短消息。成功：摘要关键产出链接占位、是否需人审。失败：错误类型、已重试次数、建议人工动作。不要声称已对外发送客户邮件。不要编造未在日志出现的数字。

运行日志：
{{run_log}}`,
      },
    ],
    primarySource: {
      url: "https://aiblewmymind.substack.com/p/claude-cowork-scheduled-tasks-6-ways",
      label: "Substack · Claude Scheduled Tasks: 6 Examples + Setup (Cowork)",
      date: "2026-02-26",
      dateLabel: "发布",
    },
  },
  {
    id: "150",
    slug: "personal-research-wiki-agent",
    title: "论文文章搭建个人研究 Wiki",
    summary:
      "把论文与长文解析成互相链接的笔记卡片，逐步搭成个人研究 Wiki，支持问答检索。",
    description:
      "研究者与深度学习者需要可累积的知识网络，而不是一堆 PDF。Agent 读取论文/文章（本地文件或用户粘贴），抽出问题、方法、结论与待验证点，写入双向链接笔记（Obsidian 或飞书知识库），并维护主题索引。可对 Wiki 提问做综述草稿。不编造未出现在原文的实验数据；引用保留出处。",
    categories: ["efficiency", "education"],
    platforms: ["chatgpt", "claude", "deepseek", "feishu"],
    sourceUrl:
      "https://github.com/rbarok/obsidian-cursor-knowledge-graph/blob/main/cursor-obsidian.md",
    sourceLabel: "GitHub · Obsidian 知识图谱笔记",
    upvotes: 80,
    trending: false,
    tags: ["研究 Wiki", "论文", "知识库", "笔记", "学习"],
    howItWorks: [
      "导入论文 PDF 或长文，抽取结构化卡片字段",
      "写入带双链的笔记库并更新主题索引",
      "按问题检索多篇卡片生成综述草稿，人工补引用",
    ],
    tips: [
      "每张卡片强制保留原文出处与页码/段落，便于核对",
      "付费墙论文只用你有权访问的副本，勿让 Agent 绕过访问控制",
    ],
    approach: `GitHub 上的公开笔记 \`cursor-obsidian.md\` 描述用 Cursor Agent + Obsidian 搭「LLM Wiki」：原始文献放在不可变的 raw/，Agent 负责维护互相链接的 wiki/ 层（摘要、实体页、概念页、综述），并用 AGENTS.md、规则与可选 skills 约定摄入/问答/巡检协议；另有 index.md 做目录、log.md 做时间线。核心对比是：不要每次提问都靠 RAG 从头拼碎片，而是让 Wiki 随文献累积、矛盾被标出、综合可复用。文中未给出页数、摄入速度或问答准确率等量化。

国内落地可把论文/长文（本地有权访问的副本）交给 Agent 抽问题、方法、结论与待验证点，写入 Obsidian 双链笔记或飞书知识库卡片，并维护主题索引；再按问题检索多篇卡片生成综述草稿，由人补引用。不编造原文没有的实验数据；每张卡片强制保留出处与页码/段落；付费墙文献只用已授权副本，勿让 Agent 绕过访问控制。`,
    outcomes: [
      "源未披露 Wiki 页数、摄入耗时或问答准确率等量化；公开笔记只描述「raw 不可变 + Agent 维护双链 wiki + index/log + 摄入/问答/巡检」架构与工作流。",
      "研究笔记从一堆 PDF/聊天回答，变成可累积的双链卡片与主题索引，综合结果可回写进库。",
      "综述草稿带来源占位，人工补引用后可在飞书知识库或 Obsidian 里复用，而不是每次从零检索。",
    ],
    caveats: [
      "公开源是方法论文档而非评测报告，无准确率承诺；上线后需用自有文献集复盘抽取与链接质量。",
      "禁止编造未出现在原文的数据；每卡保留出处与页码/段落，综述发出前人工核引用。",
      "付费墙/版权文献只用有权访问的副本；raw 层保持不可变，避免 Agent 改写原文。",
    ],
    prompts: [
      {
        title: "论文/长文卡片抽取",
        body: `你是研究 Wiki 摄入助手。只根据给定原文抽取卡片字段，禁止编造未出现的实验数据、数值或结论。

输出：
- question：研究问题
- method：方法要点
- findings：结论/发现（带出处锚点）
- open_claims：待验证点
- entities / concepts：建议双链的实体与概念
- source：标题、作者、出处、页码/段落

规则：原文没有的数字一律不写；不确定标「原文未明确」。

原文：
{{source_text}}`,
      },
      {
        title: "多卡综述草稿",
        body: `根据多张卡片回答用户问题，生成综述草稿：先列引用过的卡片 id/标题，再写综合段落，文末列出矛盾点与证据缺口。禁止添加卡片中不存在的数据。文首标明「草稿，引用待人工核对」。可输出为飞书知识库或 Obsidian 可粘贴 Markdown。

问题：
{{question}}

卡片：
{{wiki_cards}}`,
      },
    ],
    primarySource: {
      url: "https://github.com/rbarok/obsidian-cursor-knowledge-graph/blob/main/cursor-obsidian.md",
      label: "GitHub · rbarok/obsidian-cursor-knowledge-graph `cursor-obsidian.md`（LLM Wiki 模式）",
      date: "2026-06-15",
      dateLabel: "提交",
    },
  },
  {
    id: "151",
    slug: "hot-news-ai-cms-publish",
    title: "热点新闻自动成稿并发布到博客 CMS",
    summary:
      "从 RSS/热点源生成中文草稿与 SEO 元数据，经人工过审后发布到博客或 CMS，并可在飞书通知结果。",
    description:
      "内容团队要追热点又怕事实错误。工作流拉取公开 RSS 或新闻线索，生成标题、摘要、正文骨架与 SEO 字段，先入「待审」而非直接公开；编辑核对事实与敏感表述后再一键发布。与「热点摘要日更」不同：本条目标是可发布的成稿进 CMS，不是内部速报。不编造未出现在源里的数据与引语。",
    categories: ["content", "efficiency"],
    platforms: ["n8n", "chatgpt", "claude", "feishu"],
    sourceUrl:
      "https://dev.to/grewup/automate-blog-publishing-with-n8n-ai-wordpress-full-workflowpublished-true-56cl",
    sourceLabel: "DEV.to · n8n WordPress 工作流",
    upvotes: 83,
    trending: false,
    tags: ["热点", "CMS", "成稿", "SEO", "内容创作"],
    howItWorks: [
      "订阅公开 RSS/热点源并去重选题",
      "生成中文草稿与 SEO 元数据，进入待审队列",
      "编辑通过后发布到 CMS，并可选飞书通知链接",
    ],
    tips: [
      "政治、医疗、财经类默认人工必审，禁止全自动公开",
      "正文注明信息来源链接，避免无出处断言",
    ],
    approach: `DEV.to 上作者公开了一条 n8n 新闻成稿管线：定时从 RSS 拉近 24 小时线索，按 niche 过滤主题后，用 AI 生成标题、导语、结构化正文、结论与 SEO 元数据，再配特色图，经 WordPress API 发布，并用跟踪层记录主题、发布日与 URL，以缓解重复发帖与泛化稿。公开文把重点放在「内容基础设施」而不是单篇文笔，并点名泛化内容、重复帖与 SEO 结构三类易坏点；全文未给出阅读量、收录或转化等量化。

国内落地时，默认把发布状态改成「待审/草稿」而非直接公开：RSS/热点源去重选题 → 生成中文草稿与 SEO 字段入待审队列 → 编辑核对事实、敏感表述与引语出处后再进博客/CMS，并可选用飞书通知成品链接。政治、医疗、财经类强制人工必审；正文保留源链接，禁止编造源里没有的数据或引语。`,
    outcomes: [
      "源未披露阅读量、收录、转化或人审通过率等量化；公开文只描述已接通「RSS→过滤→AI 成稿→配图→WordPress 发布→跟踪层」流水线。",
      "热点从口头选题+手工粘贴 CMS，变成可去重、可回看主题与 URL 的成稿队列。",
      "SEO 标题/描述与正文骨架同批生成，编辑只需在待审态核对事实后再公开。",
    ],
    caveats: [
      "公开源未给出实测流量或准确率，上线后需用自有选题与审稿台账复盘，勿把「流程跑通」当成效果承诺。",
      "禁止全自动公开；政治/医疗/财经默认必审；缺出处的断言与未出现在源里的引语一律删或标待核。",
      "跟踪层要防重复选题；换 CMS 租户或 API 凭据后，发布权限与「待审」默认态要重核。",
    ],
    prompts: [
      {
        title: "热点成稿待审草稿",
        body: `你是内容成稿助手。只根据给定新闻线索生成中文待审草稿，禁止编造未出现在线索里的数据、引语、机构表态或结论。

输出：
1) title：标题（不标题党）
2) lede：导语 80–120 字
3) body：结构化正文（背景/发生了什么/影响/待核实），分段
4) sources：线索里出现的链接或出处列表；无线索出处则写「待补链接」
5) risk_flags：政治/医疗/财经/未核实断言等需人工必审点

规则：不确定就写「待核实」，不要补全「合理推测」。

线索：
{{news_item}}`,
      },
      {
        title: "SEO 元数据草稿",
        body: `根据待审正文草稿生成 SEO 元数据，仅使用草稿已有事实。

输出：
- meta_title（建议 ≤60 字）
- meta_description（建议 ≤160 字）
- slug 建议（拼音或英文短横线，不带营销词）
- 禁止词检查：是否含绝对化承诺、未标注出处的数字

若草稿标有 risk_flags，在输出顶部加一行「须人工过审后再公开」。

待审草稿：
{{draft}}`,
      },
    ],
    primarySource: {
      url: "https://dev.to/grewup/automate-blog-publishing-with-n8n-ai-wordpress-full-workflowpublished-true-56cl",
      label: "DEV.to · Automate Blog Publishing with n8n + AI + WordPress (Full Workflow)",
      date: "2026-04-27",
      dateLabel: "发布",
    },
  },
  {
    id: "152",
    slug: "ai-qa-git-notes-persist",
    title: "AI 问答摘要沉淀进 Git 笔记库",
    summary:
      "把有价值的 AI 问答整理成结构化笔记并提交到 Git 仓库，形成可检索、可回滚的个人知识库。",
    description:
      "聊天里的好答案容易淹没。Agent 将选定对话整理为 Markdown（问题、结论、步骤、注意事项），按主题目录提交到 Git；支持检索与版本对比。适合个人效率与轻度开发者笔记。默认不提交密钥与客户原文；敏感内容先脱敏。",
    categories: ["efficiency", "devtools"],
    platforms: ["chatgpt", "claude", "deepseek", "grok"],
    sourceUrl: "https://news.ycombinator.com/item?id=50128580",
    sourceLabel: "Hacker News",
    upvotes: 78,
    trending: false,
    tags: ["Git", "笔记", "问答沉淀", "个人知识库", "效率"],
    howItWorks: [
      "标记值得保留的对话或粘贴问答原文",
      "生成结构化 Markdown 并选择主题目录",
      "提交到 Git 笔记库，可用日志查看历史版本",
    ],
    tips: [
      "提交信息写清「主题+日期」，方便 git log 检索",
      "仓库设私有，并在 pre-commit 扫描疑似密钥",
    ],
    approach: `Hacker News 评论里，作者 mindcrime 描述自己的习惯：想到问题时先向 AI 追问，再让它「把刚才讨论写成摘要并放进合适的 Git 仓库」；通过 GitHub MCP 接入自己的三四个仓库，每个仓库放 AGENTS.md，并给模型加自定义指令——会话开始或被提示时先读对应 AGENTS.md。仓库里保留讨论、决策与后续研究方向等文件，再在 AGENTS.md 里引用这些路径，让模型少依赖会话「记忆」。帖中未给出提交量、检索命中或节省时间等数字。

国内落地可把有价值的问答整理成 Markdown（问题、结论、步骤、注意事项），按主题目录提交到私有 Git 笔记库；提交信息写「主题+日期」，并用 pre-commit 扫描疑似密钥。默认不提交客户原文与密钥；敏感内容先脱敏。可用 git log / 对比查看历史版本，而不是把好答案留在聊天滚动区。`,
    outcomes: [
      "源未披露问答沉淀条数、检索命中率或节时等量化；公开评论只描述已接通「追问→摘要写入指定 Git 仓 + AGENTS.md/MCP 约束」。",
      "有价值的问答从聊天里易被淹没，变成可检索、可回滚的主题 Markdown。",
      "用 AGENTS.md 引用既有笔记路径后，后续会话可按仓库约定续写，而不是每次从零复述背景。",
    ],
    caveats: [
      "公开源未给出实测准确率或仓库规模数据，上线后需用自有对话样本复盘，勿把「能提交」当成知识质量承诺。",
      "仓库宜私有；提交前脱敏；pre-commit 扫描密钥与客户原文。",
      "模型仍可能写错路径或覆盖文件：重要笔记先开分支或先 diff 再合并。",
    ],
    prompts: [
      {
        title: "问答沉淀 Markdown",
        body: `你是 AI 问答沉淀助手。只根据给定对话整理笔记，禁止编造对话里未出现的结论、命令或链接。

输出 Markdown：
# 标题
- 日期：
- 主题标签：
## 问题
## 结论（3–7 条）
## 步骤/命令（原文有则保留，无则写「无」）
## 注意事项与未决问题
## 脱敏声明（是否已去掉密钥/客户名）

若检测到疑似密钥或客户原文，先改写为占位符并在注意事项里标明。

对话：
{{qa_transcript}}`,
      },
      {
        title: "Git 提交说明",
        body: `根据笔记标题与主题标签，写一条一行 git commit message：格式「主题+日期+简述」。不要包含密钥、邮箱或客户真名。若笔记标记未脱敏，输出「拒绝提交：先脱敏」而不要写 message。

笔记抬头：
{{note_header}}`,
      },
    ],
    primarySource: {
      url: "https://news.ycombinator.com/item?id=50128580",
      label: "HN · comment 50128580（AI 摘要写入 Git 仓 + AGENTS.md）",
      date: "2026-10-17",
      dateLabel: "讨论",
    },
  },
  {
    id: "153",
    slug: "seo-browse-audit-agent",
    title: "浏览型 Agent 网站 SEO 巡检",
    summary:
      "用浏览型 Agent 抽查站点标题、描述、链接与核心页体验，输出可执行的 SEO 问题清单。",
    description:
      "独立站与内容站需要定期巡检，而不是只改商品标题。Agent 打开公开页面，检查 title/description、标题层级、死链、移动端可读性等，生成优先级清单推送到飞书。与「店铺 listing SEO 文案」不同：本条是整站/栏目级巡检报告。不做黑帽或伪造流量建议；不编造未测到的排名数字。",
    categories: ["content", "efficiency"],
    platforms: ["chatgpt", "claude", "n8n", "feishu"],
    sourceUrl: "https://github.com/dannwaneri/seo-agent",
    sourceLabel: "GitHub · seo-agent",
    upvotes: 81,
    trending: false,
    tags: ["SEO", "巡检", "浏览Agent", "内容站", "飞书"],
    howItWorks: [
      "配置站点地图或重点 URL 列表",
      "浏览型 Agent 抽样检查并记录问题",
      "输出分级清单，推送飞书/文档供运营排期",
    ],
    tips: [
      "先修高流量落地页，再铺全站，避免清单过长无人跟",
      "对比上次报告做增量，只强调新增与未关闭项",
    ],
    approach: `GitHub 开源项目 seo-agent 用真实 Chromium（Browser Use）打开页面，经 Claude 抽取 title、meta description、H1、canonical，异步检查同域死链，结果增量写入 report.json，并生成英文摘要 report-summary.txt；另有外链评分、Search Console 导出快赢/蚕食、内链相关度、主题簇孤儿页、SERP 特征与多引擎引用可见性等独立模块。README 写明作者在自有站点跑过后的发现（标题蚕食首页、某查询约 position 9.5 且 CTR 为 0%、两处缺内链、一个无入口孤儿页），但未给出全站通过率或流量提升幅度。

国内落地可配置站点地图或重点 URL，浏览型 Agent 抽样检查后输出分级问题清单，推送到飞书/文档供运营排期；先修高流量落地页，再与上次报告做增量对比。不做黑帽或刷量建议；未实测的排名数字不要写进对外承诺。登录墙、404 等边界应标「待人工」而不是假装已审。`,
    outcomes: [
      "作者自述：在自有站点跑通后，发现标题蚕食首页、一条约 position 9.5 且 CTR 0% 的查询、两处缺失内链，以及一个无路径孤儿页（README 陈述，非第三方审计）。",
      "源未披露全站 PASS 率、修复后流量或排名提升等量化；公开材料以模块能力与单次自测发现为主。",
      "巡检从手工点开页面，变成可中断续跑的结构化报告（按 URL 记 title/描述/H1/canonical/死链等），便于推飞书排期。",
    ],
    caveats: [
      "作者数字来自自有站点自述，换站后不可直接外推；上线需用自有 GSC/日志复盘。",
      "不编造未测到的排名；不做黑帽。付费 SERP/多引擎模块受 API 配额与个别引擎失败影响。",
      "清单过长易无人跟：先高流量页，再增量对比未关闭项。",
    ],
    prompts: [
      {
        title: "SEO 巡检分级清单",
        body: `你是网站 SEO 巡检助手。只根据给定的逐 URL 检查结果生成分级清单，禁止编造未出现的排名、流量或 CTR。

输出：
- P0：影响抓取/索引或明显损坏（缺 title、大面积死链、错误 canonical 等）
- P1：高流量候选页的描述/H1/内链问题
- P2：其余优化项
每条含：URL、问题、证据字段、建议动作（一句话）
文末列「未测/待人工」项。

检查结果：
{{audit_rows}}`,
      },
      {
        title: "飞书增量巡检摘要",
        body: `对比「本次清单」与「上次未关闭项」，写一段可贴飞书的短摘要：新增问题数、仍未关闭数、建议本周只修的前 5 条（优先高流量页）。不要添加未在两次清单出现的排名承诺。

本次：
{{current_list}}

上次未关闭：
{{previous_open}}`,
      },
    ],
    primarySource: {
      url: "https://github.com/dannwaneri/seo-agent",
      label: "GitHub · dannwaneri/seo-agent（浏览型 SEO 巡检）",
      date: "2026-03-30",
      dateLabel: "仓库创建",
    },
  },
  {
    id: "154",
    slug: "lead-score-outreach-drafts",
    title: "评分销售线索画像与外联草稿",
    summary:
      "根据公开信息为线索打分并生成中文外联草稿，推送到飞书/企微供销售编辑后发送。",
    description:
      "销售要在海量线索里找值得跟的。Agent 汇总公开公司/岗位信息，按拟合度打分，输出一页画像与可编辑外联邮件/企微话术；高分线索推送责任人。默认不自动群发；不编造对方未公开的营收与联系方式。与「竞品广告日研报」不同：对象是潜在客户线索而非广告素材。",
    categories: ["enterprise", "efficiency"],
    platforms: ["feishu", "wecom", "chatgpt", "claude"],
    sourceUrl: "https://cashandcache.substack.com/p/i-used-gemini-to-find-sales-leads",
    sourceLabel: "Substack · 销售线索实践",
    upvotes: 85,
    trending: false,
    tags: ["销售线索", "打分", "外联", "飞书", "企微"],
    howItWorks: [
      "导入线索名单与评分规则（行业、规模信号、岗位）",
      "补充公开信息并生成画像与外联草稿",
      "高分项推飞书/企微，销售编辑后人工发送",
    ],
    tips: [
      "评分维度写进表格，方便复盘「高分却不成交」原因",
      "外联遵守对方地区的营销合规与退订要求",
    ],
    approach: `Substack《Cash & Cache》一文里，作者用 Gemini Deep Research、NotebookLM 与 Google Sheets 搭销售研究管线：先自备供给定位与 0–16 分资格框架（预算能力、需求强度、时机、可达性，各 0–4），再对已圈定的公司跑「Research / Score」两类指令，产出加权情报简报、决策人画像、带证据的分数与不足 80 词的个性化外联草稿。作者自述：旧法每家至少约 45 分钟多标签切换；管线对三家公司实测，自定义 Gem 两步可在约 20 分钟内给出评分画像+外联稿；Deep Research 每家约 7–10 分钟、引用约 50–100+ 源；三家示例分约为 14/16、13/16、9/16。公开可读部分未给出回复率或签约率。

国内映射：导入线索与评分规则表，只补充公开信息生成一页画像与中文外联邮件/企微话术，高分项推飞书/企微，销售编辑后人工发送。默认不自动群发；不编造未公开营收与联系方式；外联遵守属地营销与退订要求；评分维度落表以便复盘「高分却不成交」。`,
    outcomes: [
      "作者自述：在 Google 生态内用自定义 Gem 两步，对已圈定公司产出「评分画像+外联草稿」，自称约 20 分钟内完成；并在三家公司上试跑（示例分约 14/16、13/16、9/16）。",
      "作者自述对比：旧法每家公司公开信息收集至少约 45 分钟且笔记分散；Deep Research 单家约 7–10 分钟、引用约 50–100+ 源（均为文中自述，非第三方审计）。",
      "源未披露外联回复率、会议率或签约率；公开文重点是研究→打分→草稿的流程与框架，而非成交 KPI。",
    ],
    caveats: [
      "文中分钟数、三家得分与引用来源数为作者自述；换行业/供给后分数不可直接当资质证明。",
      "默认禁止自动群发；不编造对方未公开的营收、邮箱或电话；外联须合规与可退订。",
      "管线放大的是「已有目标清单」，不是开放式找客；无资格框架时模型容易写出漂亮但无用的长报告。",
    ],
    prompts: [
      {
        title: "线索评分画像",
        body: `你是销售线索研究助手。只根据给定的公开资料与评分规则打分，禁止编造未出现的营收、融资、联系方式或职衔。

评分维度（各 0–4，总分 0–16）：预算能力 / 需求强度 / 时机 / 可达性。每维必须引用资料中的可观察证据；无证据则该维 ≤1 并写「证据不足」。

输出：
- 公司一页画像
- 四维分数与证据
- 总分与建议（立即跟进 / 观察 / 暂缓）
- 决策人候选（仅限资料出现的姓名与公开岗位）
- open_questions

公开资料：
{{public_research}}

评分规则：
{{score_rubric}}`,
      },
      {
        title: "外联草稿（人工待发）",
        body: `根据画像与决策人公开言论/文章，写一则中文外联草稿（邮件或企微均可），≤120 字。要求：提及可核验的公开点；不承诺效果；不索取敏感数据；文首标注「草稿·勿群发」。若缺少可核验钩子，输出「暂缓外联：缺公开钩子」而不要硬写。

画像：
{{lead_profile}}`,
      },
    ],
    primarySource: {
      url: "https://cashandcache.substack.com/p/i-used-gemini-to-find-sales-leads",
      label: "Substack · How I Built a Sales Research Pipeline Entirely Inside Google's Ecosystem",
      date: "2026-05-22",
      dateLabel: "发布",
    },
  },
  {
    id: "155",
    slug: "pm-noncoder-feature-prototype",
    title: "非编程产品经理用 Agent 原型功能",
    summary:
      "产品经理用自然语言描述需求，让编码 Agent 拉出可点击原型或演示页，便于评审与对齐。",
    description:
      "非编程 PM 常卡在「讲不清交互」。把用户故事与验收标准交给编码 Agent，生成最小可演示前端或流程原型，再拿去评审；工程正式排期仍由研发接手。强调可演示而非生产就绪：无真实密钥、无连生产库。适合职场协作与需求澄清。",
    categories: ["career", "efficiency"],
    platforms: ["chatgpt", "claude", "deepseek", "doubao"],
    sourceUrl: "https://amankhan1.substack.com/p/cursor-for-product-managers",
    sourceLabel: "Substack · PM 用编码工具",
    upvotes: 82,
    trending: false,
    tags: ["产品经理", "原型", "需求澄清", "职场", "非编程"],
    howItWorks: [
      "写清用户故事、主路径与非目标",
      "Agent 生成可本地打开的演示原型",
      "评审记录问题清单，再交研发正式实现",
    ],
    tips: [
      "原型标注「仅演示」，避免干系人误当成上线范围",
      "每次只原型一个主路径，防止范围爆炸",
    ],
    approach: `Substack 上 Eric Xiao / Aman Khan 的《Cursor for Product Managers》面向不怎么写代码的产品经理：把文档与代码放进编码 Agent 工作区，用 AGENTS.md 固化产品上下文与行为规则，经 Ask / Plan / Agent 模式做分析、ASCII 线框脑暴，再「先出计划、批准后实现」拉出可点击原型；可用 worktree/分支并行试多个方案。文中作者自述：分析一批应用商店评论约 30 秒能出高频槽点与示意；并称大约半小时可摸到可运行原型。公开文强调演示与对齐，不是生产交付，也未给出上线缺陷率或人天数对比的第三方数据。

国内落地：PM 写清用户故事、主路径与非目标，交给编码 Agent 生成可本地打开的演示页；评审记问题清单后再交研发正式实现。原型标注「仅演示」，无真实密钥、不连生产库；每次只原型一个主路径。可用飞书/文档贴截图与问题清单做评审纪要。`,
    outcomes: [
      "作者自述：按文中路径，大约半小时可摸到可运行的工作原型；另称对一批应用商店评论做分析约 30 秒可出高频结论与示意（均为文中自述，非第三方测评）。",
      "源未披露评审一次通过率、节省人天或上线缺陷对比等量化。",
      "需求对齐从「只靠文档想象交互」，变成可点击/可本地打开的最小演示，再带着问题清单交研发。",
    ],
    caveats: [
      "半小时/30 秒等为作者场景自述，换代码库复杂度后耗时会变；勿当成团队 KPI。",
      "原型≠上线范围：标注「仅演示」，禁连生产库与真实密钥；正式实现仍由研发接手。",
      "一次只做一个主路径；范围爆炸时先停在 Plan 模式对齐，再写代码。",
    ],
    prompts: [
      {
        title: "用户故事→原型计划",
        body: `你是产品原型策划助手。根据用户故事输出「仅演示」范围的实现计划，禁止引入真实密钥、生产数据库或未提及的账号体系。

输出：
1) 主路径步骤
2) 非目标（明确不做）
3) 页面/状态列表
4) 验收标准（可观察）
5) 风险与待 PM 确认点

用户故事：
{{user_story}}`,
      },
      {
        title: "评审问题清单",
        body: `根据演示说明与体验记录，整理给研发的评审问题清单：交互歧义、缺态、文案、无障碍。每条含：现象、期望、优先级（高/中/低）。不要把演示范围写成上线承诺；文首写「原型评审·非正式排期」。

演示说明：
{{demo_notes}}`,
      },
    ],
    primarySource: {
      url: "https://amankhan1.substack.com/p/cursor-for-product-managers",
      label: "Substack · Cursor for Product Managers（Eric Xiao / Aman Khan）",
      date: "2026-01-05",
      dateLabel: "发布",
    },
  },
  {
    id: "156",
    slug: "github-week-to-tech-blog",
    title: "一周 GitHub 动态生成技术博文",
    summary:
      "汇总一周的提交与 PR 说明，生成可发布的技术博文草稿，经作者润色后发到博客或社区。",
    description:
      "独立开发者与开源维护者周更常断更。多 Agent 或工作流读取公开仓库的 commit/PR 摘要，整理成「本周做了什么、为什么、踩坑」中文草稿，作者补截图与观点后再发。不泄露私有仓库与未公开安全细节；不把自动生成稿冒充深度长文而不审。",
    categories: ["content", "devtools"],
    platforms: ["chatgpt", "claude", "n8n", "deepseek"],
    sourceUrl:
      "https://dev.to/yashksaini/i-built-a-3-agent-pipeline-that-turns-my-github-activity-into-weekly-blog-posts-on-notion-devto-1ndn",
    sourceLabel: "DEV.to · GitHub 活动周更流水线",
    upvotes: 80,
    trending: false,
    tags: ["GitHub", "技术博文", "周更", "独立开发者", "内容"],
    howItWorks: [
      "拉取本周公开 commit/PR 标题与说明",
      "生成结构化博文草稿（进展/动机/下一步）",
      "作者润色并发布，归档到笔记或 CMS",
    ],
    tips: [
      "过滤 chore/依赖升级噪音，突出用户可见变化",
      "涉及未修复漏洞的 commit 不要写进公开稿",
    ],
    approach: `DEV.to 上作者公开了 DevNotion：用 Mastra 串起三条专责流水线——Harvest 经 GitHub GraphQL 拉本周 commit/PR/issue/review 等结构化数据（确定性、不走 LLM）；Narrate 用 Gemini 写成第一人称周记（失败则确定性模板兜底）；Publish 同步建 Notion 规划页（统计表+全文）并把 DEV.to 文章建为草稿。GitHub Actions 周日定时或手动触发；收割与发布不做模型推理，降低幻觉与费用。公开文未给出阅读量、关注增长或与手写稿对比等量化。

国内落地可拉取本周公开仓库的 commit/PR 标题与说明，过滤 chore/依赖升级噪音后，生成「进展/动机/踩坑/下一步」中文草稿，作者补截图与观点再发博客或社区，并归档到飞书文档/笔记或 CMS。私有仓与未公开安全细节默认不进稿；未修复漏洞相关提交不要写进公开文。`,
    outcomes: [
      "源未披露自动稿阅读量、互动或与手写稿对比等量化；公开文只描述已接通「Harvest→Narrate→Publish（Notion 规划页 + DEV.to 草稿）」周更流水线。",
      "作者自述：叙述稿偏向中长篇、约 7–10 分钟阅读量级；流水线以草稿待审为主，最终公开仍可人工增删与配图（评论区自述）。",
      "周一「上周做了什么」从凭记忆拼凑，变成可回看的结构化周动态 + 待润色博文草稿。",
    ],
    caveats: [
      "公开源未给出实测流量或续更留存，上线后需用自有周更台账复盘，勿把「流水线跑通」当成传播效果承诺。",
      "过滤 chore/噪音；涉及未修复漏洞的 commit 禁止进公开稿；私有仓与密钥日志不要喂给叙述步骤。",
      "模型叙述可能夸大或漏掉关键 PR：发布前作者必审事实与语气；Notion/DEV/飞书凭据与发布权限换租户后要重核。",
    ],
    prompts: [
      {
        title: "周更博文待审草稿",
        body: `你是技术周更助手。只根据给定的本周公开 GitHub 活动生成中文待审草稿，禁止编造未出现的功能、性能数字、用户评价或未合并的 PR 结果。

输出 Markdown：
# 标题
## 本周做了什么（按用户可见变化优先）
## 为什么这样做
## 踩坑与取舍
## 下一步
文末列「已忽略的 chore/依赖噪音」与「需作者补截图/链接」清单。

规则：过滤纯格式化与依赖升级；涉及安全漏洞且未修复的条目输出「跳过并标记」而不要展开细节。

本周活动 JSON：
{{weekly_github}}`,
      },
      {
        title: "飞书周更归档摘要",
        body: `根据已润色的博文草稿，写一段可贴飞书文档的短摘要（≤200 字）：本周主题、1–3 个用户可见变化、待办下一步。不要添加草稿里没有的指标。若草稿含未审安全细节，改为「需作者删改后再归档」。

草稿：
{{blog_draft}}`,
      },
    ],
    primarySource: {
      url: "https://dev.to/yashksaini/i-built-a-3-agent-pipeline-that-turns-my-github-activity-into-weekly-blog-posts-on-notion-devto-1ndn",
      label: "DEV.to · Turning Weekly GitHub Activity Into Blog Posts on Notion + DEV.to",
      date: "2026-03-27",
      dateLabel: "发布",
    },
  },
  {
    id: "157",
    slug: "safe-daily-seo-fix-agent",
    title: "每日安全级 SEO 修复自动化",
    summary:
      "按白名单每天自动做可回滚的小 SEO 修复（元描述、内链、图片 alt），改动进 PR 或草稿，人工合并。",
    description:
      "与整站巡检报告不同：本条把「已确认低风险」的修复做成日更流水线——例如补缺 meta、修正明显死链、补 alt。Agent 只改白名单路径，产出可回滚的 PR/草稿，并在飞书汇报变更摘要。禁止改写核心转化文案与大规模删改。不编造排名提升数字。",
    categories: ["content", "efficiency"],
    platforms: ["chatgpt", "claude", "n8n", "feishu"],
    sourceUrl:
      "https://www.developersdigest.tech/blog/codex-automations-recurring-engineering-work",
    sourceLabel: "DevelopersDigest · 循环工程自动化",
    upvotes: 79,
    trending: false,
    tags: ["SEO", "日更修复", "可回滚", "内容站", "飞书"],
    howItWorks: [
      "维护可自动修复的规则白名单与禁止改动目录",
      "每日扫描并提交小修复 PR/草稿",
      "飞书通知变更列表，人工合并或回滚",
    ],
    tips: [
      "单日改动文件数设上限，避免「修复」变成大爆炸",
      "与 153 巡检联动：只把巡检里标为「安全可自动」的项进白名单",
    ],
    approach: `DevelopersDigest 文《Codex Automations》把「定时跑一句提示」与「有稳定输入、可审输出、安全边界的循环工程活」区分开，并给出 SEO Compounding Pass 示例：每个工作日回看分析与 SEO-DAILY.md 等材料，挑出约五件当日可安全完成的高影响改进，优先内链、元数据、来源新鲜度、对比页路由与高流量陈旧页；默认先报告、低风险才起草改动，不擅自发布/推送/合并。文中还强调验证命令、证据轨迹与错误频率。公开文未给出排名、点击或收录的量化前后对比。

国内落地应对齐「安全级日修」而不是整站巡检报告：维护可自动修复白名单与禁止目录，每日只补缺 meta、明显死链、图片 alt 等可回滚小改，产出 PR/草稿，飞书通知变更摘要后人工合并；与巡检题（只出问题清单）分流——仅把标成「安全可自动」的项进白名单。禁止改写核心转化文案与大规模删改；不编造排名提升。`,
    outcomes: [
      "源未披露排名、CTR、收录或日修通过率等量化；公开文只描述循环自动化原则，并以「每日约五件安全 SEO 改进 + 先报告后改」为例。",
      "SEO 小修复从偶发手工改，变成有白名单、可回滚、可在飞书审变更列表的日更队列。",
      "与整站巡检分工后：巡检负责发现，本流水线只执行已确认低风险项，降低「一次大爆炸改站」风险。",
    ],
    caveats: [
      "公开源未给出实测流量或排名数据，上线后需用自有 Search Console/日志复盘，勿把「日任务跑通」当成效果承诺。",
      "单日文件数设上限；核心转化文案与禁止目录不得自动改；合并前必看 diff。",
      "换仓库、CMS 或飞书机器人后，权限、白名单与回滚路径要重核；无验证命令的改动视为仅草稿。",
    ],
    prompts: [
      {
        title: "安全级 SEO 日修提案",
        body: `你是安全级 SEO 日修助手。只根据「巡检/分析摘录 + 白名单规则」提出当日可自动的小修复，禁止编造排名、流量或未出现的页面问题。

输出：
1) 拟改列表（每条：路径、改动类型 meta/内链/alt/死链、原证据、补丁摘要）
2) 跳过项及原因（不在白名单/属转化文案/证据不足）
3) 风险标记：是否需人工必审
约束：不超过 {{max_files}} 个文件；不改禁止目录；不写营销承诺句。

白名单：
{{whitelist}}

今日输入：
{{daily_inputs}}`,
      },
      {
        title: "飞书变更摘要",
        body: `根据拟合并的 SEO 小修复 PR/草稿，写一段飞书通知：改了哪些路径、类型统计、如何回滚、是否已跑验证命令。不要添加未在 diff 出现的排名承诺。若超过单日文件上限，输出「拒绝通知：先拆分」。

变更说明：
{{change_summary}}`,
      },
    ],
    primarySource: {
      url: "https://www.developersdigest.tech/blog/codex-automations-recurring-engineering-work",
      label: "DevelopersDigest · Codex Automations: Where Scheduled AI Agents Actually Help",
      date: "2026-05-05",
      dateLabel: "发布",
    },
  },
  {
    id: "158",
    slug: "micro-saas-three-hour-ship",
    title: "三小时构建上线微型 SaaS",
    summary:
      "用编码 Agent 在数小时内搭出可演示的微型 SaaS：登录、一个核心功能与部署，先上线再迭代。",
    description:
      "独立开发者验证想法时，容易在脚手架上耗尽热情。限定范围（单一用户故事），让 Agent 生成最小前后端、基础鉴权与部署配置，先拿到可分享链接。支付与合规后置；不宣称真实收入数字。适合周末验证与作品集。",
    categories: ["devtools", "efficiency"],
    platforms: ["chatgpt", "claude", "deepseek", "n8n"],
    sourceUrl:
      "https://dev.to/willcheung/i-built-and-deployed-a-micro-saas-in-3-hours-heres-what-i-learned-cd6",
    sourceLabel: "DEV.to · 3 小时微型 SaaS",
    upvotes: 84,
    trending: false,
    tags: ["微型SaaS", "独立开发者", "快速上线", "MVP", "编码Agent"],
    howItWorks: [
      "写清唯一核心功能与非目标清单",
      "Agent 生成可部署骨架并完成本地/云端试跑",
      "发布演示链接，收集反馈后再扩支付与权限",
    ],
    tips: [
      "三小时只做一条主路径，登录可用魔法链接或 OAuth 二选一",
      "演示环境与生产密钥隔离，避免周末项目泄漏正式凭据",
    ],
    approach: `DEV.to 上作者（自称偏技术的非专职工程师）记述用付费档 Replit Agent 在约三小时内做出可上线的微型 SaaS「Calendar Autobot」：把邮件/图片里的行程抽成事件写入 Google 日历；栈为 Python/Flask/PostgreSQL，并接 OpenAI、Google OAuth、Mailgun。文中强调生产不止写代码（库、域名、托管、部署、监控），Replit 一键部署省掉多工具拼接；同时承认 OAuth/第三方集成易循环膨胀、需贴官方文档纠偏，且加邮件能力超出了三小时目标。公开文未给出收入、留存或付费转化数字。

国内落地验证想法时：先写清唯一核心功能与非目标清单，让编码 Agent 生成最小前后端、基础鉴权与部署配置，先拿到可分享演示链接，再迭代；支付与合规后置。演示环境与生产密钥隔离；可用飞书文档记录演示 URL、已知缺陷与下周只扩的一条能力。不宣称真实收入。`,
    outcomes: [
      "作者自述：在约 3 小时目标内做出可部署的 Calendar Autobot；起始提示即可到「约 70%」骨架；若纯手写同类能力，作者估计可能要 3–4 周（文中自述，非第三方测评）。",
      "源未披露收入、MRR、留存或付费转化等量化；公开文明确不是逐步教程，而侧重上线体验与坑点。",
      "想法验证从「搭脚手架耗尽热情」，变成先有可点击演示链接，再决定是否加支付与权限。",
    ],
    caveats: [
      "作者耗时与「70%/3–4 周」均为个人自述，换题目与工具后不可外推；勿写成普遍交付承诺。",
      "三小时只做一条主路径；OAuth/邮件等集成易让 Agent 原地打转，需人工贴文档纠偏并关闭盲目自动发布。",
      "演示与生产密钥、数据库隔离；不编造收入数字；涉及用户邮件内容时注意隐私与授权。",
    ],
    prompts: [
      {
        title: "三小时 MVP 范围卡",
        body: `你是微型 SaaS 范围助手。根据想法描述输出一张「三小时可交付」范围卡，禁止发明未提到的付费套餐、客户 logo 或收入目标。

输出：
- 唯一用户故事（一句话）
- 必须有：登录方式（魔法链接或 OAuth 二选一）、一个核心功能、部署形态
- 非目标清单（支付/权限/多租户等默认后置）
- 验收：怎样算「可分享演示链接」
- 风险：最可能超时的集成点

想法：
{{idea}}`,
      },
      {
        title: "演示发布检查清单",
        body: `根据当前仓库/部署说明，生成上线前检查清单（中文短句）：环境变量是否含生产密钥、演示库与生产库是否分离、OAuth 回调是否指向演示域、错误日志如何查看、飞书/文档中的演示链接与已知缺陷是否已登记。缺信息处写「待补」不要猜测。

材料：
{{ship_notes}}`,
      },
    ],
    primarySource: {
      url: "https://dev.to/willcheung/i-built-and-deployed-a-micro-saas-in-3-hours-heres-what-i-learned-cd6",
      label: "DEV.to · I Built and Deployed a Micro-SaaS in 3 Hours — Here's What I Learned",
      date: "2025-08-31",
      dateLabel: "发布",
    },
  },
  {
    id: "159",
    slug: "airline-fee-refund-email-finder",
    title: "航司餐饮费报销邮件挖掘",
    summary:
      "在邮箱里找出可申请航司餐饮/延误相关报销的邮件与订单号，生成申请材料清单与话术草稿。",
    description:
      "出行后常忘记哪些航段可申补偿。Agent 检索邮箱中的航司通知与支付凭证，列出可能符合公开政策的条目，并整理申请入口、材料与中文话术；提交仍由用户完成。不保证一定获批；不教伪造行程。可把清单同步到飞书待办。",
    categories: ["life", "efficiency"],
    platforms: ["chatgpt", "claude", "n8n", "feishu"],
    sourceUrl: "https://news.ycombinator.com/item?id=49619764",
    sourceLabel: "Hacker News",
    upvotes: 76,
    trending: false,
    tags: ["航司", "报销", "邮件挖掘", "生活办事", "出行"],
    howItWorks: [
      "按航司/关键词检索相关邮件与附件",
      "生成候选清单与材料核对表",
      "输出申请话术草稿，用户确认后自行提交",
    ],
    tips: [
      "先核对航司公开政策时效，过期航班不要浪费时间",
      "护照与银行卡信息只放本地清单，勿贴进群聊",
    ],
    approach: `Hacker News 评论里，用户 yalok 讲述家庭出行中航司改期后餐饮附加费未自动结转，人工客服无法当场处理、只能自行网上申请；拖到数月后才用个人 AI 助手检索邮箱，结果在改期当日大量通知里翻出「餐饮费用已报销」的确认邮件——先前因通知轰炸而漏看。帖中未给出报销金额、成功率或平均检索耗时等统计，重点是「邮件里其实已有结论，人却找不到」。

国内落地可按航司/关键词检索邮箱中的航司通知与支付凭证，生成可能符合公开政策的候选清单、材料核对表与中文申请话术；提交仍由用户完成，并可把清单同步到飞书待办。不保证获批；不教伪造行程；护照与银行卡信息只留本地，勿贴进群。`,
    outcomes: [
      "源未披露报销金额、获批率或平均节省时间等量化；公开评论以单次轶事说明「助手翻出已报销确认邮件」。",
      "作者自述：助手在 SAS 相关邮件中找到与改期同日的餐饮费报销确认，而自己自夏季改期后一直没抽出时间处理或核对这些通知。",
      "出行补偿从「记得再申请」变成可勾选的候选清单 + 材料表 + 话术草稿，降低漏看通知的概率。",
    ],
    caveats: [
      "单条轶事不可外推为各航司政策或工具成功率；上线后用自有航班样本复盘。",
      "先核对航司公开政策与时效；过期航段不要空耗；不教伪造行程或虚假延误证明。",
      "邮箱授权与隐私需用户明确同意；证件与支付信息勿进群聊；飞书待办只放脱敏字段。",
    ],
    prompts: [
      {
        title: "航司报销候选清单",
        body: `你是出行报销邮件整理助手。只根据给定邮件/订单摘要列出候选，禁止编造未出现的航班号、金额、政策条款或「一定可退」结论。

输出表格列：日期、航司、航段/订单号、邮件主题要点、可能类型（餐饮费/延误/改期差额等）、已有凭证、建议下一步（申请/仅归档/已确认已赔）、风险（过期/证据不足）。
文末列「需用户打开原邮核对」项。

邮件摘要：
{{mail_digests}}`,
      },
      {
        title: "申请话术与飞书待办",
        body: `根据用户勾选的候选条目，生成：1) 中文申请话术草稿（礼貌、只引用给定事实）；2) 材料核对表；3) 一条可粘贴飞书待办的一句话（含航司+订单号脱敏尾号）。若政策时效可能已过，草稿开头写「请先人工核对政策截止日期」。禁止填写护照全号或完整银行卡号。

候选：
{{selected_items}}`,
      },
    ],
    primarySource: {
      url: "https://news.ycombinator.com/item?id=49619764",
      label: "HN · comment 49619764（Muse 检索航司餐饮费报销邮件轶事）",
      date: "2026-09-09",
      dateLabel: "讨论",
    },
  },
  {
    id: "160",
    slug: "billing-dispute-refund-agent",
    title: "账单争议退款办理助手",
    summary:
      "针对错误扣款或未授权订阅，整理时间线、证据与客服/支付渠道争议话术，协助走完退款流程。",
    description:
      "与「订阅取消路径」不同：本条面向已经扣款、需要争议或退款的情况。Agent 帮你整理交易时间线、截图清单、商家客服与支付渠道话术；浏览器辅助仅导航，提交争议前必须人确认。不教恶意拒付；优先走商家协商。",
    categories: ["life", "efficiency"],
    platforms: ["chatgpt", "claude", "grok", "doubao"],
    sourceUrl: "https://news.ycombinator.com/item?id=49656053",
    sourceLabel: "Hacker News",
    upvotes: 77,
    trending: false,
    tags: ["账单争议", "退款", "扣款", "生活办事", "客服话术"],
    howItWorks: [
      "录入扣款记录与沟通历史，生成时间线",
      "列出证据清单与分渠道话术（商家/支付/银行）",
      "按步骤协助办理，关键提交需人工确认",
    ],
    tips: [
      "先商家客服、再支付渠道、最后银行，减少误伤信用",
      "所有回复保存工单号，便于升级",
    ],
    approach: `Hacker News 评论里，用户 dbbk 提到在 Vercel 侧认为账单有误时，对端支持 Agent 自行整理并主动提出退款方案，以此说明大量支持单适合先自动处理、复杂单再转人工。帖中未披露退款金额、争议类型细目或处理时长，也不是教用户如何「恶意拒付」的操作手册。

国内落地面向已扣款、需要争议或退款的场景（区别于「订阅取消路径」）：协助整理交易时间线、截图/邮件证据清单，以及商家客服、支付渠道、银行/发卡行的分阶段中文话术；浏览器最多辅助导航，提交争议或签名前必须人确认。优先商家协商；不教恶意拒付；工单号与回复可记在飞书/备忘便于升级。`,
    outcomes: [
      "源未披露退款金额、成功率或平均处理时长等量化；公开评论只描述一次「账单争议中支持 Agent 主动提出退款」的体验。",
      "争议材料从聊天里零散截图，变成可跟进的时间线 + 分渠道话术 + 证据核对表。",
      "办理顺序可固定为先商家、再支付渠道、最后银行，降低一上来拒付带来的误伤风险。",
    ],
    caveats: [
      "单次轶事不能外推为各商家政策或自动退款承诺；上线后用自有账单样本复盘。",
      "不教恶意拒付或伪造证据；关键提交（争议表单、银行申请）必须人工确认。",
      "保存工单号与原邮；换支付机构后话术与入口要重核；勿在群聊粘贴完整卡号。",
    ],
    prompts: [
      {
        title: "扣款争议时间线",
        body: `你是账单争议整理助手。只根据用户提供的扣款与沟通记录生成时间线，禁止编造未提供的金额、商户承诺或法律结论。

输出：
1) 时间线（日期–事件–证据链接/截图名）
2) 争议要点（用户主张 vs 已知商户回复）
3) 证据缺口清单
4) 建议顺序：商家客服 → 支付渠道 → 银行（每步一句话目的）
若信息不足以判断「错误扣款」，明确写「待补材料，勿提交争议」。

记录：
{{billing_records}}`,
      },
      {
        title: "分渠道话术草稿",
        body: `根据时间线生成三套可编辑中文话术：商家客服、支付渠道、银行/发卡行。只引用给定事实；语气坚决但不侮辱；每套含：问题简述、期望（退款/更正账单）、已附证据列表、工单号留白。禁止指导伪造消费或规避合法订阅条款。若用户标记「仅草稿」，文首加「须人工确认后再发送」。

时间线：
{{timeline}}`,
      },
    ],
    primarySource: {
      url: "https://news.ycombinator.com/item?id=49656053",
      label: "HN · comment 49656053（Vercel 账单争议中支持 Agent 提出退款）",
      date: "2026-09-11",
      dateLabel: "讨论",
    },
  },
  {
    id: "161",
    slug: "vet-charge-to-insurance-claim",
    title: "宠物医疗费用整理成保险理赔材料",
    summary:
      "把宠物医院账单与病历摘要整理成保险理赔所需材料包与填写草稿，减少漏项退回。",
    description:
      "宠物险理赔常因材料不全被退回。Agent 读取账单/诊断摘要（用户上传），对照保单公开条款字段，生成材料清单、事件经过草稿与费用表；用户核对后自行提交保险公司。不编造诊断；不承诺一定赔付。可将材料包索引存飞书文档。",
    categories: ["life", "efficiency"],
    platforms: ["chatgpt", "claude", "doubao", "feishu"],
    sourceUrl: "https://github.com/jagberg/Me.OpenClaw",
    sourceLabel: "GitHub · Me.OpenClaw",
    upvotes: 75,
    trending: false,
    tags: ["宠物险", "理赔", "账单整理", "生活办事", "材料包"],
    howItWorks: [
      "上传账单、病历摘要与保单关键页",
      "抽取费用项并对照理赔字段生成材料清单",
      "输出经过说明草稿，用户确认后提交保险公司",
    ],
    tips: [
      "发票抬头与芯片号/病历号务必一致，否则易被拒",
      "既往症相关表述让兽医原文为准，勿让模型改写诊断",
    ],
    approach: `GitHub 仓库 Me.OpenClaw 描述的是一套面向家庭宠物险的个人助理流水线：银行交易 CSV 人工上传（仪表盘或 Telegram 文档），关键词/模型识别兽医消费后建理赔单；再到 Gmail 匹配发票（含扫描件视觉 OCR、金额上限与日期门禁）；用发票可赔小计（剔常规护理项）填 Petcover PDF，并生成「仅草稿」的理赔邮件（含表单与发票附件）；状态机跟踪保险公司回执与结算核对。三条硬边界写进 README：永不自动发送邮件、永不存银行登录、不确定字段只提问不猜。

国内落地可改成：用户上传就诊账单/病历摘要与保单关键页 → Agent 对照公开理赔字段产出材料清单、事件经过草稿与费用表 → 材料包索引进飞书文档，企微/飞书提醒「待人审」；用户核对抬头、芯片号/病历号与兽医原文诊断后，自行在保险公司 App/门户提交。禁止代提交、禁止承诺获赔；既往症表述必须以兽医原文为准。`,
    outcomes: [
      "源未披露国内通用获赔率、回款时长或人效对比等量化；公开仓库侧重「检测消费→匹配发票→填表成草稿→跟踪回执」流水线与人审边界。",
      "作者自述：仓库面向「两只狗、两家保险公司」的一户实验；结算算术 Check A 对十封批准信「分毫不差」、Check B 对其中五封有疑问（README 陈述，非我方实测）。",
      "理赔从「到处找发票、手填 PDF」变成「材料包 + 待审草稿 + 待确认问题清单」，发送与获赔决定仍在人。",
    ],
    caveats: [
      "保险理赔材料必须人审；系统只产草稿与清单，勿代提交、勿保证获赔；条款解释与既往症认定以保司与兽医原文为准。",
      "公开源未给出可复用的行业获赔统计，上线后需用自有案件台账复盘，勿把「流水线跑通」当成赔付承诺。",
      "发票抬头、芯片号/病历号不一致易被拒；邮件/云盘凭据与保单号属敏感数据，换租户后权限与脱敏策略要重核。",
    ],
    prompts: [
      {
        title: "理赔材料包待审草稿",
        body: `你是宠物险理赔材料整理助手。只根据用户上传的账单、病历摘要与保单公开字段生成中文待审材料包，禁止编造诊断、既往症结论、费用数字或「一定获赔」承诺。

输出 Markdown：
## 材料清单（缺项标红）
## 费用表（项目/金额/是否疑似常规护理）
## 事件经过草稿（供人改）
## 需用户确认的问题（抬头、芯片号/病历号、不确定字段）
## 禁止自动动作：不代提交、不改兽医诊断原文

输入：
{{claim_pack_inputs}}`,
      },
      {
        title: "飞书材料包索引",
        body: `根据已人工核对的理赔材料包，写一段可贴飞书文档的索引（≤180 字）：宠物称呼（若有）、就诊日期、材料齐套状态、待补项、提醒「请用户自行向保险公司提交」。不要添加未出现的获赔金额或成功率。

材料包摘要：
{{claim_pack_summary}}`,
      },
    ],
    primarySource: {
      url: "https://github.com/jagberg/Me.OpenClaw",
      label: "GitHub · jagberg/Me.OpenClaw（宠物消费→保险理赔草稿）",
      date: "2026-07-18",
      dateLabel: "仓库创建",
    },
  },
  {
    id: "162",
    slug: "web-research-subagent-delegate",
    title: "编码 Agent 委派网页调研子代理",
    summary:
      "主编码 Agent 把查文档、比库、搜示例的工作委派给网页调研子代理，汇总后再继续写代码。",
    description:
      "编码时频繁打断去搜文档会丢上下文。主 Agent 将调研问题打包给子代理（浏览器/MCP），收回结构化笔记（链接、结论、取舍），再继续实现。适合选库、API 差异与迁移调研。引用必须带来源 URL；禁止编造不存在的 API。",
    categories: ["devtools", "efficiency"],
    platforms: ["chatgpt", "claude", "deepseek", "n8n"],
    sourceUrl: "https://github.com/hanzili/comet-mcp",
    sourceLabel: "GitHub · comet-mcp",
    upvotes: 86,
    trending: false,
    tags: ["子代理", "网页调研", "编码Agent", "MCP", "效率"],
    howItWorks: [
      "主 Agent 列出待调研问题与验收标准",
      "子代理检索并返回带来源的结构化笔记",
      "主 Agent 基于笔记继续实现，关键依赖变更需人确认",
    ],
    tips: [
      "调研笔记固定「结论/证据链接/未决问题」三栏",
      "对许可证与安全公告单独开一项，避免只看功能忽略合规",
    ],
    approach: `GitHub 开源项目 comet-mcp 提供 MCP 桥：把 Claude Code 等编码 Agent 接到 Perplexity Comet 浏览器，用多代理委派做网页调研，而不是让写代码的同一模型亲自点选页面。README 对比三类工具——搜索 API 只能回静态文本；Puppeteer/Playwright 类「一代理包办」易挤爆上下文；Comet MCP 则让主 Agent 发高阶目标（调研 X、比库、过登录墙），由 Comet 负责导航与检索，结果经 \`comet_ask\`/\`comet_poll\` 等工具回流。支持 macOS/Windows/WSL2。公开文未给出调研准确率或省时百分比。

国内落地可不绑定单一浏览器品牌：主编码 Agent 列出待调研问题与验收标准，子代理（浏览器 MCP / 企微或飞书里的调研机器人）返回「结论 / 证据链接 / 未决问题」三栏笔记，再继续写代码；许可证与安全公告单独成项。引用必须带来源 URL；禁止编造不存在的 API；关键依赖变更需人确认。`,
    outcomes: [
      "源未披露调研准确率、耗时对比或上下文节省等量化；公开仓库只描述「编码主 Agent → MCP → Comet 网页智能」委派架构与工具表。",
      "查文档/比库从打断主会话的临时搜索，变成可回收的结构化调研笔记，主 Agent 上下文更聚焦实现。",
      "登录墙、动态页与深度检索可交给专用浏览子代理，主会话少做逐点击决策。",
    ],
    caveats: [
      "公开源未给出实测省时或正确率，上线后需用自有选库/迁移任务复盘，勿把「MCP 接通」当成调研质量承诺。",
      "子代理笔记必须带来源 URL；许可证与安全公告单独核对；不可把未验证的 API 签名直接写进生产代码。",
      "换 MCP 客户端、浏览器路径或企业代理后，调试端口与登录态要重核；含账号操作的调研应在隔离环境。",
    ],
    prompts: [
      {
        title: "调研任务单（主→子）",
        body: `你是编码主 Agent 的调研委派助手。根据当前实现目标，写出交给网页调研子代理的任务单，禁止要求子代理编造无来源结论。

输出：
1) 待答问题列表（可验收）
2) 必查来源类型（官方文档/changelog/许可证/安全公告）
3) 笔记格式：结论 / 证据链接 / 未决问题
4) 禁止项：不要改仓库依赖；不要提交代码

实现上下文：
{{coding_context}}`,
      },
      {
        title: "调研笔记回收摘要",
        body: `你是编码主 Agent。只根据子代理返回的带来源笔记，生成可继续写代码的中文摘要：推荐选项、取舍、风险与仍未决问题。禁止引入笔记中没有的 API 或版本号。若缺官方链接，输出「暂停实现：证据不足」。

子代理笔记：
{{research_notes}}`,
      },
    ],
    primarySource: {
      url: "https://github.com/hanzili/comet-mcp",
      label: "GitHub · hanzili/comet-mcp（Comet MCP 网页调研委派）",
      date: "2026-01-03",
      dateLabel: "仓库创建",
    },
  },
  {
    id: "163",
    slug: "autonomous-seo-page-loop",
    title: "自主循环批量生成 SEO 落地页与小工具",
    summary:
      "按关键词清单循环生成落地页或小工具草稿，带基础 SEO 结构，人工抽检后再上线。",
    description:
      "与 SEO 巡检（找问题）和安全日修（小补丁）不同：本条是「批量生产」——给定主题词，Agent 循环产出页面骨架、标题层级与内链建议，进入草稿站；抽检通过再发布。需设数量上限与敏感词过滤，禁止生成医疗夸大与虚假评价。不编造流量与排名承诺。",
    categories: ["content", "devtools"],
    platforms: ["chatgpt", "claude", "n8n", "deepseek"],
    sourceUrl:
      "https://dev.to/profiterole/i-let-an-ai-agent-run-my-business-for-3-days-heres-what-happened-10gn",
    sourceLabel: "DEV.to · Agent 跑业务实验",
    upvotes: 78,
    trending: false,
    tags: ["SEO落地页", "批量生成", "自主循环", "内容", "独立开发"],
    howItWorks: [
      "准备关键词/意图清单与页面模板",
      "Agent 循环生成草稿页并做基础 SEO 自检",
      "人工抽检后发布，记录废弃与通过比例",
    ],
    tips: [
      "每日生成上限写死，避免刷站被搜素引擎降权",
      "模板强制「来源/更新日期」字段，减少空壳页",
    ],
    approach: `DEV.to 文记述作者部署一个约每 20 分钟一轮的自主循环 Agent：读仪表盘与不可篡改的「信条」（如偏好可逆决策、未经批准不花钱），再构建或上线产品/内容并写入只追加决策日志。作者自述约 3 天、365 轮后，流水线产出官僚办事指南、金融计算器，以及大量互相链接的长尾 SEO 页与小工具；同时又记录转化极差、策略自行转向「讲故事」等实验观察。对本题有用的是「关键词/意图 → 循环产页与工具 → 日志复盘」骨架，而非无人值守刷站神话。

国内落地应对齐「批量草稿 + 人工抽检」：准备关键词/意图清单与页面模板，Agent 循环生成落地页或小工具骨架（标题层级、内链建议、来源/更新日期字段），写入草稿站或飞书文档队列；设每日生成上限与敏感词过滤，抽检通过才发布。禁止自动公开发站无审；禁止医疗夸大与虚假评价；不编造流量与排名承诺。`,
    outcomes: [
      "源未披露可复现的搜索排名、自然流量或转化漏斗量化；公开文以实验叙事为主。",
      "作者自述：约 3 天、约 365 轮循环；指南约 58 篇、计算器 155+、SEO 页约 394；收入自述为 3 美元小费量级（文章陈述，非我方实测）。",
      "落地页/小工具从零散手写，变成有上限、可抽检、可废弃统计的草稿循环队列。",
    ],
    caveats: [
      "禁止自动公开发站无审：生成结果默认进草稿站，抽检通过后再上线；每日上限写死，避免被搜索引擎视为垃圾站。",
      "公开源未给出可靠流量证明，上线后需用自有 Search Console/日志复盘，勿把「循环跑通」或作者自述页数当成效果承诺。",
      "模板强制来源/更新日期；医疗/金融夸大与虚假评价禁止生成；空壳页要进废弃统计而非硬发。",
    ],
    prompts: [
      {
        title: "SEO 落地页待审草稿",
        body: `你是 SEO 落地页草稿助手。只根据关键词/意图与模板生成中文待审页，禁止编造排名、流量、用户评价或未提供的产品功效。

输出 Markdown：
# 标题
## 摘要
## H2/H3 大纲与正文草稿
## 内链建议
## 来源与更新日期（占位）
## 自检：敏感词/夸大/空壳风险
约束：不自动发布；超出 {{daily_cap}} 则停止并说明。

输入：
{{keyword_brief}}`,
      },
      {
        title: "飞书抽检队列摘要",
        body: `根据本轮生成的草稿列表，写一段飞书通知：生成条数、建议抽检抽样、废弃候选、是否触达每日上限。不要添加未监测到的排名或 UV。若存在未审已发风险，输出「阻断：先下线自动发布」。

草稿列表：
{{draft_batch}}`,
      },
    ],
    primarySource: {
      url: "https://dev.to/profiterole/i-let-an-ai-agent-run-my-business-for-3-days-heres-what-happened-10gn",
      label: "DEV.to · I Let an AI Agent Run My Business for 3 Days. Here's What Happened.",
      date: "2026-03-21",
      dateLabel: "发布",
    },
  },
  {
    id: "164",
    slug: "blog-aggregator-day-build",
    title: "一日内构建并部署博客聚合站",
    summary:
      "用编码 Agent 在一天内从需求说明做出可访问的博客/资讯聚合站并完成部署。",
    description:
      "适合「有 RSS 源、缺产品壳」的个人或小队：把需求列表交给编码 Agent，生成抓取、列表页、详情与简单搜索，部署到静态或轻后端托管。版权上只聚合摘要+原文链接，不转载全文。强调可上线演示，而非完美设计系统。",
    categories: ["devtools", "content"],
    platforms: ["chatgpt", "claude", "deepseek", "n8n"],
    sourceUrl:
      "https://dev.to/wheeleruniverse/from-dusty-requirements-to-live-website-how-claude-code-built-my-blog-aggregator-in-a-single-day-3jbo",
    sourceLabel: "DEV.to · 一日博客聚合站",
    upvotes: 80,
    trending: false,
    tags: ["聚合站", "RSS", "一日上线", "编码Agent", "内容"],
    howItWorks: [
      "列出源、字段与非目标（不做的功能）",
      "Agent 实现抓取与站点并完成本地验收",
      "部署公网演示，补 robots/来源声明",
    ],
    tips: [
      "每条内容保留原文链接与抓取时间，避免版权纠纷",
      "源站失败要降级为空态，不要用过期缓存冒充新文",
    ],
    approach: `DEV.to 文记述作者把尘封一年多的需求说明，经多轮改写成给 Claude Code 的结构化提示后，在约一天内做出可访问的个人博客聚合站：多平台文章列表、JSON 驱动内容、自定义 slug 跳转原文、按来源/日期筛选与搜索、明暗主题等，技术栈为 Vue 3 + TypeScript + Tailwind + Vite，并部署到 Netlify（Git 推送自动构建）。版权策略是聚合后跳转原文，而不是转载全文。公开文未给出访问量或广告收入。

国内落地可把「需求列表 + 非目标」交给编码 Agent：对接 RSS/平台 API，生成列表页、详情摘要与简单搜索，部署到静态托管或轻后端；每条保留原文链接与抓取时间，源站失败降级为空态。进度与验收清单可同步飞书；强调可上线演示，而非完美设计系统。`,
    outcomes: [
      "源未披露上线后 PV、收录或获客等量化；公开文只描述「尘封需求 → 精炼提示 → 一日内可访问聚合站 + Netlify 部署」。",
      "作者自述：需求文档搁置逾一年；用 Claude Code 约一天（文中亦称约八小时量级）从需求做到上线演示（文章陈述，非我方实测）。",
      "多平台博文从分散链接，变成带自定义 URL 与筛选搜索的统一入口，同时跳转原文降低转载风险。",
    ],
    caveats: [
      "公开源未给出流量或留存数据，上线后需用自有统计复盘，勿把「一日上线」当成增长承诺。",
      "只聚合摘要+原文链接，不转载全文；每条保留抓取时间；源失败显示空态，勿用过期缓存冒充新文。",
      "提示词需写清非目标（不做的功能），避免范围膨胀；换托管平台后构建命令、域名与 robots/来源声明要重核。",
    ],
    prompts: [
      {
        title: "聚合站一日构建提示",
        body: `你是编码 Agent。根据需求清单实现一个博客/资讯聚合演示站，禁止编造未提供的文章正文或转载全文。

必须：源列表、列表页、摘要详情、简单搜索、原文链接与抓取时间字段、本地可运行说明。
非目标：{{non_goals}}
验收：{{acceptance}}

需求：
{{requirements}}`,
      },
      {
        title: "飞书上线验收清单",
        body: `根据仓库 README 与部署结果，写一份可贴飞书的上线验收清单：构建是否成功、首页是否可打开、抽样条目是否含原文链接、robots/来源声明是否存在、已知缺陷。不要添加未统计的访问量。

部署笔记：
{{deploy_notes}}`,
      },
    ],
    primarySource: {
      url: "https://dev.to/wheeleruniverse/from-dusty-requirements-to-live-website-how-claude-code-built-my-blog-aggregator-in-a-single-day-3jbo",
      label: "DEV.to · From Dusty Requirements to Live Website: How Claude Code Built My Blog Aggregator in a Single Day",
      date: "2025-07-08",
      dateLabel: "发布",
    },
  },
  {
    id: "165",
    slug: "saas-cloud-migrate-agent",
    title: "SaaS 基础设施迁移云厂商",
    summary:
      "在有流量的前提下，用编码 Agent 协助梳理依赖、改配置与校验清单，完成云厂商或区域迁移。",
    description:
      "迁移怕的是漏环境变量与静默流量丢失。Agent 帮助盘点服务、密钥引用、DNS 与健康检查，生成迁移步骤与回滚点；执行仍分阶段人工确认。适合独立 SaaS 与小团队。不编造「零停机」保证；关键切流前必须演练。进度可同步飞书。",
    categories: ["devtools", "enterprise"],
    platforms: ["chatgpt", "claude", "deepseek", "feishu"],
    sourceUrl:
      "https://dev.to/anand_rathnas_d5b608cc3de/how-claude-code-helped-me-migrate-from-aws-to-digitalocean-in-4-hours-with-live-traffic-hmg",
    sourceLabel: "DEV.to · 热迁移实践",
    upvotes: 83,
    trending: false,
    tags: ["云迁移", "SaaS", "基础设施", "编码Agent", "回滚"],
    howItWorks: [
      "盘点服务依赖、密钥与数据面清单",
      "生成分阶段迁移与校验脚本/检查表",
      "灰度切流，失败按回滚点恢复并复盘",
    ],
    tips: [
      "先迁只读副本与预发，再动主库与支付回调",
      "DNS TTL 提前降低，给回滚留窗口",
    ],
    approach: `DEV.to 文记述作者用 Claude Code 作结对，把有流量的 URL 缩短 SaaS 从 AWS（EC2/RDS/ElastiCache/ALB 等）迁到 DigitalOcean（Droplet + 托管 Postgres 等）：用 GitHub Actions 工作流引导初始化、启动、配置与 SSL；过程中迭代修了 SSL 参数、dump 角色名替换、Cloudflare 521、nginx SPA \`proxy_pass\` 与环境变量名不一致等问题。作者自述约 4 小时完成切流并宣称零停机、月费约从 120 美元降到 44 美元量级。对本题有用的是「盘点依赖 → 分阶段脚本/检查表 → 灰度切流与回滚点」，而不是把零停机当保证。

国内落地可迁移云厂商或可用区：Agent 帮助盘点服务、密钥引用、DNS 与健康检查，生成分阶段步骤与校验清单，进度同步飞书；先迁只读副本与预发，再动主库与支付回调；DNS TTL 提前降低。热迁移须人确认与回滚预案；不编造「零停机」保证；关键切流前必须演练。`,
    outcomes: [
      "源未披露可第三方复核的 SLA/错误率曲线；公开文以作者单次迁移叙事为主。",
      "作者自述：约 4 小时（清晨 6–10 点）、宣称零停机；月费约 120→44 美元、约 63% 降幅；库表约 29、行约 3000+（文章陈述，非我方实测）。",
      "迁移从「靠记忆改配置」变成「依赖清单 + 分阶段工作流/检查表 + 失败可回滚点」，切流仍由人点确认。",
    ],
    caveats: [
      "热迁移须人确认与回滚预案：DNS/主库/支付回调等关键步不得全自动执行；演练通过前不切生产流量。",
      "公开源的「零停机」与费用对比为作者自述，上线后需用自有监控与账单复盘，勿写成我方承诺。",
      "先迁只读副本与预发；提前降低 DNS TTL；密钥、环境变量名与健康检查换环境后要重核。",
    ],
    prompts: [
      {
        title: "迁移依赖盘点与阶段表",
        body: `你是云迁移助手。只根据给定的架构说明生成中文盘点与分阶段计划，禁止承诺零停机或未验证的费用数字。

输出：
1) 服务/密钥/DNS/数据面清单
2) 阶段顺序（预发→只读→主路径）与每阶段校验项
3) 回滚点与负责人确认门禁
4) 禁止自动执行的步骤列表

架构说明：
{{infra_notes}}`,
      },
      {
        title: "飞书切流窗口播报",
        body: `根据当前迁移阶段状态，写一段飞书播报：已完成校验、待人确认项、回滚命令入口、监控看板链接占位。若缺回滚预案或健康检查未绿，输出「禁止切流」。不要添加未监测到的可用性百分比。

阶段状态：
{{cutover_status}}`,
      },
    ],
    primarySource: {
      url: "https://dev.to/anand_rathnas_d5b608cc3de/how-claude-code-helped-me-migrate-from-aws-to-digitalocean-in-4-hours-with-live-traffic-hmg",
      label: "DEV.to · How Claude Code Helped Me Migrate from AWS to DigitalOcean in 4 Hours (With Live Traffic)",
      date: "2026-01-08",
      dateLabel: "发布",
    },
  },
  {
    id: "166",
    slug: "parallel-local-coding-sessions",
    title: "本地并行多会话编码 Agent",
    summary:
      "在同一仓库开多个本地 Agent 会话并行改不同模块，用分支隔离与汇总审阅降低互相踩踏。",
    description:
      "单会话串行改大需求太慢。实践是按模块开并行本地会话，各自独立分支与测试；合并前做冲突与意图审阅。适合熟悉 Git 的开发者。需要明确文件所有权，避免两会话改同一核心文件。不替代 CI。",
    categories: ["devtools", "efficiency"],
    platforms: ["chatgpt", "claude", "deepseek", "grok"],
    sourceUrl: "https://news.ycombinator.com/item?id=49992657",
    sourceLabel: "Hacker News",
    upvotes: 87,
    trending: false,
    tags: ["并行Agent", "多会话", "分支隔离", "编码", "效率"],
    howItWorks: [
      "按模块切分任务并分配会话与分支",
      "各会话独立实现并跑局部测试",
      "汇总 PR，解决冲突后统一 CI 与人工审",
    ],
    tips: [
      "共享接口文件只允许一个会话改，其他先 mock",
      "会话数宁少勿多，超过三人审阅成本会反超",
    ],
    approach: `Hacker News 评论里，用户 Roark66 描述自己的本地编码 Agent 用法：同时保留多个会话（自述最多约 10 个打开、同一时刻不超过约 5 个并行），用本地推理把长上下文缓存落盘，避免云端短时缓存过期后整段上下文被重新计费。帖中把重点放在「多会话并行干活 + 本地缓存可控」，并给出个人 token 用量量级，但没有写仓库级分支隔离、文件所有权或合并冲突的标准作业流程。

国内落地可按模块切任务：每个会话绑定独立 Git 分支与局部测试；共享接口文件只允许一个会话改、其他先 mock；合并前统一跑 CI 与人工审 diff。进度可贴飞书/企微文档或 PR 列表。会话数宁少勿多；并行不替代 CI，也不等于免审。`,
    outcomes: [
      "源未披露国内通用吞吐、冲突率或人效对比等量化；公开评论侧重个人「多会话并行 + 本地缓存」实践。",
      "作者自述：同时最多约 10 个会话打开、同一时刻不超过约 5 个；周输入约 1.3B token、输出约 7–8M，其中约 80% 命中缓存；并称按 API 价约合每周数千美元量级（评论陈述，非我方实测）。",
      "大需求从单会话串行，变成可按模块并行推进、再汇总审阅的工作面；合并与上线闸门仍在人与 CI。",
    ],
    caveats: [
      "公开源未给出可复用的团队吞吐或冲突统计，上线后需用自有仓库复盘，勿把「开了很多会话」当成交付加速承诺。",
      "两会话改同一核心文件极易踩踏；共享接口须约定所有权；并行产物必须经统一 CI 与人工审，不可跳过。",
      "本地模型/GPU 与密钥属敏感资产；换机或共享开发机后，缓存落盘路径与凭据隔离要重核。",
    ],
    prompts: [
      {
        title: "并行会话任务切分单",
        body: `你是本地多会话编码协调助手。根据需求与仓库模块边界，输出可并行的会话任务单，禁止假设未声明的文件可被多会话同时修改。

输出 Markdown：
## 会话列表（会话名/分支名/负责路径/禁止改动路径）
## 共享接口所有权（只允许一个会话改）
## 各会话局部测试命令
## 合并前检查清单（冲突、CI、人工审）
## 非目标（本轮不做）

需求与约束：
{{feature_brief}}`,
      },
      {
        title: "汇总审阅待办（飞书）",
        body: `根据各会话 PR/分支摘要，写一段可贴飞书或企微的中文汇总（≤200 字）：已完成模块、已知冲突文件、待跑 CI、需人工拍板项。不要编造测试结果或覆盖率；缺信息就列「待确认」。

各会话摘要：
{{session_summaries}}`,
      },
    ],
    primarySource: {
      url: "https://news.ycombinator.com/item?id=49992657",
      label: "HN · comment 49992657（本地多会话编码 Agent + 缓存）",
      date: "2026-10-07",
      dateLabel: "讨论",
    },
  },
  {
    id: "167",
    slug: "intent-review-agent-with-tests",
    title: "对照用户意图的评审 Agent 加测试",
    summary:
      "让评审 Agent 对照原始用户意图检查 PR，并要求补齐关键路径测试后再合并。",
    description:
      "代码能跑不等于满足需求。评审 Agent 读取 Issue/产品说明与 diff，标出偏离意图、缺测试与风险点；未覆盖主路径测试则阻断合并建议。人仍做最终 Approve。可把结论贴到飞书/PR 评论。不编造未运行的测试结果。",
    categories: ["devtools", "efficiency"],
    platforms: ["chatgpt", "claude", "deepseek", "feishu"],
    sourceUrl: "https://news.ycombinator.com/item?id=50124513",
    sourceLabel: "Hacker News",
    upvotes: 88,
    trending: false,
    tags: ["代码评审", "用户意图", "测试", "PR", "质量"],
    howItWorks: [
      "绑定 Issue/需求原文与 PR diff",
      "Agent 输出意图符合度、缺口与测试建议",
      "补测并通过 CI 后人工合并",
    ],
    tips: [
      "把「非目标」写进 Issue，评审才不会误报漏做",
      "对生成测试也做抽检，避免无断言的假测试",
    ],
    approach: `Hacker News 评论里，用户 visarga 总结自己约半年来的做法：最要紧的是少出 bug、并确认代码真的做了你想要的事；手段是写测试、打日志、与运行中的应用交互。意图校准上，他让 Agent 重读该项目里全部用户消息，再据此检查代码与测试；长周期工作则维护一份留在仓库里的 todo，关闸前后各审一次。公式被概括为：评审 Agent + 测试 + 用户消息日志。帖中未给出缺陷逃逸率或合并时长等统计。

国内落地可把 Issue/产品说明/「非目标」与 PR diff 绑在一起，让评审 Agent 输出意图符合度、缺口与关键路径测试建议；结论贴到飞书文档或 PR 评论。未覆盖主路径测试则只给「不建议合并」；人做最终 Approve。禁止编造未运行的测试结果；对模型生成的测试也要抽检断言。`,
    outcomes: [
      "源未披露缺陷逃逸率、评审耗时或合并质量对比等量化；公开评论只描述「评审 Agent + 测试 + 用户消息日志」组合。",
      "作者自述：类似做法约半年；即使约 1 万条消息的项目，重读用户消息做意图校准也只需几分钟量级（评论陈述，非我方实测）。",
      "PR 评审从只看「能不能跑」，变成对照原始意图与测试缺口的待审结论，合并决定仍在人。",
    ],
    caveats: [
      "公开源未给出可复用的质量基线，上线后需用自有缺陷/回滚台账复盘，勿把「有评审 Agent」当成质量承诺。",
      "禁止把未实际跑过的测试写成已通过；生成测试须抽检，避免无断言或假绿。",
      "Issue 若不写清非目标，易误报漏做；飞书/PR 评论里的敏感需求原文要注意权限与脱敏。",
    ],
    prompts: [
      {
        title: "意图对照评审意见",
        body: `你是对照用户意图的代码评审助手。只根据给定的需求原文（含非目标）、PR diff 与已声明的测试结果写中文评审，禁止编造未提供的测试通过结论或覆盖率。

输出：
## 意图符合度（符合/部分偏离/明显偏离 + 依据）
## 缺口与风险
## 关键路径测试建议（可验收）
## 合并建议（建议/不建议；人仍最终 Approve）
## 需产品确认的问题

输入：
{{intent_and_diff}}`,
      },
      {
        title: "飞书评审摘要",
        body: `把评审结论压成可贴飞书/企微的短摘要（≤180 字）：意图结论、缺测项、是否建议合并、待人确认点。不要添加未出现的通过率或缺陷数量。

评审结论：
{{review_result}}`,
      },
    ],
    primarySource: {
      url: "https://news.ycombinator.com/item?id=50124513",
      label: "HN · comment 50124513（意图评审 Agent + 测试 + 用户消息日志）",
      date: "2026-10-16",
      dateLabel: "讨论",
    },
  },
  {
    id: "168",
    slug: "prospect-opportunity-summarizer",
    title: "找潜客并汇总销售商机",
    summary:
      "多 Agent 工作流检索公开潜客信号，汇总成商机卡片推送到飞书/企微，供销售筛选跟进。",
    description:
      "增长与销售要的是「谁可能需要我们」的短清单，而不是漫无浏览。工作流组合公开网页/名录信号，生成公司简介、契合理由与建议话术卡片，推到飞书或企微；销售决定是否入库 CRM。不购买或泄露未授权个人隐私数据；不编造联系电话。与「线索打分外联」互补：本条偏发现与商机汇总。",
    categories: ["enterprise", "efficiency"],
    platforms: ["feishu", "wecom", "n8n", "chatgpt"],
    sourceUrl:
      "https://dev.to/inforeole/the-unstoppable-lead-generation-engine-a-multi-agent-ai-workflow-with-n8n-bright-data-4k3j",
    sourceLabel: "DEV.to · 多 Agent 获客工作流",
    upvotes: 84,
    trending: false,
    tags: ["潜客", "商机", "飞书", "企微", "销售"],
    howItWorks: [
      "配置行业/地区与契合规则",
      "多 Agent 检索公开信号并生成商机卡片",
      "推送飞书/企微，销售勾选后写入 CRM",
    ],
    tips: [
      "卡片必须带来源链接，方便销售一分钟核验",
      "排除已成交与黑名单域名，减少重复骚扰",
    ],
    approach: `DEV.to 上的公开赛文描述了一套 n8n 多 Agent 潜客工作流（Lead Opportunity Finder）：以聊天触发为入口，先用专用提示从目标站识别相关 URL，再对页面内容做摘要，最后把多页摘要合并合成为可行动的商机报告；抓取侧配合抗封锁的网页取数节点，模型侧用 OpenRouter 按步骤选不同模型。作者强调把「抽 URL → 逐页摘要 → 综合商机」拆开，比单提示端到端更稳。文中未给出获客转化率、商机条数或成交金额等量化。

国内落地可配置行业/地区与契合规则，只基于公开网页与名录信号生成「公司简介 / 契合理由 / 建议话术 / 来源链接」商机卡片，推到飞书或企微供销售勾选后再入 CRM。禁止编造联系电话、未公开商机或成交意向；外联草稿须人审后再发，勿自动群发。已成交与黑名单域名要排除。`,
    outcomes: [
      "源未披露获客转化率、有效商机占比或人效对比等量化；公开文只描述 n8n 多 Agent「取数→摘要→合成商机」流水线已接通。",
      "潜客研究从人工翻页浏览，变成可推送的结构化商机卡片，销售仍决定是否入库与跟进。",
      "模块化提示（抽链 / 摘要 / 综合）让输出更聚焦可核验来源，而不是一篇无法追溯的长文。",
    ],
    caveats: [
      "外联草稿必须人审后再发，禁止自动群发；勿把模型合成的「商机」写成已确认需求或合同意向。",
      "禁止编造电话、邮箱或未在来源页出现的事实；不购买/不入库未授权个人隐私数据。",
      "公开源未给出可复用的销售结果，上线后需用自有跟进台账复盘；抓取与名录使用须符合站点条款与合规要求。",
    ],
    prompts: [
      {
        title: "商机卡片待审草稿",
        body: `你是 B2B 潜客商机汇总助手。只根据用户提供的公开网页摘录与契合规则生成中文商机卡片，禁止编造电话、邮箱、预算、决策人姓名或「对方已有采购意向」。

输出 Markdown：
## 公司简介（仅来源可见事实）
## 契合理由（对照规则，缺证据则写不确定）
## 建议话术草稿（供人改，勿直接群发）
## 来源链接列表
## 需销售确认后才能做的动作（入库 CRM / 外联）

输入：
{{public_snippets_and_fit_rules}}`,
      },
      {
        title: "飞书/企微商机推送文案",
        body: `把已人工初筛的商机卡片压成一条飞书或企微消息（≤160 字）：公司名、一条契合理由、来源域名、提醒「外联须人审后发送、勿群发」。不要添加未出现的金额或成功率。

商机卡片：
{{opportunity_card}}`,
      },
    ],
    primarySource: {
      url: "https://dev.to/inforeole/the-unstoppable-lead-generation-engine-a-multi-agent-ai-workflow-with-n8n-bright-data-4k3j",
      label: "DEV.to · n8n + Bright Data 多 Agent 潜客商机工作流",
      date: "2025-08-31",
      dateLabel: "发布",
    },
  },
  {
    id: "169",
    slug: "planning-command-pipeline",
    title: "从想法到落地的规划命令流水线",
    summary: "把一句话想法拆成计划、任务命令与验收清单，再交给编码 Agent 分步执行并回写进度。",
    description: "从灵感到可执行改动中间缺一层「可检查的计划」。流水线先产出目标、约束、任务拆解与完成定义，再按命令逐步调用编码 Agent；每步留下日志，可在飞书同步进度。适合独立开发与小团队对齐范围。计划未批准前不改生产代码。",
    categories: ["devtools", "efficiency"],
    platforms: ["chatgpt", "claude", "deepseek", "feishu"],
    sourceUrl: "https://news.ycombinator.com/item?id=49586883",
    sourceLabel: "Hacker News",
    upvotes: 85,
    trending: false,
    tags: ["规划", "任务拆解", "命令流水线", "编码Agent", "效率"],
    howItWorks: [
      "输入想法与约束，生成计划与验收清单供人确认",
      "按任务命令逐步执行并记录产物",
      "全部通过验收后汇总变更说明",
    ],
    tips: [
      "计划里写清非目标，防止范围偷偷膨胀",
      "高风险步骤（迁移、删数据）单独闸门",
    ],
    approach: `Hacker News 评论里，用户 gojkoa 分享自营 SaaS 的 AI 原生开发流水线：用约 5 条自定义「命令」把一句话想法推到落地——捕获意图、影响分析、迭代规划、执行编排、评审/演示；各步共同维护一份进 Git 的共享计划文件，人在流水线中持续审阅。意图命令会写出目标/反目标/约束；影响分析对照代码库找缺口；规划再拆成可独立验证与部署的任务。护栏更多落在确定性工具（自定义 lint、Bash 预执行规则、编排脚本）而非只靠模型自觉。帖中还描述了演示命令用浏览器录制界面走查。

国内落地可先产出目标、非目标、约束与验收清单，计划未批准前不改生产代码；批准后再按任务命令分步执行并回写日志，进度同步飞书。迁移、删数据等高风险步骤单独闸门。`,
    outcomes: [
      "源未披露跨团队通用的交付周期或缺陷对比；公开评论以个人流水线与护栏设计为主。",
      "作者自述：编排层把工作流平均耗时从约 5–6 小时降到约 20–30 分钟，token 消耗降到此前约 20% 量级，并去掉约 10–15 分钟的 LLM 现场拼装工作流等待（评论陈述，非我方实测）。",
      "从灵感到改动之间多了一层可检查的计划与分步命令，范围与验收可在执行前对齐。",
    ],
    caveats: [
      "计划未批准前禁止改生产代码；高风险步骤须单独人闸，不能因「命令流水线」自动放行。",
      "公开源数据为作者自述环境，换仓库/团队后耗时与 token 比例不可直接外推，需自建复盘。",
      "护栏依赖本地 lint/钩子与规则库维护；规则过时会导致误拦或漏拦，需定期回归。",
    ],
    prompts: [
      {
        title: "意图与计划待批稿",
        body: `你是规划命令流水线的意图助手。根据一句话想法与约束，生成供人批准的中文计划，禁止在未批准前给出「直接改生产」的步骤。

输出：
## 目标
## 非目标
## 约束与风险
## 影响面（模块/接口，未知则标待查）
## 任务拆解（可独立验证）
## 验收清单
## 高风险闸门（迁移/删数据等）

想法与约束：
{{idea_and_constraints}}`,
      },
      {
        title: "飞书进度回写",
        body: `根据已执行任务日志，写一段可贴飞书的进度更新（≤180 字）：已完成任务、产物链接/路径、失败项、下一步待批事项。不要编造验收通过；未跑的检查写「未跑」。

任务日志：
{{task_log}}`,
      },
    ],
    primarySource: {
      url: "https://news.ycombinator.com/item?id=49586883",
      label: "HN · comment 49586883（五命令规划流水线：意图→影响→计划→执行→评审）",
      date: "2026-09-06",
      dateLabel: "讨论",
    },
  },
  {
    id: "170",
    slug: "crm-research-fill-outreach",
    title: "调研公司并填 CRM 做外联",
    summary: "根据公司名单自动补全公开信息写入 CRM 字段，并生成个性化外联草稿供销售发送。",
    description: "与「发现潜客商机」和「线索打分」不同：本条假设名单已有，重点是调研补全 CRM 与外联草稿。Agent 只使用公开网页信息填写行业、产品、近期动态等字段，草稿进飞书/企微待发。不编造联系人手机；不自动群发。",
    categories: ["enterprise", "efficiency"],
    platforms: ["feishu", "wecom", "chatgpt", "claude"],
    sourceUrl: "https://aimaker.substack.com/p/claude-code-ai-sales-agent",
    sourceLabel: "Substack · AI sales agent",
    upvotes: 86,
    trending: false,
    tags: ["CRM", "公司调研", "外联", "飞书", "企微"],
    howItWorks: [
      "导入公司名单与需补全的 CRM 字段",
      "检索公开信息并写入待确认字段",
      "生成外联草稿，销售确认后发送并回写状态",
    ],
    tips: [
      "CRM 写入先入「待确认」视图，避免脏数据直接进主库",
      "外联模板按行业分支，比一套话术更有效",
    ],
    approach: `Substack《How to Build Your First AI Sales Engine With Claude Code》记录 One Shot Show 对 Jonas Braadbaart 销售引擎的访谈：先有公司名单（如从名单工具导出）并人工/半自动按 ICP 预筛，再对入选公司做公开调研与 enrichment，写入 CRM（文中为 Attio），生成给自己看的协作报告，并起草 LinkedIn/邮件外联；Gmail 侧可只建草稿。作者与嘉宾反复强调边界——Agent 做销售行政重活，发不发、怎么改仍由人决定；嘉宾还提到曾自动群发冷启几乎无效，因此本版在发送前保留人审。

国内落地假设名单已有：只基于公开网页补全行业、产品、近期动态等 CRM「待确认」字段；外联草稿进飞书/企微待发队列，销售改写并确认后再发送、回写状态。不编造联系人手机；不自动群发；不把未核实信息直接写入主库。`,
    outcomes: [
      "源未披露可复用的行业成交率基准；公开文以嘉宾个案说明流程形态。",
      "作者转述嘉宾自述：首轮联系约 80 家公司成交 1 单；有自动化后单条线索的审阅与消息准备可压到约 1 分钟，无系统时同类准备约 1–2 小时/线索；工具栈成本约 120 欧元量级（文中陈述，非我方实测）。",
      "名单跟进从手工开大量标签页，变成「调研补全 → CRM 待确认 → 外联草稿待审」的交接链，发送权仍在销售。",
    ],
    caveats: [
      "外联草稿须人审后再发，禁止自动群发；人与人的冷启沟通应保持人工改写，避免机器人味与投诉。",
      "不编造联系人手机或未出现在公开来源的职位/业绩；CRM 先入待确认视图，避免脏数据进主库。",
      "公开数字为个案自述，换行业/名单质量后不可直接外推；名单与外联须符合反垃圾与隐私合规。",
    ],
    prompts: [
      {
        title: "CRM 待确认字段草稿",
        body: `你是公司调研与 CRM 补全助手。只根据给定的公开网页摘录填写待确认字段，禁止编造手机号、个人邮箱、融资额或未出现的产品线。

输出：
## 待确认字段表（字段/建议值/证据链接/置信度）
## 不确定项（宁可留空）
## 禁止写入主库的原因（若证据不足）
## 外联前需销售确认的问题

公司与摘录：
{{company_public_research}}`,
      },
      {
        title: "外联待审草稿（飞书/企微）",
        body: `根据已人工确认的公司要点，生成一条中文外联草稿（邮件或企微/飞书消息，≤180 字）供销售改写。语气克制，点明为何联系与可跳过方式。不要群发指令；不要声称已合作或对方有采购意向；缺关键事实则输出「暂停：证据不足」。

确认要点：
{{confirmed_company_notes}}`,
      },
    ],
    primarySource: {
      url: "https://aimaker.substack.com/p/claude-code-ai-sales-agent",
      label: "Substack · How to Build Your First AI Sales Engine With Claude Code",
      date: "2026-06-21",
      dateLabel: "发布",
    },
  },
  {
    id: "171",
    slug: "arxiv-weekly-triage",
    title: "每周 arXiv 论文分拣",
    summary: "按研究兴趣订阅 arXiv 周更新，自动打标签、摘要并排出必读/可略清单。",
    description: "研究者被周更淹没。Agent 按关键词与作者列表拉取新文，生成一句话摘要、方法标签与阅读优先级，推送到飞书或邮件。不替代精读；不编造实验结论。适合个人学习与小课题组共享。",
    categories: ["education", "efficiency"],
    platforms: ["chatgpt", "claude", "deepseek", "feishu"],
    sourceUrl: "https://aisagroup.substack.com/p/how-i-use-codex-to-automate-parts",
    sourceLabel: "Substack · 研究自动化",
    upvotes: 81,
    trending: false,
    tags: ["arXiv", "论文分拣", "周更", "学习", "飞书"],
    howItWorks: [
      "配置兴趣关键词、作者与排除词",
      "周更拉取并生成摘要与优先级",
      "输出必读清单，可选同步飞书知识库",
    ],
    tips: [
      "必读上限固定（如每周 5 篇），强迫做取舍",
      "摘要旁保留 arXiv id，方便一键打开原文",
    ],
    approach: `作者在 Substack 文中写自己用 Codex 做研究工作流的一部分：每周自动按关键词检索 arXiv，把结果落到 CSV 去重，只对相对上周的增量做分拣，并给出 keep / skim / drop / duplicate / outside scope / weak method 等优先级，再把有希望的文章放进 Zotero 收件箱做向量化备查。文中明确这是预过滤，不是让模型替你裁定「该不该读」；精读与研究判断仍在人。公开文未给出每周节省小时数或命中率等量化。

国内落地可把兴趣关键词、作者白名单与排除词写进飞书/企微文档，周更任务把「必读上限」（如每周 5 篇）与一句话摘要、方法标签、arXiv id 一并推到群或知识库。摘要旁必须保留可点开的 arXiv id；禁止编造实验结论或未读论文的数字。分拣清单只服务取舍，不替代精读。`,
    outcomes: [
      "源未披露每周节省时长、召回/精确率或课题组人效对比等量化；公开文只描述「周更检索→CSV 去重→增量分拣→Zotero」闭环。",
      "作者自述：用 Codex 周自动化按关键词搜 arXiv，对增量做 keep/skim/drop 等优先级，并把候选送入 Zotero 向量库，便于后续按项目集合核对引用（文章陈述，非我方实测）。",
      "周更从「淹没式刷列表」变成可共享的必读/可略清单；是否精读、是否采信结论仍由研究者决定。",
    ],
    caveats: [
      "公开源未给出可复用的分拣效果基线，上线后需用自有兴趣词与阅读日志复盘，勿把「有周清单」当成研究加速承诺。",
      "模型摘要可能漏掉方法缺陷或夸大贡献；必读项须点开原文，禁止把摘要当实验结论引用。",
      "关键词过宽会刷爆清单，过窄会漏重要作者；飞书/企微同步注意权限，勿把未发表笔记公开到过大范围。",
    ],
    prompts: [
      {
        title: "周更 arXiv 分拣表",
        body: `你是研究论文分拣助手。只根据给定的论文元数据（标题、作者、摘要、arXiv id）与兴趣配置输出中文分拣表，禁止编造未提供的实验数字或结论。

输出 Markdown：
## 必读（上限 {{must_read_cap}}；每条：优先级理由 / 一句话摘要 / 方法标签 / arXiv id）
## 可略或 skim
## 排除（duplicate / outside scope / weak method 等）
## 需人工确认
## 非目标（本轮不做精读或实验复现）

兴趣配置：
{{interest_config}}

本周候选：
{{paper_delta}}`,
      },
      {
        title: "飞书周清单摘要",
        body: `把分拣结果压成可贴飞书/企微的中文周报（≤180 字）：本周必读篇数与标题要点、可略原因类型、待确认项。每条必读保留 arXiv id。不要添加未出现的引用次数或「SOTA」断言。

分拣结果：
{{triage_result}}`,
      },
    ],
    primarySource: {
      url: "https://aisagroup.substack.com/p/how-i-use-codex-to-automate-parts",
      label: "Substack · How I Use Codex To Automate Parts Of My Research Workflow（周更 arXiv triage）",
      date: "2026-07-07",
      dateLabel: "发布",
    },
  },
  {
    id: "172",
    slug: "cheapest-model-router-crm-email",
    title: "按任务选最便宜够用模型做 CRM 邮件",
    summary: "把 CRM 更新、邮件分类、草稿生成等任务路由到不同价位模型，在质量门槛内压低成本。",
    description: "企业自动化里不是事事都要最强模型。路由器按任务类型选择便宜且够用的模型：标签/抽取走小模型，复杂谈判草稿走强模型；失败再升级。可挂飞书/企微审批贵价调用。记录每次路由与花费，便于复盘。不泄露客户原文到未批准的第三方。",
    categories: ["enterprise", "efficiency"],
    platforms: ["chatgpt", "deepseek", "claude", "n8n"],
    sourceUrl: "https://substack.com/@stackandscaleai/note/c-217266874",
    sourceLabel: "Substack · 模型路由笔记",
    upvotes: 82,
    trending: false,
    tags: ["模型路由", "成本", "CRM", "邮件", "企业自动化"],
    howItWorks: [
      "定义任务类型与质量门槛、模型价目表",
      "运行时路由并在失败时升级模型",
      "汇总成本与质量指标，调整路由表",
    ],
    tips: [
      "先对历史样本做离线评测再上线路由，避免拍脑袋",
      "含个人数据的任务锁定合规区域内的模型端点",
    ],
    approach: `Substack Note 里 Brandon 转述社交销售从业者 Koka Sexton 的做法：用 Make 把 LinkedIn 互动沉淀进流水线；上层用 OpenClaw 作为「路由大脑」，可在 OpenAI / Claude / Gemini 等提供方之间切换或并行。文中重点是一套自定义的「节流并选择」逻辑——按任务复杂度挑当前最便宜且够用的模型，并举例「约 30 行 CRM 分析」与「写约 20 封外联邮件」需要不同模型与成本。对外发送仍须当事人明确批准。Note 本身未给出月度账单对比或质量评测表。

国内落地可把任务类型写成路由表：标签/字段抽取走小模型，复杂谈判草稿走强模型，失败再升级；贵价调用可挂飞书/企微审批。客户原文与邮箱不得发到未批准的第三方端点；外联草稿必须人审后再发，禁止自动群发。上线路由前先用历史样本离线评测。`,
    outcomes: [
      "源未披露月成本下降幅度、路由准确率或外联回复率等量化；公开 Note 只描述「按任务选最便宜够用模型」与 CRM/邮件分工示例。",
      "作者转述嘉宾自述：OpenClaw 可在多提供方间切换；并为「约 30 行 CRM 分析」vs「写约 20 封外联邮件」配置不同复杂度/成本的模型；对外消息仅在明确批准后发送（Note 陈述，非我方实测）。",
      "CRM 更新、分类与草稿生成可按任务路由到不同价位模型，并留下路由与花费记录便于复盘；发送闸门仍在人。",
    ],
    caveats: [
      "公开源未给出可复用的成本—质量曲线，上线后需用自有评测集与账单复盘，勿把「路由到便宜模型」当成省钱承诺。",
      "含个人/客户数据的任务须锁定合规区域端点与合同允许的模型；禁止把原文泄露到未批准第三方。",
      "外联与 CRM 写回须人审；失败升级策略若缺失，便宜模型的静默错分会直接污染线索池。",
    ],
    prompts: [
      {
        title: "任务路由决策卡",
        body: `你是 CRM/邮件任务的模型路由助手。根据任务类型、质量门槛与价目表，只输出路由建议，不要生成可对外发送的最终邮件正文，不要编造未提供的单价或成功率。

输出：
## 任务类型判定
## 首选模型（理由：能力门槛 + 预估相对成本）
## 失败升级路径
## 是否需要飞书/企微贵价审批
## 数据出境/合规注意
## 非目标

输入：
{{task_and_pricebook}}`,
      },
      {
        title: "外联草稿（待人审）",
        body: `根据 CRM 要点写一封中文外联草稿，标明「待人审，未发送」。只使用给定字段；缺公司名/痛点就写「待确认」占位，禁止编造电话、职位或成交承诺。文末列出所用路由模型档位（若已知）。长度 ≤180 字。

CRM 要点：
{{crm_snippet}}`,
      },
    ],
    primarySource: {
      url: "https://substack.com/@stackandscaleai/note/c-217266874",
      label: "Substack Note · stackandscaleai c-217266874（OpenClaw 按任务选最便宜够用模型 · CRM/邮件）",
      date: "2026-02-20",
      dateLabel: "发布",
    },
  },
  {
    id: "173",
    slug: "password-reset-modernize",
    title: "密码重置流程迁移到现代库",
    summary: "用编码 Agent 协助把遗留密码重置流程迁到现代认证库，补测试与安全检查清单。",
    description: "遗留项目常见自制重置链接与明文日志风险。Agent 帮助对照现代库（会话、令牌过期、速率限制）做迁移补丁与测试用例，人负责安全评审与上线。不在日志中打印令牌；不弱化现有风控。适合维护期重构。",
    categories: ["devtools"],
    platforms: ["chatgpt", "claude", "deepseek", "grok"],
    sourceUrl: "https://news.ycombinator.com/item?id=50001310",
    sourceLabel: "Hacker News",
    upvotes: 79,
    trending: false,
    tags: ["密码重置", "认证", "迁移", "安全", "编码Agent"],
    howItWorks: [
      "盘点现有重置入口、令牌存储与邮件模板",
      "生成迁移补丁与回归测试",
      "安全清单过审后分环境发布",
    ],
    tips: [
      "迁移期双轨验证：旧链与新链并行一小段时间",
      "强制令牌单次使用与短过期，并加尝试次数限制",
    ],
    approach: `Hacker News 评论里，用户 Chris_Newton 描述用 Claude Code（近 SOTA 模型、公司 API）协助把长生命周期 Web 应用里「典型密码重置流程」从遗留库迁到现代等价实现：先有 harness 计划、代理在密切监督下工作。作者自述墙钟大约半个工作日量级，API 花费大约相当于两个月 Pro 订阅；小范围代码质量尚可，但架构时常跑偏、爱顺手裹进无关改动，总体并不比他亲手做的同类迁移更快——因为必须全程看护、细审并清理输出。公开评论未给出安全漏洞计数或回归通过率。

国内落地时，Agent 只负责对照现代库生成迁移补丁与回归测试草案；人必须做安全评审与分环境发布。清单至少覆盖：令牌单次使用与短过期、速率限制、重置链接不落明文日志、邮件模板无密钥、不弱化现有风控。迁移期可短时双轨验证旧链与新链。禁止在提示词、日志或飞书讨论里粘贴真实重置令牌或生产密钥。`,
    outcomes: [
      "源未披露漏洞数、逃逸率或团队级迁移人效对比等量化；公开评论侧重一次密码重置迁移的成本与监督开销。",
      "作者自述：墙钟约半个工作日；API 花费大约相当于两个月 Pro 订阅；质量约同中级开发、对资深标准不足；相对亲手做的同类迁移总体略慢，因看护、细审与清理开销抵消了生成速度（评论陈述，非我方实测）。",
      "遗留重置流可落到「补丁 + 测试草案 + 安全清单」待审包；是否合入与上线仍由人与安全审决定。",
    ],
    caveats: [
      "公开源未给出可复用的安全基线，上线后须用自有渗透/回归清单复盘，勿把「Agent 写过迁移」当成安全承诺。",
      "硬约束：须安全评审后再发布；禁止在日志、聊天、提示词中泄露重置令牌、会话密钥或生产凭据；不得弱化速率限制与单次令牌策略。",
      "模型易顺手改无关模块；diff 必须按最小权限审，双轨期结束前勿关旧链监控。",
    ],
    prompts: [
      {
        title: "密码重置迁移检查清单",
        body: `你是认证迁移助手。对照「现有重置入口说明」与「目标现代库能力」，输出中文迁移与安全检查清单。禁止索要或回显任何真实令牌/密钥；若输入里出现疑似密钥，只输出「检测到敏感值，请脱敏后重试」。

输出：
## 现状盘点项（入口/令牌存储/邮件模板/日志）
## 迁移补丁范围（允许改 / 禁止顺手改）
## 安全清单（单次令牌、过期、速率限制、禁止明文日志等）
## 回归测试用例草案
## 发布门禁（安全审、分环境）
## 非目标

输入（已脱敏）：
{{reset_flow_notes}}`,
      },
      {
        title: "安全审阅意见（飞书）",
        body: `根据迁移 diff 摘要与测试声明，写一段可贴飞书/企微的安全审阅意见（≤200 字）：是否建议进入预发、仍存风险、须补的限制项。不要粘贴令牌或密钥；不要编造未运行的安全测试结果。

材料：
{{diff_and_tests}}`,
      },
    ],
    primarySource: {
      url: "https://news.ycombinator.com/item?id=50001310",
      label: "HN · comment 50001310（Claude Code 迁移密码重置流 · 成本与监督）",
      date: "2026-10-08",
      dateLabel: "讨论",
    },
  },
  {
    id: "174",
    slug: "lit-review-research-agent",
    title: "系统文献综述研究 Agent",
    summary: "从研究问题出发检索文献、筛选纳入标准并生成结构化综述草稿，保留每条引用可核对。",
    description: "系统综述耗时在检索与表格化。Agent 按问题与纳入/排除标准检索，生成研究问题—方法—结论对照表与综述草稿；所有论断绑定出处。人做最终纳入判断与学术诚信把关。可把表格同步飞书。不伪造未读论文的数据。",
    categories: ["education", "efficiency"],
    platforms: ["chatgpt", "claude", "deepseek", "feishu"],
    sourceUrl: "https://github.com/daltonhaslam/lit-review-agent",
    sourceLabel: "GitHub · lit-review-agent",
    upvotes: 80,
    trending: false,
    tags: ["文献综述", "研究", "引用", "学习", "结构化"],
    howItWorks: [
      "写清研究问题与纳入排除标准",
      "检索并生成对照表与综述草稿",
      "人工核对引用后定稿或继续扩检索",
    ],
    tips: [
      "先做小范围试点综述，再扩大数据库与年份",
      "每句关键结论旁强制挂引用 id，方便抽检",
    ],
    approach: `GitHub 仓库 lit-review-agent 把系统文献综述做成一套 Claude Code skills：从研究问题出发做 PICO(S)/协议锁定，再经 PubMed、OpenAlex、Semantic Scholar 等检索、去重、PRISMA 式双轮筛选、引用追踪、质量评价与结构化综合，并在流程中设置多个人工检查点；输出含执行摘要、证据表与可导入 Zotero 的引用。README 写明全文 PDF 只走合法开放获取或人工/馆际渠道，不做付费墙绕过。公开材料未给出跨课题的纳入率或撰写时长对比表。

国内落地可把研究问题、纳入/排除标准与检查点结论同步到飞书文档；证据表每行保留可核对的 DOI/PMID/题名。人做最终纳入与学术诚信把关。禁止把未读全文的数据写进结论；禁止整段抄录受版权保护的论文正文。先小范围试点再扩大库与年份。`,
    outcomes: [
      "源未披露跨项目的纳入率、撰写时长或相对人工综述的人效对比等量化；公开 README 描述的是可暂停恢复的多阶段系统综述流水线。",
      "作者/仓库说明：完整 `/lit-review` 含多个人工检查点，多数综述大约需要 4–6 个会话量级；另提供 quick/update/package 等技能变体（README 陈述，非我方实测）。",
      "从研究问题可得到带引用绑定的对照表与综述草稿，供人工核对后定稿或扩检索；学术责任仍在人。",
    ],
    caveats: [
      "公开源未给出可复用的质量基线，上线后需用自有抽检（引用可打开、数据可核对）复盘，勿把「跑通流水线」当成系统综述合格承诺。",
      "硬约束：勿抄录论文全文；每条关键论断须可核引用；未获得合法全文前不得伪造结果。付费墙绕过不在工具范围内。",
      "筛选与质量量表仍可能误判；检查点不可跳过；飞书共享时注意未发表研究问题的权限。",
    ],
    prompts: [
      {
        title: "PICO 与纳入排除草案",
        body: `你是系统综述协议助手。根据研究问题输出中文 PICO(S)、纳入/排除标准与检索词草案，供人工锁定协议。不要编造已纳入的文献列表或效应量。

输出：
## 研究问题复述
## PICO(S)
## 纳入标准 / 排除标准
## 建议数据库与年份范围
## 人工检查点（协议锁定前必停）
## 非目标

研究问题：
{{research_question}}`,
      },
      {
        title: "证据表行（可核对）",
        body: `根据给定的文献元数据与摘录，生成一行中文证据表字段：题名、年份、设计、样本、主要结论、局限、引用 id（DOI/PMID/URL）。只使用提供内容；缺字段写「待核对」。禁止粘贴大段原文，禁止添加未出现的统计数字。

文献材料：
{{paper_notes}}`,
      },
    ],
    primarySource: {
      url: "https://github.com/daltonhaslam/lit-review-agent",
      label: "GitHub · daltonhaslam/lit-review-agent（系统文献综述 Claude Code skills）",
      date: "2026-07-02",
      dateLabel: "创建",
    },
  },
  {
    id: "175",
    slug: "multi-tool-coding-agent-prs",
    title: "跨工具用编码 Agent 多开可审 PR",
    summary:
      "在 Issue/CI/文档等多个工具间串联编码 Agent，批量开出可独立审阅的小 PR，加快交付。",
    description:
      "与「本地多会话并行改同一仓库」不同：本条强调跨工具编排（任务板、CI、审阅箱），把积压项切成可审小 PR。人只做合并裁决。适合独立开发与小团队清 backlog。不自动合并；不把无测试的大爆炸改动一次塞进一个 PR。",
    categories: ["devtools", "efficiency"],
    platforms: ["chatgpt", "claude", "deepseek", "grok"],
    sourceUrl: "https://x.com/ryancarson/status/2035746736803614981",
    sourceLabel: "X 原帖",
    upvotes: 84,
    trending: false,
    tags: ["多工具", "Pull Request", "编码Agent", "交付", "开发者"],
    howItWorks: [
      "从任务板拉取可自动化的小项并切分",
      "Agent 跨工具取上下文、开分支并开 PR",
      "CI 绿后进入人工审阅队列",
    ],
    tips: [
      "单 PR 单主题，标题写清动机与风险",
      "与本地并行会话约定文件所有权，避免互相覆盖",
    ],
    approach: `X 上 Ryan Carson 发帖称付费使用 Devin，看重其远程优先与跨表面可用性（帖中点名 iPhone、Slack、Browser、GitHub、Linear），并表示厌倦了自己用 Open Inspect + Codex + Linear 手工串工具；以个人有效时薪衡量，继续手搭与维护不再划算。作者自述迄今 PR 交付速度高于此前，并计划下一周继续全职试用后反馈。帖中未给出 PR 数、周期或缺陷率等具体数字。

国内落地时，重点不是「换某个品牌 Agent」，而是跨任务板 / CI / 文档把积压切成可独立审阅的小 PR：Agent 负责取上下文、开分支与开 PR，CI 绿后进入人工审阅队列；合并裁决必须由人完成，禁止自动合入。可与飞书/企微任务板或 GitHub/GitLab Issue 对齐；单 PR 单主题，并与本地多会话约定文件所有权，避免互相覆盖。`,
    outcomes: [
      "源未披露 PR 吞吐量、周期时间或缺陷逃逸等量化；公开帖只作定性对比。",
      "作者自述：付费约 $500 使用 Devin；跨 iPhone/Slack/Browser/GitHub/Linear 可用；迄今 PR shipping velocity 高于使用前（帖文陈述，非我方实测）。",
      "积压项可被切成进入人工审阅队列的小 PR；是否合入生产仍由人与 CI 门禁决定。",
    ],
    caveats: [
      "公开源未给出可复用的交付基线，上线后需用自有 PR/回滚台账复盘，勿把「开了更多 PR」当成质量或速度承诺。",
      "硬约束：PR 须人工审阅后再合入；禁止无测试的大爆炸改动单 PR 塞入；CI 红不得强合。",
      "跨工具授权（代码仓、任务板、聊天）属高权限；密钥与生产数据不要交给未评估的第三方 Agent。",
    ],
    prompts: [
      {
        title: "可审小 PR 切分单",
        body: `你是跨工具编码交付助手。根据任务板积压与仓库约束，把工作切成可独立审阅的小 PR 列表。禁止假设可以自动合并；禁止把无关重构塞进同一 PR。

输出 Markdown：
## PR 列表（标题 / 动机 / 触及路径 / 风险 / 测试计划）
## 文件所有权（避免与其他会话冲突）
## CI 门禁
## 人工审阅要点
## 非目标

积压与约束：
{{backlog_brief}}`,
      },
      {
        title: "PR 审阅队列摘要（飞书）",
        body: `把待审 PR 列表压成可贴飞书/企微的中文摘要（≤180 字）：各 PR 主题、CI 状态（仅使用给定信息）、需人拍板项。不要编造通过率或已合入结论。

待审列表：
{{pr_queue}}`,
      },
    ],
    primarySource: {
      url: "https://x.com/ryancarson/status/2035746736803614981",
      label: "X · @ryancarson（Devin 跨工具开 PR · 交付速度自述）",
      date: "2026-03-22",
      dateLabel: "发布",
    },
  },
  {
    id: "176",
    slug: "docs-ai-cli-tools-page-update",
    title: "用 Agent 更新 AI CLI 工具文档页",
    summary:
      "对照最新 CLI 行为与帮助输出，自动刷新文档页中的命令、参数与示例，提交可审改动。",
    description:
      "AI CLI 迭代快，文档易过期。Agent 读取帮助输出与仓库示例，比对文档页，生成补丁式更新（新增旗标、废弃说明）。人审后合并。不编造未发布的命令；示例需可运行或标明伪代码。",
    categories: ["content", "devtools"],
    platforms: ["chatgpt", "claude", "deepseek", "n8n"],
    sourceUrl: "https://thegroundtruth.substack.com/p/devin-first-impressions",
    sourceLabel: "Substack · Agent 文档更新线索",
    upvotes: 77,
    trending: false,
    tags: ["文档", "CLI", "AI工具", "内容", "开发者"],
    howItWorks: [
      "拉取 CLI 帮助/变更日志与现有文档",
      "生成差异补丁与示例更新",
      "开文档 PR，人工核对后发布",
    ],
    tips: [
      "每个命令示例旁标注测试过的版本号",
      "废弃命令保留「迁移到」链接，避免死胡同",
    ],
    approach: `作者在 Substack《Devin - First Impressions》里写过一条具体任务：让编码 Agent（文中为 Devin）更新自己站点上「AI 编程相关 CLI 工具列表」页面——先摸清现有条目的格式，再从该工具 GitHub 仓库取一句描述，按同样版式把新工具加进列表。作者自述约 5 分钟内拿到第一版 PR；过程中出现「当前日期认知错乱」（一度把 2024-12 当未来日期），经 CLI \`date\` 与来回纠正后才改对页上日期。公开文未给出文档新鲜度、错误命令率或人审驳回率等量化。

国内落地可把「帮助输出 / 变更日志 / 仓库示例」与现有文档页一并交给 Agent，只生成补丁式 diff 与文档 PR；每个示例旁标注测过的版本号，废弃命令保留「迁移到」链接。硬约束：文档改动必须人审后再发布/合并，禁止编造未发布旗标或伪造成熟度；示例需可运行或明确标为伪代码。审阅意见与待合并清单可同步飞书/企微文档群。`,
    outcomes: [
      "源未披露文档新鲜度、错误命令检出率或人审驳回率等量化；公开文只描述「列表页格式对齐→GitHub 一句描述→开 PR」的文档更新任务。",
      "作者自述：该 CLI 工具列表页更新任务约 5 分钟内拿到第一版 PR；中间因日期认知问题需来回纠正后才改对页内日期（文章陈述，非我方实测）。",
      "文档从「手抄过期帮助」变成可审的补丁式 PR；是否合入与对外发布仍由人决定。",
    ],
    caveats: [
      "公开源未给出可复用的文档质量基线，上线后需用自有 CLI 版本矩阵复盘，勿把「出过 PR」当成文档正确承诺。",
      "硬约束：文档改动须人审后再发；禁止编造未发布命令/旗标；示例旁保留版本号，废弃项须给迁移链接。",
      "模型可能弄错日期或漏扫页面；合并前用帮助输出与真实 `--help` 对照，飞书/企微讨论勿贴生产密钥。",
    ],
    prompts: [
      {
        title: "CLI 文档差异补丁草案",
        body: `你是 CLI 文档更新助手。对照「帮助输出/变更日志」与「现有文档页」，只输出可审的中文差异说明与补丁草案。禁止编造未出现在帮助输出里的命令或旗标；不确定处标「待确认」。

输出 Markdown：
## 新增（命令/旗标/示例 + 依据摘录）
## 修改
## 废弃（保留「迁移到」）
## 示例旁建议标注的版本号
## 需人审项
## 非目标（本轮不改产品代码/不直接发布）

帮助与文档：
{{cli_help_and_docs}}`,
      },
      {
        title: "文档 PR 人审清单（飞书）",
        body: `把文档 diff 压成可贴飞书/企微的人审清单（≤180 字）：改动摘要、须人工核对的命令、是否允许合并发布。明确写「待人审，未发布」。不要添加未提供的下载量或兼容性承诺。

diff 摘要：
{{docs_diff}}`,
      },
    ],
    primarySource: {
      url: "https://thegroundtruth.substack.com/p/devin-first-impressions",
      label: "Substack · Devin - First Impressions（AI CLI 工具列表页内容更新任务）",
      date: "2025-01-16",
      dateLabel: "发布",
    },
  },
  {
    id: "177",
    slug: "growth-ad-variations-pull-data",
    title: "生成广告变体并拉取投放数据",
    summary:
      "按卖点批量生成广告文案/创意变体，并拉取投放数据做成飞书周报，辅助增长迭代。",
    description:
      "增长同学需要「多变体 + 看数据」闭环。Agent 基于产品卖点生成合规文案变体，对接可读的投放数据导出，汇总到飞书表格/文档。不自动改预算；不编造花费与转化。素材二次发布注意版权。",
    categories: ["content", "efficiency"],
    platforms: ["feishu", "chatgpt", "claude", "n8n"],
    sourceUrl:
      "https://dev.to/danishashko/claude-code-for-growth-marketing-hell-yeah-i7i",
    sourceLabel: "DEV.to · 增长营销实践",
    upvotes: 81,
    trending: false,
    tags: ["广告变体", "投放数据", "增长", "飞书", "内容"],
    howItWorks: [
      "输入卖点、受众与禁词表，生成变体清单",
      "拉取投放导出数据并对齐变体 id",
      "输出飞书周报：头部创意、衰退创意、下步实验",
    ],
    tips: [
      "变体命名带实验编号，方便和后台数据对齐",
      "涉及医疗金融等行业先过合规词表再生成",
    ],
    approach: `DEV.to 文复盘 Anthropic 公开增长自动化材料，并说明如何用 Claude Code 复刻模式：从含历史文案与指标的 CSV 筛「需迭代」广告；拆成标题/描述两个子 Agent（分别卡字数）；批量写出变体并打实验编号；可用设计工具插件按模板换文生成多套视觉；再用投放平台 API/MCP 拉花费与创意表现，把假设、参数与结果记进轻量记忆，方便下一轮参考。文中给出的影响口径是作者转述/归纳的实践结果，不是独立第三方审计。公开文同时强调上线前仍要人做品牌与合规 QA，模型可能幻觉指标或捏造卖点。

国内落地把卖点、受众与禁词表写入飞书/企微；变体命名带实验编号，与后台导出按 id 对齐；周报只汇总头部/衰退创意与下一步实验，禁止 Agent 自动改预算或自动烧花费。素材二次发布注意版权；医疗金融等先过合规词表。硬约束：广告素材与投放动作须人确认后再上线。`,
    outcomes: [
      "源未披露可独立复现的花费、转化率或账户级 ROI 对比表；公开文侧重「变体生成→拉数→记忆假设」闭环描述。",
      "作者转述/归纳：单次活动刷新的文案制作大约从两小时降到约 15 分钟、创意产出量级大约提升约 10 倍，并强调仍需人做品牌与合规 QA（文章陈述，非我方实测）。",
      "增长同学可得到「变体清单 + 对齐后的投放导出 + 飞书周报」；预算调整与正式投放闸门仍在人。",
    ],
    caveats: [
      "公开源未给出可复用的投放效果基线，上线后需用自有账户复盘，勿把「出过很多变体」当成获客承诺。",
      "硬约束：广告素材与投放须人确认；禁止自动改预算或自动烧花费；勿编造花费/转化数字。",
      "模型可能幻觉卖点或违规承诺；医疗金融等须过合规词表；素材版权与平台政策各自负责。",
    ],
    prompts: [
      {
        title: "广告变体清单（待人审）",
        body: `你是增长文案助手。根据卖点、受众与禁词表生成中文广告变体清单，标明「待人审，未投放」。严格遵守字数上限；禁止编造未提供的折扣、疗效或资质；命中禁词则改写或标「违规跳过」。

输出：
## 实验编号规则
## 标题变体（每条：文案 / 字数 / 语气标签）
## 描述变体
## 需合规确认项
## 非目标（不改预算、不直接创建广告）

输入：
{{offer_audience_banned}}`,
      },
      {
        title: "投放数据飞书周报",
        body: `只根据给定的投放导出字段写飞书/企微周报（≤200 字）：头部创意、衰退创意、建议的下一步实验。数字必须来自输入；缺失就写「源未提供」。不要建议自动加预算；结尾写「投放变更须人确认」。

导出数据：
{{campaign_export}}`,
      },
    ],
    primarySource: {
      url: "https://dev.to/danishashko/claude-code-for-growth-marketing-hell-yeah-i7i",
      label: "DEV.to · Claude Code for Growth Marketing（广告变体 + 拉投放数据）",
      date: "2025-11-02",
      dateLabel: "发布",
    },
  },
  {
    id: "178",
    slug: "meeting-app-from-prompt-ship",
    title: "一句话提示构建并部署会议应用",
    summary:
      "用自然语言描述会议场景，让编码 Agent 生成可部署的轻量会议/预约应用原型并上线演示。",
    description:
      "适合快速验证「预约+提醒+简单日程」类想法。Agent 从提示生成最小前后端与部署配置，先出演示链接；登录与支付后置。与飞书会议纪要类用例不同：本条是从零搭应用壳。演示环境勿连生产日历密钥。",
    categories: ["devtools", "efficiency"],
    platforms: ["chatgpt", "claude", "deepseek", "doubao"],
    sourceUrl: "https://x.com/socialwithaayan/status/1986663983777259839",
    sourceLabel: "X 原帖",
    upvotes: 78,
    trending: false,
    tags: ["会议应用", "提示即产品", "快速部署", "MVP", "编码Agent"],
    howItWorks: [
      "用一句话写清主路径与非目标",
      "Agent 生成可运行原型并部署演示环境",
      "收集反馈后再补权限、通知与正式域名",
    ],
    tips: [
      "首版只做创建/加入/提醒三件事，拒绝功能堆叠",
      "演示数据与真实用户日历隔离",
    ],
    approach: `X 上 @socialwithaayan 发帖称：用一句话让 Replit 构建会议管理应用——追踪议程、参会人与行动项，并含有效性/参与度/跟进完成等分析；作者自述「几分钟内」生成仪表盘、业务逻辑、分析页并部署到公网，自己没有手写一行代码。线程里展示的是演示向成果（干净仪表盘、任务/行动追踪、周期会议模板、响应式界面），不是生产级安全审计报告。公开帖未给出独立压测、缺陷数或留存数据。

国内落地时，提示词写清主路径与非目标（首版只做创建/加入/提醒），先部署演示环境；登录、支付与正式域名后置。演示数据与真实用户日历、飞书/企微生产密钥隔离。硬约束：上线/公开必须人审，禁止把演示环境密钥写进生产，也勿自动对真实用户发通知。`,
    outcomes: [
      "源未披露独立压测、缺陷密度、留存或转化等量化；公开帖侧重「一句话提示→生成并部署演示」叙述。",
      "作者自述：几分钟内得到含仪表盘、逻辑与分析的会议应用并部署上线，且声称未手写一行代码（原帖陈述，非我方实测）。",
      "可快速得到可点开的会议/预约应用壳用于收集反馈；正式权限、通知与域名仍须人审后补齐。",
    ],
    caveats: [
      "公开源未给出可复用的质量基线，演示跑通≠可服务真实用户；上线后需自有验收清单复盘。",
      "硬约束：上线须人审；演示环境勿连接生产日历/飞书密钥；勿对真实用户自动发会议提醒。",
      "「提示即产品」易堆功能；首版卡住创建/加入/提醒三件事，支付与复杂权限后置。",
    ],
    prompts: [
      {
        title: "会议应用一句话规格",
        body: `你是产品规格助手。把用户想法收敛成一版可交给编码 Agent 的中文规格，首版只允许：创建会议、加入会议、提醒。登录/支付/复杂权限标为非目标。

输出：
## 一句话主路径
## 页面清单（≤5）
## 数据字段
## 非目标
## 演示环境约束（禁止连生产日历/密钥）
## 人审上线检查点

想法：
{{idea}}`,
      },
      {
        title: "上线人审清单",
        body: `根据演示链接与变更说明，写可贴飞书/企微的上线人审清单（≤180 字）：是否允许公网访问、数据是否仍为演示、密钥隔离是否确认。明确「待人审，未正式上线」。不要编造未跑过的安全测试。

材料：
{{demo_notes}}`,
      },
    ],
    primarySource: {
      url: "https://x.com/socialwithaayan/status/1986663983777259839",
      label: "X · @socialwithaayan（一句话用 Replit 构建并部署会议应用）",
      date: "2025-11-07",
      dateLabel: "发布",
    },
  },
  {
    id: "179",
    slug: "solo-company-agent-departments",
    title: "一人公司用多 Agent 部门运转",
    summary:
      "把内容、客服、研发等角色拆成常驻 Agent「部门」，用统一收件箱审批产出，支撑一人公司日常。",
    description:
      "独立创业者身兼多职。把重复角色变成带职责说明的 Agent，产出进入审批收件箱（可对接飞书），人只做决策与对外签字。与「后台邮件式审批」同构，但叙事聚焦一人公司部门划分。禁止无审批自动对外发公告或扣款。",
    categories: ["efficiency", "content"],
    platforms: ["chatgpt", "claude", "feishu", "n8n"],
    sourceUrl:
      "https://dev.to/setas/i-run-a-solo-company-with-ai-agent-departments-50nf",
    sourceLabel: "DEV.to · 一人公司 Agent 部门",
    upvotes: 83,
    trending: false,
    tags: ["一人公司", "多Agent", "部门", "审批", "效率"],
    howItWorks: [
      "定义各部门职责、工具权限与升级规则",
      "各部门产出进入统一审批收件箱",
      "人批准后执行发布/发送/合并",
    ],
    tips: [
      "先开两个部门跑通，再扩展，避免编排过载",
      "对外承诺类输出强制人工，内部草稿可自动",
    ],
    approach: `DEV.to 作者自述以一人公司运营多款 SaaS，用 GitHub Copilot 自定义 Agent 搭了 8 个「部门」：CEO、CFO、COO、Lawyer、Accountant、Marketing、CTO，以及负责升级其他部门的 Improver。各部门是带职责与工具权限的 markdown Agent 文件，共享持久知识图谱，跨域时自动互相征询（如 Marketing 的产品宣称先过 Lawyer），并由 COO 做晨间编排。作者强调这不是取代思考，战略与「感觉不对」的决策仍在人；文末建议若重来可先开约 3 个部门再扩展。

国内落地把部门职责、工具权限与升级规则写进飞书/企微知识库；各部门产出进统一审批收件箱，人批准后再发布/发送/合并。对外承诺、公告与扣款类动作强制人工；内部草稿可自动。先开两个部门跑通（与 tips 一致），再扩展，避免编排过载。`,
    outcomes: [
      "源未披露可对照的对照组人效或客单价提升曲线；公开文以作者两个月自述运营结果为主。",
      "作者自述（约两个月）：营收约 €6.09、基础设施约 €42/月、产出 84+ 条推文与 5 篇 DEV 文、营销耗时每周不足 1 小时、合规截止零遗漏；同时坦言营收仍很低（文章陈述，非我方实测）。",
      "一人公司可把重复角色变成带审批闸门的 Agent 部门结构；对外签字与扣款仍在人。",
    ],
    caveats: [
      "公开源的数字均为作者自述小样本，勿当成「上多 Agent 就能盈利」的承诺；需用自有账本复盘。",
      "禁止未审批自动对外发公告或扣款；跨部门互审可降幻觉，但不能替代法人/合规责任。",
      "部门过多易编排过载；先少后多，并注意共享记忆的并发写入与权限隔离。",
    ],
    prompts: [
      {
        title: "部门职责与权限卡",
        body: `你是一人公司编排助手。根据业务列表输出中文「Agent 部门」职责卡。对外发布/付款标为必须人批；内部草稿可自动。

输出：
## 建议先开的 2 个部门（理由）
## 每部门：职责 / 可读工具 / 可写动作 / 升级规则
## 统一审批收件箱字段
## 禁止自动执行清单
## 非目标

业务：
{{solo_biz}}`,
      },
      {
        title: "审批收件箱摘要（飞书）",
        body: `把各部门待批产出压成飞书/企微审批摘要（≤180 字）：来源部门、动作类型、风险点、建议批准/驳回。对外承诺与扣款必须标「强制人工」。不要添加未提供的收入数字。

待批项：
{{inbox_items}}`,
      },
    ],
    primarySource: {
      url: "https://dev.to/setas/i-run-a-solo-company-with-ai-agent-departments-50nf",
      label: "DEV.to · I Run a Solo Company with AI Agent Departments（八部门 Agent）",
      date: "2026-03-03",
      dateLabel: "发布",
    },
  },
  {
    id: "180",
    slug: "personal-assistant-repo-and-chores",
    title: "个人助理兼顾仓库事务与生活杂事",
    summary:
      "同一个个人助理 Agent 既跟仓库 Issue/PR，也处理购物清单、提醒等生活杂事，统一收件与优先级。",
    description:
      "开发者的个人助理往往割裂成「代码」和「生活」两套。统一入口：早间摘要合并仓库待办与生活事项，按优先级排序；写代码类动作走分支闸门，生活类走确认后执行。可推飞书待办。不自动推送生产；不擅自下单支付。",
    categories: ["efficiency", "life"],
    platforms: ["chatgpt", "claude", "grok", "feishu"],
    sourceUrl: "https://news.ycombinator.com/item?id=49766401",
    sourceLabel: "Hacker News",
    upvotes: 82,
    trending: false,
    tags: ["个人助理", "仓库", "生活杂事", "优先级", "效率"],
    howItWorks: [
      "连接仓库只读/有限写权限与生活清单源",
      "生成统一优先级摘要",
      "分通道执行：代码开 PR，生活项确认后勾办",
    ],
    tips: [
      "两套权限分离：生活助理无权推 main",
      "摘要控制在一屏，超出则只留 P0/P1",
    ],
    approach: `Hacker News 评论里，用户 Frannky 描述用开源 harness（文中称 oh-my-py）把同一套个人助理既用于编码编排，也用于生活办事：可让它在仓库开 Issue，再由另一 Agent 写代码、跑测试并在发版后更新主干；也可让它处理买菜等杂事——作者提到用 Bitwarden 机器密钥与额度受限的虚拟卡。评论还提到按最便宜且满足最低吞吐的供应商排序、并行派互不重叠的 Agent，以及用开源权重模型换取更高自主性。公开评论未给出每周节省小时或采购差错率等量化。

国内落地用统一早间摘要合并仓库待办与生活事项，推到飞书待办；代码动作只开 PR/分支，生活项确认后再勾办。硬约束：仓库合并与采购/付款必须人确认，禁止越权付款或自动推生产；生活助理无权推 main，摘要超出一屏只留 P0/P1。`,
    outcomes: [
      "源未披露每周节省时长、Issue 吞吐或采购差错率等量化；公开评论只描述「同一助理兼顾仓库与杂事」的用法。",
      "作者自述：可让助理开仓库 Issue并由另一 Agent 交付代码/测试/发版更新；也可处理买菜等，配合机器密钥与额度受限虚拟卡；支持并行互不重叠任务（评论陈述，非我方实测）。",
      "个人待办从「代码一套、生活一套」收成统一优先级摘要；推生产与真实付款闸门仍在人。",
    ],
    caveats: [
      "公开源未给出可复用的人效基线，上线后需用自有仓库与账单复盘，勿把「能开 Issue 又能买菜」当成无风险承诺。",
      "硬约束：仓库操作与采购须人确认；禁止越权付款或自动推 main/生产；虚拟卡须限额并与机器密钥权限分离。",
      "并行 Agent 易文件冲突；生活通道与代码通道权限必须拆开，飞书待办勿暴露完整支付凭据。",
    ],
    prompts: [
      {
        title: "统一早间优先级摘要",
        body: `你是个人助理摘要器。合并仓库待办与生活清单，输出一屏内的中文优先级摘要。超出则只留 P0/P1。不要执行合并到 main，不要发起真实付款。

输出：
## P0
## P1
## 可延后
## 需人确认才能执行（标仓库/采购）
## 非目标

输入：
{{repo_and_chores}}`,
      },
      {
        title: "分通道执行清单（飞书）",
        body: `把摘要转成飞书/企微待办清单（≤180 字）：代码项写「仅开 PR/分支」；生活项写「确认后勾办」。涉及下单/付款必须写「待人确认，勿越权付款」。不要编造订单号或卡号。

摘要：
{{priority_digest}}`,
      },
    ],
    primarySource: {
      url: "https://news.ycombinator.com/item?id=49766401",
      label: "HN · comment 49766401（oh-my-py 个人助理：仓库 Issue + 买菜等杂事）",
      date: "2026-09-19",
      dateLabel: "讨论",
    },
  },
  {
    id: "181",
    slug: "query-hn-arxiv-corpus",
    title: "用自然语言查询 HN/arXiv/LessWrong 大规模语料",
    summary:
      "对 HN、arXiv、LessWrong 等本地或镜像语料用自然语言提问，快速检索论点、出处与相关讨论。",
    description:
      "研究与自学常卡在「知道大概在哪、却翻不动海量帖与论文」。Agent 对接已索引的公开语料（或自建检索层），用自然语言返回带出处的摘要与链接。适合文献调研与观点溯源。只读公开数据；不绕过站点条款批量抓取；不伪造引用。",
    categories: ["education", "efficiency"],
    platforms: ["chatgpt", "claude", "deepseek", "kimi"],
    sourceUrl: "https://news.ycombinator.com/item?id=46442245",
    sourceLabel: "Hacker News",
    upvotes: 86,
    trending: false,
    tags: ["语料检索", "自然语言查询", "arXiv", "Hacker News", "研究"],
    howItWorks: [
      "选定已授权的语料索引或本地检索层",
      "用自然语言提问，Agent 返回带出处的片段与链接",
      "人核对引用后再写入笔记或报告",
    ],
    tips: [
      "问题尽量带时间范围与领域词，减少跑偏",
      "重要结论必须点开原文核对，勿只信摘要",
    ],
    approach: `Hacker News Show HN（item 46442245，作者 Xyra）介绍把一段含只读 API 密钥的提示词贴进 Claude Code，即可对作者托管的公开只读 SQL+向量库提问：覆盖 Hacker News、arXiv、LessWrong 等公开语料；由模型生成在其机器上安全执行的 SQL，返回答案，并带 Alerts——把查询登记为告警，条件满足或结果变化时发邮件。帖中自述嵌入规模约为 posts 1.4M/4.6M、comments 15.6M/38M（Voyage-3.5-lite），标题称约 600 GB 索引；亦提到组合式向量检索写法。公开帖未给出检索精确率、召回或幻觉引用率等量化。

国内落地选定已授权索引或本地检索层，用自然语言提问并强制「带出处片段+链接」；问题尽量加时间范围与领域词。结果先写入飞书/企微调研笔记，人点开原文核对后再引用。硬约束：只读公开数据，不绕过站点条款批量抓取，不伪造引用；密钥与配额放隔离账号，讨论群勿贴可写密钥。`,
    outcomes: [
      "源未披露检索精确率、召回、幻觉引用率或人审驳回率等量化；公开帖侧重「自然语言→只读 SQL/向量库→带出处回答/告警」能力描述。",
      "作者自述：可用 Claude Code 对接约 600 GB 级公开索引（HN/arXiv/LessWrong 等），帖中给出 posts/comments 嵌入规模数量级，并支持把查询登记为邮件 Alerts（帖文陈述，非我方实测）。",
      "研究笔记从「手工翻帖」变成可溯源的问答草稿；是否写入正式报告仍由人核对原文后决定。",
    ],
    caveats: [
      "公开源未给出可复用的检索质量基线，上线后需用自有金标问题集复盘，勿把「能跑通查询」当成引用正确承诺。",
      "硬约束：只读公开语料；禁止绕过站点条款抓取；重要结论必须点开原文；禁止伪造 DOI/链接。",
      "嵌入 API 与只读库配额要隔离；飞书/企微笔记勿粘贴可写密钥；组合检索提示词过宽时易跑偏，需加时间与领域约束。",
    ],
    prompts: [
      {
        title: "带出处的语料问答草案",
        body: `你是公开语料检索助手。只根据给定检索片段作答，每条论点必须带出处（来源名、标题/ID、链接或定位信息）。禁止编造未出现在片段里的论文或评论；不确定标「待核对原文」。

输出 Markdown：
## 直答（≤120 字）
## 论据列表（论点 / 出处 / 原文摘录≤40 字）
## 冲突观点（若有）
## 需人点开原文核对的项
## 非目标（不批量抓取、不改索引、不伪造引用）

问题与片段：
{{question_and_hits}}`,
      },
      {
        title: "调研笔记飞书卡片",
        body: `把带出处的问答压成可贴飞书/企微的调研笔记（≤180 字）：问题、三条最相关出处、一句谨慎结论。结尾写「待人核对原文，未定稿」。不要添加未提供的引用或下载量。

问答草案：
{{qa_draft}}`,
      },
    ],
    primarySource: {
      url: "https://news.ycombinator.com/item?id=46442245",
      label: "HN · Show HN 46442245（Claude Code 查询 HN/arXiv/LessWrong 等大规模只读索引）",
      date: "2025-12-31",
      dateLabel: "讨论",
    },
  },
  {
    id: "182",
    slug: "persistent-finance-research-agent",
    title: "用持久化 Agent 做金融研究笔记",
    summary:
      "持久化 Agent 按主题持续收集公开财报与研报线索，整理成可审阅的飞书研究笔记，非投资建议。",
    description:
      "金融研究需要跨多日积累上下文。持久会话记住关注标的与问题清单，把公开公告、财报要点与争议点写入飞书文档，供人复核。本用例仅辅助笔记与信息整理，非投资建议；不荐股、不编造收益、不下单。敏感内部数据勿接入。",
    categories: ["efficiency", "devtools"],
    platforms: ["chatgpt", "claude", "deepseek", "feishu"],
    sourceUrl: "https://news.ycombinator.com/item?id=47766370",
    sourceLabel: "Hacker News",
    upvotes: 79,
    trending: false,
    tags: ["金融研究", "持久化Agent", "飞书笔记", "非投资建议", "效率"],
    howItWorks: [
      "设定关注主题、公开数据源与笔记模板",
      "Agent 跨会话追加摘要并同步到飞书文档",
      "人审阅标注可信度后再决定是否引用",
    ],
    tips: [
      "每条笔记标明数据日期与来源链接",
      "输出页眉固定写「非投资建议」，避免误用为荐股",
    ],
    approach: `Hacker News Show HN（item 47766370，LangAlpha / ginlix-ai）说明金融研究场景里「单次交付物」不够用：财报更新、竞品出数都要在旧分析上叠加。作者做法是以 workspace 映射持久沙箱，Agent 维护 findings 记忆文件与文件索引，每次 LLM 调用前重读，从而跨会话续写同一研究目标；同时把 MCP schema 在初始化时生成 typed Python 模块供 import，约 80 个工具只在提示里留每服务一行摘要，避免把五年日频行情一次性倒进上下文。帖文还提到把组合、观察列表、风险偏好与数据源注入每次调用。公开帖未给出收益、胜率或回测曲线等投资绩效量化。

国内落地只把它当「公开信息研究笔记」：关注主题、公开数据源与飞书文档模板写清；Agent 跨会话追加摘要到飞书，人审可信度后再决定是否引用。硬约束：本用例非投资建议，禁止荐股、编造收益、自动下单或对接实盘交易；敏感内部数据勿接入；页眉固定「非投资建议」。`,
    outcomes: [
      "源未披露可独立复现的收益、胜率、回测或人审差错率等量化；公开帖侧重「持久 workspace + 记忆/文件索引 + MCP 工具压缩」的研究 harness 描述。",
      "作者自述：研究可跨会话续写（记忆文件与文件索引每次重读）；用 schema→typed 模块降低工具提示成本，约 80 工具时提示开销不随工具数线性膨胀（帖文陈述，非我方实测）。",
      "研究员可得到按主题追加的飞书研究笔记草稿；是否引用、是否形成观点仍由人审，且不得当作下单依据。",
    ],
    caveats: [
      "公开源未给出投资绩效或笔记准确率基线，勿把「持久会话」理解成可盈利或可自动交易；上线后只用自有公开信息复盘笔记质量。",
      "硬约束：非投资建议；禁止荐股、编造收益、自动下单或连接实盘/券商下单接口；输出页眉写「非投资建议」。",
      "模型可能幻觉财务数字；每条笔记须标数据日期与来源链接；飞书文档权限按需最小化，勿写入未公开内幕信息。",
    ],
    prompts: [
      {
        title: "金融研究笔记追加稿（非投资建议）",
        body: `你是金融研究笔记助手，只整理公开信息。页眉第一行必须写「非投资建议｜不下单｜不荐股」。根据主题与公开材料追加中文笔记，禁止给出买入/卖出/仓位建议，禁止编造未提供的收益或股价目标。

输出：
## 本轮新增要点（每条：事实摘要 / 来源链接或标题 / 数据日期）
## 争议点与待核实
## 可信度初标（高/中/低 + 理由）
## 非目标（不荐股、不下单、不写目标价）

输入：
{{theme_and_public_clips}}`,
      },
      {
        title: "飞书笔记人审摘要",
        body: `把追加稿压成飞书/企微人审摘要（≤180 字）：主题、新增条数、须人工核对的数字、是否允许写入正式资料库。必须出现「非投资建议，待人审」。不要添加未提供的收益率。

追加稿：
{{note_draft}}`,
      },
    ],
    primarySource: {
      url: "https://news.ycombinator.com/item?id=47766370",
      label: "HN · Show HN 47766370（LangAlpha：持久 workspace 做金融研究）",
      date: "2026-04-14",
      dateLabel: "讨论",
    },
  },
  {
    id: "183",
    slug: "company-dept-self-hosted-agents",
    title: "自托管 Agent 跑公司部门任务",
    summary:
      "在自有基础设施上持久部署多 Agent，承接部门级例行任务，数据与进程留在公司边界内。",
    description:
      "与一人公司「多 Agent 扮演部门」叙事（见 id 179）不同：本条强调自托管部署——Agent 跑在公司自有机器/内网，持久进程处理工单、周报、知识库同步等部门任务，经飞书/企微通知人审。侧重基础设施与数据驻留，而非一人公司角色扮演。对外发送与权限变更须审批；密钥不落公有会话。",
    categories: ["enterprise", "efficiency"],
    platforms: ["feishu", "wecom", "n8n", "chatgpt", "claude"],
    sourceUrl: "https://news.ycombinator.com/item?id=49630606",
    sourceLabel: "Hacker News",
    upvotes: 88,
    trending: false,
    tags: ["自托管", "部门任务", "企业", "持久运行", "飞书企微"],
    howItWorks: [
      "在自有环境部署 Agent 运行时与任务队列",
      "按部门接入只读/受限写工具与飞书企微通道",
      "产出进审批队列，人确认后再执行对外动作",
    ],
    tips: [
      "先跑只读汇总类任务，再逐步开放写权限",
      "进程与密钥用隔离账号，便于审计与回收",
    ],
    approach: `Hacker News Show HN（item 49630606，作者 Dimitris / OtoDock）介绍一套可自托管的「公司 OS」：把 Claude Code、Cowork 与云会话能力收成自有机器上的多租户应用，部门级 Agent 以持久进程运行；默认 kernel sandbox（bubblewrap）与网络隔离（pasta），各有 workspace、记忆、日程与工具；也可经单向外连 WebSocket 在远程电脑跑同样 Agent。协作上强调多人共用公司 Agent 的多种模式，可用 Anthropic/OpenAI 订阅或本地模型；安装为一键脚本 + docker compose，Fair Source，自托管免费额度帖文写到 5 用户。公开帖未给出人效提升、故障率或审计通过率等量化。

国内落地在自有环境部署运行时与任务队列，按部门接入只读/受限写工具，产出经飞书/企微进审批队列。硬约束：对外发送、权限变更与花钱必须人审；先跑只读汇总再逐步开放写权限；进程与密钥用隔离账号便于审计回收；勿把未审批动作直接打到生产业务系统。`,
    outcomes: [
      "源未披露部门人效、任务完成率、安全事件数或审计通过率等量化；公开帖侧重自托管部署、沙箱隔离与部门持久 Agent 能力描述。",
      "作者自述：自建并用于经营的公司 OS，Agent 可持续跑在自有服务器沙箱中，支持多租户协作与本地/云模型；安装为脚本 + docker compose，并称自托管免费至约 5 用户（帖文陈述，非我方实测）。",
      "部门例行任务可变成「自有边界内的持久草稿+审批」；对外动作与权限变更闸门仍在人。",
    ],
    caveats: [
      "公开源未给出可复用的经营或安全基线，上线后需用自有工单与审计日志复盘，勿把「能自托管」当成免审无人值守承诺。",
      "硬约束：对外发送、改权限、花钱必须人审；默认最小权限；生产宿主机与 Agent 沙箱隔离，密钥不落公有会话。",
      "网络隔离与 bubblewrap 不能替代业务审批；多人协作时要分清租户与部门数据边界，飞书/企微通知勿夹带完整密钥。",
    ],
    prompts: [
      {
        title: "部门任务权限边界卡",
        body: `你是企业 Agent 治理助手。根据部门任务清单输出中文权限边界卡。默认拒绝对外副作用；只读汇总可自动，写操作与对外发送必须人批。

输出：
## 部门与任务
## 可读工具 / 可写动作 / 禁止动作
## 升级与人审条件
## 密钥与进程隔离要求
## 非目标（不直连生产改权限、不未批外发）

任务清单：
{{dept_tasks}}`,
      },
      {
        title: "审批队列飞书摘要",
        body: `把待批产出压成飞书/企微审批摘要（≤180 字）：来源部门、动作类型、数据驻留位置、风险点、建议批准/驳回。涉及外发/权限/支付必须标「强制人工」。不要编造未提供的节省工时。

待批项：
{{approval_items}}`,
      },
    ],
    primarySource: {
      url: "https://news.ycombinator.com/item?id=49630606",
      label: "HN · Show HN 49630606（OtoDock：自托管公司 OS / 部门持久 Agent）",
      date: "2026-09-09",
      dateLabel: "讨论",
    },
  },
  {
    id: "184",
    slug: "cgroup-kill-coding-sessions",
    title: "编码会话用 cgroup 结束即杀",
    summary:
      "每个编码 Agent 会话跑进独立 cgroup，会话结束即整组杀掉，回收资源并防止残留进程。",
    description:
      "编码 Agent 常拉起子进程、沙箱与临时服务，会话关了进程还在。把单次会话装进 Linux cgroup，结束时 kill 整组，隔离 CPU/内存并清残留。适合开发者本机或 CI 旁路的安全与资源治理。不替代正式容器编排；生产集群另走标准调度。",
    categories: ["devtools"],
    platforms: ["chatgpt", "claude", "deepseek", "grok"],
    sourceUrl: "https://news.ycombinator.com/item?id=50136354",
    sourceLabel: "Hacker News",
    upvotes: 82,
    trending: false,
    tags: ["cgroup", "编码会话", "资源隔离", "进程清理", "开发者安全"],
    howItWorks: [
      "启动会话时创建独立 cgroup 并设资源上限",
      "Agent 及其子进程均归入该组运行",
      "会话结束或超时则 kill 整组并释放配额",
    ],
    tips: [
      "超时与内存上限写进会话配置，避免默默拖垮机器",
      "日志落组外目录，杀进程后仍可排查",
    ],
    approach: `Hacker News 评论（item 50136354，用户 _matthew_）回应编码 Agent 造成的磁盘/内存压力讨论：除清理长期未用的 /tmp 文件外，作者发现先前编码 Agent fork 出的命令常残留；于是在 Agent 启动器里做成——每个 Agent 会话放入独立 cgroup，任务完成时杀掉该组全部进程。父帖还提到 git worktree 构建产物占盘、内存打满后 swap 难回收等本机痛点。公开评论未给出回收成功率、平均释放内存或故障率等量化。

国内落地把「启动建 cgroup → 会话进程入组 → 结束/超时整组 kill」写进本机或 CI 旁路的会话配置；超时与内存上限显式配置；日志落到组外目录便于事后排查。硬约束：只作用于编码会话专用 cgroup，禁止对生产宿主机关键业务切片或共享服务做整组 kill；不替代正式容器编排，生产集群另走标准调度。`,
    outcomes: [
      "源未披露会话残留进程清理率、平均回收内存/CPU 或误杀率等量化；公开评论只描述「每会话进 cgroup，完成即杀组内进程」的做法。",
      "作者自述：曾因编码 Agent fork 残留进程而在启动器中为每个会话建 cgroup，并在任务完成时杀掉整组进程；同时用定时任务清理无句柄占用的旧临时文件（评论陈述，非我方实测）。",
      "开发者本机/CI 旁路可把「关会话仍占资源」收成可预期的组级回收；生产集群调度与宿主机关键服务不受本用例自动波及。",
    ],
    caveats: [
      "公开源未给出可复用的资源回收基线，上线后需在自有开发机复盘，勿把「杀得干净」当成生产稳定性承诺。",
      "硬约束：cgroup 仅覆盖编码 Agent 会话；禁止对生产宿主机关键切片、数据库或共享守护进程整组 kill；超时/内存上限必须显式配置。",
      "日志应落组外目录；与正式 K8s/容器编排职责分开；误配 cgroup 层级可能波及无关进程，变更前先在专用试验机验证。",
    ],
    prompts: [
      {
        title: "会话 cgroup 配置清单",
        body: `你是开发者会话隔离助手。根据环境描述输出中文 cgroup 会话配置清单，仅针对编码 Agent 会话。禁止建议杀掉生产宿主机关键服务。

输出：
## 建组命名规则
## CPU/内存/超时上限建议（需人确认）
## 进程入组检查项
## 结束时 kill 整组步骤（含日志保留在组外）
## 明确排除：生产关键切片/共享守护进程
## 非目标

环境：
{{host_and_agent}}`,
      },
      {
        title: "回收结果飞书备忘",
        body: `把一次会话回收结果压成飞书/企微备忘（≤150 字）：会话 id、是否整组退出、保留的日志路径、有无误伤告警。若涉及非会话进程，标「立即人工介入」。不要编造未测的内存数字。

回收日志：
{{reap_log}}`,
      },
    ],
    primarySource: {
      url: "https://news.ycombinator.com/item?id=50136354",
      label: "HN · comment 50136354（编码 Agent 会话进 cgroup，完成即杀组内进程）",
      date: "2026-10-17",
      dateLabel: "讨论",
    },
  },
  {
    id: "185",
    slug: "autonomous-employee-like-agent",
    title: "类员工自主 Agent 处理公司任务",
    summary:
      "赋予类员工职责的自主 Agent 认领公司任务并推进，对外发送、改权限与花钱必须过人审闸门。",
    description:
      "与 id 183「自托管部门编排/基础设施」不同：本条偏单 Agent 类员工自主执行——认领工单、跟进依赖、起草交付，在飞书/企微汇报进度。自主不等于无闸：对外发送、改权限、花钱必须审批。适合中小团队把重复运营交给「数字同事」，人只盯例外与签字。",
    categories: ["enterprise", "efficiency"],
    platforms: ["feishu", "wecom", "chatgpt", "claude", "n8n"],
    sourceUrl: "https://news.ycombinator.com/item?id=47730086",
    sourceLabel: "Hacker News",
    upvotes: 85,
    trending: false,
    tags: ["类员工Agent", "自主执行", "审批闸门", "企业任务", "飞书企微"],
    howItWorks: [
      "定义职责范围、工具白名单与升级条件",
      "Agent 自主推进任务并同步进度到飞书/企微",
      "触及发送/权限/支付时暂停，等人批准再继续",
    ],
    tips: [
      "白名单按最小权限开，默认拒绝一切对外副作用",
      "每日产出一份「已做/待批/阻塞」三栏摘要给人扫",
    ],
    approach: `Hacker News 评论（item 47730086，用户 mike_hearn）称自建自主 Agent：Codex + ChatGPT Plus + systemd + 常规 UNIX 邮件与用户账户基础设施，用于公司各类任务，「相当于公司的一名员工」；记忆上用一条长滚动上下文、日记与 markdown wiki 目录，目前够用，并考虑以后加第二、第三个「专家」机器人。公开评论未给出任务完成率、差错率或节省工时等量化，也未展开对外发送与支付的具体闸门实现。

国内落地把它收成「类员工数字同事」：先定义职责范围、工具白名单与升级条件；Agent 自主推进并同步飞书/企微进度，每日「已做/待批/阻塞」三栏摘要给人扫。硬约束：自主≠无闸——对外发送、改权限、花钱必须暂停等人批准；白名单按最小权限，默认拒绝一切对外副作用；与 id 183 的自托管部门编排区分，本条偏单 Agent 认领与推进。`,
    outcomes: [
      "源未披露任务完成率、差错率、节省工时或审批驳回率等量化；公开评论侧重「systemd + 邮件/UNIX 账户把自主 Agent 当员工用」的经验描述。",
      "作者自述：用 Codex + ChatGPT Plus + systemd 与常规邮件/用户账户跑自主 Agent，承担公司多种任务；记忆靠滚动上下文 + 日记 + markdown wiki，并考虑增设专家机器人（评论陈述，非我方实测）。",
      "中小团队可把重复运营收成带审批闸门的数字同事工作流；外发、权限与支付签字仍在人。",
    ],
    caveats: [
      "公开源未给出可复用的人效或可靠性基线，上线后需用自有工单复盘，勿把「像员工一样干活」理解成可免审无人值守。",
      "硬约束：对外发送、改权限、花钱必须人审；工具白名单最小权限；默认拒绝对外副作用；日记/wiki 勿存放未加密生产密钥。",
      "长滚动上下文仍可能漂移；专家机器人增多时要分权限与升级路径，飞书/企微进度摘要避免泄露客户隐私。",
    ],
    prompts: [
      {
        title: "类员工职责与升级闸门",
        body: `你是企业数字同事编排助手。根据任务域输出中文职责卡与升级闸门。对外发送/改权限/支付必须暂停待人批。

输出：
## 职责范围
## 工具白名单（读/写分列）
## 升级条件（何时打断等人）
## 每日三栏摘要字段：已做/待批/阻塞
## 禁止自动执行清单
## 非目标

任务域：
{{role_scope}}`,
      },
      {
        title: "日进度飞书三栏摘要",
        body: `把 Agent 日志压成飞书/企微「已做/待批/阻塞」三栏摘要（≤180 字）。待批项若含外发/权限/支付，必须显式写「待人批准」。不要编造未提供的完成率或省时数字。

日志：
{{agent_log}}`,
      },
    ],
    primarySource: {
      url: "https://news.ycombinator.com/item?id=47730086",
      label: "HN · comment 47730086（Codex+systemd 自主 Agent 当公司员工做事）",
      date: "2026-04-11",
      dateLabel: "讨论",
    },
  },
  {
    id: "186",
    slug: "market-moves-chart-agent",
    title: "在图表上调查市场波动与告警",
    summary:
      "对着行情图表用 Agent 排查异常波动与告警原因，整理给人看的说明；非投资建议，不自动下单。",
    description:
      "盯盘时告警一响需要快速「发生了什么」。Agent 结合图表区间、公开新闻与你标注的关注点，写出波动可能成因与待核清单，推飞书给人看。本用例非投资建议；不自动下单、不改仓位；告警只通知人，不下发交易指令。",
    categories: ["efficiency", "devtools"],
    platforms: ["chatgpt", "claude", "deepseek", "feishu"],
    sourceUrl: "https://news.ycombinator.com/item?id=49979793",
    sourceLabel: "Hacker News",
    upvotes: 80,
    trending: false,
    tags: ["市场波动", "图表分析", "告警", "非投资建议", "飞书"],
    howItWorks: [
      "选定图表区间与告警规则，Agent 拉取公开上下文",
      "生成「可能原因 / 待核事实 / 无关项」结构化说明",
      "推送飞书通知给人审阅，不触发交易动作",
    ],
    tips: [
      "告警文案固定附「非投资建议、不自动下单」",
      "把高影响标的设为人工必读，避免刷屏忽略",
    ],
    approach: `Hacker News Show HN（item 49979793，作者 Weilun / Warren93，OpenChart）介绍开源图表工作区：让 Claude/Codex 等既有 AI 套餐直接对着图表做事——标注形态、写指标、调查一波行情波动、创建告警；图表、对话与研究落在同一 workspace。告警可挂在图上任意形状：价格触及后触发 Agent 调查并把研究写入本地 workspace；自定义指标与告警条件用作者自研的 Tea 语言。帖文强调本地私有（图表/研究/指标代码与后端可跑本机）、可选付费低延迟行情、当前主要支持 Apple Silicon macOS。公开帖未给出告警命中率、调查正确率或交易收益等量化，也未声称自动下单。

国内落地把它收成「图表区间 + 公开上下文 → 结构化说明 → 飞书通知」：选定区间与告警规则后，Agent 生成「可能原因 / 待核事实 / 无关项」推飞书给人看。硬约束：本用例是行情分析辅助，非投资建议；禁止自动下单、改仓位或下发交易指令；告警只通知人；高影响标的设人工必读，文案固定附「非投资建议、不自动下单」。`,
    outcomes: [
      "源未披露告警命中率、波动归因正确率、人审驳回率或任何交易收益/胜率等量化；公开帖侧重「图表工作区 + 告警触发 Agent 调查并落本地研究」的能力描述。",
      "作者自述：可用既有 AI 套餐在图表上标注、写指标、调查波动与建告警；告警触发后 Agent 调查并保存研究；数据可本地私有，指标语言为 Tea（帖文陈述，非我方实测）。",
      "盯盘告警可从「人肉翻新闻」变成飞书上的结构化说明草稿；是否采信、是否调仓仍由人决定，且不得自动下单。",
    ],
    caveats: [
      "公开源未给出可复用的归因或交易绩效基线，上线后只用自有公开行情复盘说明质量，勿把「Agent 写了原因」当成可交易信号。",
      "硬约束：非投资建议；禁止自动下单、改仓位、对接券商/实盘交易接口；告警只通知人，不下发交易指令；输出固定附声明。",
      "模型可能幻觉新闻或数字；每条说明须标数据时间与公开来源链接；飞书群避免刷屏，高影响标的强制人工必读。",
    ],
    prompts: [
      {
        title: "波动调查说明（非投资建议）",
        body: `你是行情波动调查助手，只整理公开信息给人看。页眉第一行必须写「非投资建议｜不自动下单｜不改仓位」。根据图表区间、告警条件与公开上下文，输出结构化中文说明；禁止给出买入/卖出/仓位建议，禁止编造未提供的价格目标或收益。

输出：
## 告警摘要（标的/区间/触发条件/时间）
## 可能原因（每条：简述 / 公开来源或「待核」）
## 待核事实清单
## 可排除/无关项
## 非目标（不下单、不荐股、不写目标价）

输入：
{{chart_alert_and_clips}}`,
      },
      {
        title: "飞书告警人审卡",
        body: `把调查说明压成飞书/企微人审卡（≤180 字）：标的、触发条件、三条最可能原因、须人工核对项。必须出现「非投资建议，不自动下单」。不要添加未提供的涨跌幅承诺或下单按钮文案。

调查说明：
{{investigation_draft}}`,
      },
    ],
    primarySource: {
      url: "https://news.ycombinator.com/item?id=49979793",
      label: "HN · Show HN 49979793（OpenChart：图表工作区 + Agent 调查波动/告警）",
      date: "2026-10-06",
      dateLabel: "讨论",
    },
  },
  {
    id: "187",
    slug: "daily-social-trending-refs",
    title: "每日社媒热帖汇总成选题参考",
    summary:
      "每日从公开热榜/RSS 抓取社媒热帖线索，去重归纳后写入飞书选题池，只作参考不抄原文。",
    description:
      "内容团队每天刷多平台热榜耗时且易漏。Agent 定时读取公开榜单或 RSS，提炼话题角度、受众信号与可延展钩子，整理成飞书选题参考卡。本地化时热帖可来自公开榜/RSS；输出进飞书选题池。勿盗用他人素材原文；引用仅作灵感索引，成稿须原创改写与事实核验。",
    categories: ["content", "efficiency"],
    platforms: ["feishu", "chatgpt", "claude", "deepseek"],
    sourceUrl: "https://news.ycombinator.com/item?id=47838224",
    sourceLabel: "Hacker News",
    upvotes: 84,
    trending: false,
    tags: ["社媒热帖", "选题池", "飞书", "内容灵感", "公开榜"],
    howItWorks: [
      "配置公开热榜/RSS 源与飞书选题文档模板",
      "Agent 每日拉取、去重并生成带角度与风险提示的选题卡",
      "编辑从选题池挑题，原创改写后再排期",
    ],
    tips: [
      "每张卡标注来源链接与抓取时间，方便溯源",
      "禁止粘贴热帖全文；只保留钩子词与自拟大纲",
    ],
    approach: `Hacker News 评论（item 47838224，用户 vaaselene；父帖 Audience Growth Tool）称分发是增长瓶颈，手工刷 X/Threads/LinkedIn 找对标帖太耗时；于是做了 socialcrawl（多平台公开数据 API），再配合 OpenClaw 每天早晨汇总近 24 小时热帖，当作写自己内容的参考。作者自述近一周 Threads 帖获得约 10 万浏览并增粉约 200（帖文陈述，非我方实测）。公开评论未给出选题采纳率、原创成稿转化率或跨团队复用基线等可独立核对的量化。

国内落地不照搬多平台抓取合规边界，改为配置已授权的公开热榜/RSS，每日去重后写入飞书选题参考卡（角度、受众信号、可延展钩子、风险提示）；编辑挑题后原创改写再排期。硬约束：热点素材只作参考，禁止自动公开发帖或一键搬运原文；禁止粘贴热帖全文，只保留钩子词与自拟大纲；每张卡标注来源链接与抓取时间。`,
    outcomes: [
      "源未披露选题采纳率、原创成稿转化、编辑人审驳回率或合规投诉率等量化；公开评论侧重「晨间热帖汇总→当作写作参考」的流程描述。",
      "作者自述：用多平台热帖晨报做内容对标，并称近一周 Threads 约 10 万浏览、增粉约 200（评论陈述，非我方实测，不可外推为普遍效果）。",
      "内容团队可把「多平台手刷」收成飞书选题池草稿；是否发帖、发什么仍由编辑原创改写与排期决定，禁止自动公开发帖。",
    ],
    caveats: [
      "公开源未给出可复用的增长或选题质量基线，上线后用自有选题池复盘，勿把作者自述浏览量当成承诺。",
      "硬约束：热点素材勿自动公开发帖；禁止一键搬运/盗用他人原文；成稿须原创改写与事实核验；飞书卡只留钩子与自拟大纲。",
      "公开榜/RSS 须遵守平台条款与授权范围；引用标注来源与抓取时间；涉及敏感舆情时先人审再进选题池。",
    ],
    prompts: [
      {
        title: "日更选题参考卡",
        body: `你是内容选题助手。根据公开热帖线索生成中文选题参考卡，只作灵感索引。禁止输出可直接粘贴发布的全文；禁止建议自动发帖。每张卡必须带来源链接与抓取时间。

输出：
## 话题一句话
## 可延展角度（3 条，自拟，不抄原文）
## 受众信号
## 风险/敏感提示
## 自拟大纲要点（子弹，非成稿）
## 非目标（不自动发帖、不搬运原文）

线索：
{{trending_clips}}`,
      },
      {
        title: "飞书选题池摘要",
        body: `把今日选题卡压成飞书/企微选题池摘要（≤180 字）：入池条数、推荐优先挑的 2 题、须人审的敏感项。结尾写「仅供参考，禁止自动发帖，成稿须原创」。不要粘贴热帖原文句子。

选题卡：
{{topic_cards}}`,
      },
    ],
    primarySource: {
      url: "https://news.ycombinator.com/item?id=47838224",
      label: "HN · comment 47838224（socialcrawl + 晨间热帖作内容参考）",
      date: "2026-04-20",
      dateLabel: "讨论",
    },
  },
  {
    id: "188",
    slug: "agent-code-keep-understanding",
    title: "用 Agent 写码仍保持可工作理解",
    summary:
      "Agent 协助写码时每步留下可读摘要与决策日志，保证人随时能接手，禁止无注释大爆炸改动。",
    description:
      "Agent 写码快，但「黑盒大改」会让人失去对代码的工作理解。约定每轮改动附决策日志（为何改、影响面、回滚点）与可读摘要；单次 PR/提交保持小而可审。禁止无注释、无说明的大爆炸改动。目标是人机协作后仓库仍可被人独立维护与调试。",
    categories: ["devtools"],
    platforms: ["chatgpt", "claude", "deepseek", "grok"],
    sourceUrl: "https://news.ycombinator.com/item?id=50158650",
    sourceLabel: "Hacker News",
    upvotes: 87,
    trending: false,
    tags: ["编码理解", "决策日志", "可接手", "小步提交", "开发者工具"],
    howItWorks: [
      "开工前约定摘要模板与单次改动范围上限",
      "Agent 每步输出决策日志与可读 diff 说明后再改文件",
      "人据日志抽查关键路径，确认理解后再合并",
    ],
    tips: [
      "决策日志与代码同仓存放，便于日后接手",
      "发现无注释大爆炸改动一律打回，拆成小步重做",
    ],
    approach: `Hacker News 评论（item 50158650，用户 iamwil；父帖 Ask HN: How to deal with shipping AI-written code you don't understand?）援引 Peter Naur「程序设计是在头脑里建立系统的工作理论」：Agent 代写后，人若不再亲手摸代码，「工作理解」会被抽走。作者自述因此重做工作流，四条原则：（1）审讯/访谈式设计与规格，让 Agent 先问清歧义（如 /grill-me）；（2）人只拍板真正有差异化的决策，琐碎与无差异化子系统可交给 Agent；（3）用 Agent 生成解释页、测验与仿真，逼自己弄懂再扩展；（4）编码环加 guardrails（lint/类型/钩子）与按特性变化的 verifiers（测试、形式化轨迹等）。公开评论未给出理解保留率、回滚率或缺陷密度等量化。

国内落地对齐「每步可接手」：开工前约定摘要模板与单次改动范围上限；Agent 每步先交决策日志（为何改、影响面、回滚点）与可读 diff 说明再改文件；人据日志抽查关键路径后再合并。硬约束：禁止无注释、无说明的大爆炸改动；发现即打回拆小步；决策日志与代码同仓，便于飞书/企微同步给接手人。`,
    outcomes: [
      "源未披露「工作理解」保留率、缺陷密度、回滚率或人审否决率等量化；公开评论侧重工作流原则与可验证护栏的经验描述。",
      "作者自述：改用访谈式规格、人拍板关键决策、解释/测验/仿真巩固理解，并以 guardrails + verifiers 约束编码环（评论陈述，非我方实测）。",
      "团队可把 Agent 写码收成「小步 + 决策日志 + 人抽查」；仓库目标仍是人可独立维护与调试，而非黑盒一次性大改。",
    ],
    caveats: [
      "公开源未给出可复用的理解或质量基线，上线后用自有关键路径抽查与事故复盘，勿把「有日志」等同于「人已理解」。",
      "硬约束：禁止无注释大爆炸改动；单次改动超范围上限必须拆分；合并前人对关键路径抽查；决策日志须同仓可检索。",
      "解释页与测验仍可能含模型幻觉；形式化/轨迹测试不能替代业务验收；飞书同步日志时勿泄露生产密钥。",
    ],
    prompts: [
      {
        title: "改动决策日志模板",
        body: `你是结对编码记录助手。在改文件前先输出中文决策日志，供人建立工作理解。禁止建议无说明的大范围重构。

输出：
## 本轮目标（一句话）
## 为何这样改
## 影响面（模块/接口/数据）
## 回滚点
## 可读摘要（给未参与同事）
## 超出范围则「拆分建议」
## 非目标（不大爆炸改动、不跳过日志）

任务与仓库线索：
{{task_and_context}}`,
      },
      {
        title: "接手抽查飞书卡",
        body: `根据决策日志与 diff 说明生成飞书/企微接手抽查卡（≤180 字）：改动范围、必看文件、建议手测路径、是否允许合并。若缺日志或疑似大爆炸，输出「打回拆分」。不要编造未提供的覆盖率数字。

材料：
{{log_and_diff_summary}}`,
      },
    ],
    primarySource: {
      url: "https://news.ycombinator.com/item?id=50158650",
      label: "HN · comment 50158650（Agent 写码时用规格访谈/解释测验/护栏保持工作理解）",
      date: "2026-10-19",
      dateLabel: "讨论",
    },
  },
  {
    id: "189",
    slug: "leftover-quota-reviewable-prs",
    title: "剩余 AI 额度换成可审 PR",
    summary:
      "额度将尽时让 Agent 批量开小而可审的 PR（测试补齐、文档、小重构），人不自动合并。",
    description:
      "订阅额度月底常有剩余。与其浪费，不如让 Agent 按 backlog 挑「低风险、可独立审」的小任务：补测、修类型、补文档、小范围清理，开成体积可控的 PR。强调额度将尽时批量开小可审 PR；不自动合并——每条须人审 diff 与 CI。避免把剩余额度砸成巨型不可审改动。",
    categories: ["devtools", "efficiency"],
    platforms: ["chatgpt", "claude", "deepseek", "grok"],
    sourceUrl: "https://news.ycombinator.com/item?id=50073611",
    sourceLabel: "Hacker News",
    upvotes: 81,
    trending: false,
    tags: ["剩余额度", "可审PR", "小步改动", "不自动合并", "开发效率"],
    howItWorks: [
      "列出额度将尽时的候选小任务与单 PR 行数上限",
      "Agent 按优先级批量开独立分支与可审 PR",
      "人审 diff/CI 后手动合并，禁止自动合入",
    ],
    tips: [
      "单 PR 聚焦一件事，方便快速否决或合入",
      "额度策略写进脚本：低于阈值才启动批量开 PR",
    ],
    approach: `Hacker News 评论（item 50073611，作者 ariwilson / RemainderBot；父帖 Show HN: RemainderBot）说明：用目标与任务列表，在 Claude/Codex 订阅额度有剩余时开可审 PR 消化「小而耗神」的活；可本机手跑或 cron：tick 时检查剩余额度与距周重置时间，再挑任务开分支与 PR。作者自述已产出 111 个 PR（含客户通话准备、31 个 GitHub org 的 agent 配置盘点、独立原型演示等），并以人对 PR 的评论/是否合并反馈后续任务选择；起步命令含 snapshot 与限制 deadline/size 的小任务试跑。公开帖未给出合并率、回滚率或净节省工时等独立基线。

国内落地写成「额度将尽 → 候选小任务 → 独立可审 PR → 人审合入」：列出单 PR 行数上限与低风险类型（补测、类型、文档、小清理）；Agent 批量开独立分支，CI 过后人审 diff 再手动合并。硬约束：PR 须人审合入，禁止自动合并；避免把剩余额度砸成巨型不可审改动；额度策略可写进脚本（低于阈值才批量开 PR），进度同步飞书/企微便于值班审阅。`,
    outcomes: [
      "源未披露 PR 合并率、回滚率、CI 失败率或净节省工时等量化；公开帖侧重「剩余订阅额度 → 可审小 PR」的产品与用法描述。",
      "作者自述：RemainderBot 按目标/任务列表开 PR，已累计约 111 个 PR，并可用 cron 按剩余额度与重置时间挑任务；以人的合并决策反馈后续选题（帖文陈述，非我方实测）。",
      "月底/周末剩余额度可换成体积可控的补测/文档/小清理 PR 草稿；是否合入仍由人审 diff 与 CI 决定。",
    ],
    caveats: [
      "公开源未给出可复用的质量或工时基线，上线后用自有合并/回滚数据复盘，勿把「开出很多 PR」当成交付完成。",
      "硬约束：每条 PR 须人审合入，禁止自动合并/自动部署；单 PR 聚焦一件事并设行数上限；巨型改动一律拆分或丢弃。",
      "额度脚本误判可能导致高峰抢额度；飞书/企微只同步 PR 链接与摘要，勿把完整密钥写进任务源文件。",
    ],
    prompts: [
      {
        title: "剩余额度可审 PR 候选单",
        body: `你是工程效率助手。根据 backlog 与额度状态，列出适合「剩余额度」开出的小而可审 PR 候选。禁止建议自动合并；禁止打包成巨型 PR。

输出：
## 额度与重置窗口（复述输入）
## 候选任务（标题 / 类型 / 预估改动面 / 风险）
## 单 PR 行数与范围上限建议
## 明确排除的大爆炸项
## 非目标（不自动合入）

输入：
{{backlog_and_quota}}`,
      },
      {
        title: "PR 人审飞书摘要",
        body: `把待审 PR 压成飞书/企微摘要（≤180 字）：标题、目的、主要文件、CI 状态、建议合并/打回。必须写「须人审合入，禁止自动合并」。不要编造未提供的节省工时。

PR 信息：
{{pr_meta}}`,
      },
    ],
    primarySource: {
      url: "https://news.ycombinator.com/item?id=50073611",
      label: "HN · comment 50073611（RemainderBot：剩余 Claude/Codex 额度开可审 PR）",
      date: "2026-10-13",
      dateLabel: "讨论",
    },
  },
  {
    id: "190",
    slug: "personal-finance-track-assistant",
    title: "个人记账助理跟踪收支",
    summary:
      "个人记账助理整理账单分类、月度汇总与提醒；非投资建议，不荐股不下单。",
    description:
      "日常收支散落在短信、账单与表格里。Agent 协助导入或口述记账，自动分类、标异常支出、生成月度一览并推飞书提醒。本用例硬约束：非投资建议；不荐股、不下单、不预测收益；只整理账本、分类与提醒。敏感卡号脱敏后再接入会话。",
    categories: ["life", "efficiency"],
    platforms: ["chatgpt", "claude", "feishu", "deepseek"],
    sourceUrl:
      "https://adlrocha.substack.com/p/adlrocha-agents-will-make-code-and",
    sourceLabel: "Substack · 个人财务助理线索",
    upvotes: 78,
    trending: false,
    tags: ["个人记账", "收支跟踪", "非投资建议", "飞书提醒", "生活效率"],
    howItWorks: [
      "约定分类规则、提醒阈值与脱敏字段",
      "Agent 整理收支条目并输出月度分类汇总",
      "推送飞书提醒给人核对，不触发任何投资或下单动作",
    ],
    tips: [
      "输出页眉固定「非投资建议；不荐股不下单」",
      "只保留后四位或哈希标识，勿上传完整卡号/密码",
    ],
    approach: `Substack 文（adlrocha，2026-02-15 发布）《Agents will make Code and Apps obsolete》讲述作者用 Claude Code + 英文说明 + Markdown 记忆文件搭个人财务助理「Mr. Malone」：以 CLAUDE.md 作行为入口，portfolio/expenses 等以 markdown/yaml 持久化，可接 MCP 拉公开宏观数据；用 git 同步，敏感数据推送前加密。作者动机是长期记不清收支与组合维护成本高，希望助手帮忙跟踪财务、整理历史决策。公开文以叙事与截图为主，未给出记账准确率、对账误差或节省分钟数等可复核量化；文中亦涉投资决策讨论，但本用例只抽取「收支跟踪/分类/提醒」切片。

国内落地收成个人记账助理：约定分类规则、提醒阈值与脱敏字段；Agent 整理收支条目、标异常、出月度分类汇总，推飞书提醒给人核对。硬约束：非投资建议，不荐股、不下单、不预测收益；禁止代用户支付或发起转账；禁止在群聊/日志外泄完整账单明细与完整卡号（只留后四位或哈希）；页眉固定声明。`,
    outcomes: [
      "源未披露记账准确率、对账误差、异常检出率或节省时间等量化；公开文侧重「Claude Code + Markdown 记忆做成个人财务助理」的搭建叙事。",
      "作者自述：用 CLAUDE.md 与一组 markdown/yaml 文件作为助理逻辑与记忆，经 git 同步并在推送钩子中加密敏感数据，用于跟踪开支与财务上下文（文中陈述，非我方实测）。",
      "个人可把散落账单收成月度分类汇总与飞书提醒草稿；支付、投资与是否改预算仍由人决定，助手不得代支付或外发明细。",
    ],
    caveats: [
      "公开源未给出可复用的记账质量基线，上线后用自有对账复盘，勿把「助理能聊财务」理解成可自动理财或代付。",
      "硬约束：非投资建议；禁止荐股/下单/预测收益；禁止代支付或对接支付接口；禁止外泄完整账单明细与完整卡号/密码；飞书提醒只含汇总级信息。",
      "模型可能误分类或幻觉金额；敏感字段先脱敏再入会话；私有 git 仓仍需加密与最小权限，勿把账单贴进公开群。",
    ],
    prompts: [
      {
        title: "月度收支汇总（非投资建议）",
        body: `你是个人记账助手，只整理账本。页眉第一行必须写「非投资建议｜不荐股不下单｜不代支付」。根据已脱敏收支条目输出中文月度汇总；禁止给出投资建议，禁止要求完整卡号，禁止生成支付/转账指令。

输出：
## 分类汇总（类别 / 金额 / 笔数）
## 异常支出候选（需人确认）
## 待补记项
## 隐私检查（确认无完整卡号/密码）
## 非目标（不代付、不外发明细、不荐股）

条目：
{{redacted_ledger}}`,
      },
      {
        title: "飞书提醒（汇总级）",
        body: `把月度汇总压成飞书/企微提醒（≤150 字）：本月总支出、最大三类、一条异常待核。只写汇总数字，不要粘贴商户级完整明细清单。必须出现「非投资建议；不代支付」。若输入含疑似完整卡号，输出「拒绝：请先脱敏」。

汇总：
{{month_summary}}`,
      },
    ],
    primarySource: {
      url: "https://adlrocha.substack.com/p/adlrocha-agents-will-make-code-and",
      label: "Substack · adlrocha：用 Claude Code + Markdown 做个人财务助理（Mr. Malone）",
      date: "2026-02-15",
      dateLabel: "发布",
    },
  },
  {
    id: "191",
    slug: "learn-scripts-from-tools-folder",
    title: "从 tools 文件夹学习个人脚本",
    summary:
      "Agent 扫描个人 scripts/tools 目录，归纳用法、参数与可复用片段，写入可检索笔记。",
    description:
      "个人工具目录常年堆脚本却少文档。Agent 只读扫描 scripts/tools，解析入口、依赖与典型调用，抽出可复用片段与「何时用」说明，写入笔记或本地知识库。适合把隐性习惯变成可交接资产。不执行未审脚本；密钥与环境变量只记占位名，不抄真实值。",
    categories: ["efficiency", "devtools"],
    platforms: ["chatgpt", "claude", "deepseek", "grok"],
    sourceUrl: "https://x.com/ttunguz/status/2011189040591319304",
    sourceLabel: "X 原帖",
    upvotes: 83,
    trending: false,
    tags: ["个人脚本", "tools目录", "用法归纳", "可复用片段", "开发笔记"],
    howItWorks: [
      "指定 scripts/tools 只读路径与笔记输出位置",
      "Agent 扫描并生成「用途 / 用法 / 片段」卡片",
      "人校对后归档，需要时按笔记复用或改写",
    ],
    tips: [
      "先扫只读清单，确认无密钥明文再生成公开笔记",
      "高频脚本单独标「推荐入口」，减少找错文件",
    ],
    approach: `X 上 Tomasz Tunguz（@ttunguz）发帖称：让 Claude Cowork 只读自己的 tools 文件夹，约十一步行后归纳出他如何工作。作者自述过去一年在 Claude Code 里搭过个人「操作系统」——发邮件、更新 CRM、调研创业公司、起草回复等几十个小脚本都堆在笔记本本地目录，原先只能从终端调用；Cowork 解析各脚本并写入记忆后，同一套能力可在另一界面复用，工具不再绑死在单一应用。帖中也坦言当前 Cowork 仍粗糙：慢、启动崩溃过两次、还改过 Claude Code 授权设置。公开帖未给出扫描准确率、笔记采纳率或交接节省工时等量化。

国内落地收成「scripts/tools 只读扫描 → 用途/用法/片段卡片 → 人校对归档」：指定只读路径与笔记输出位置（可进飞书知识库或本地库）；密钥与环境变量只记占位名，不抄真实值；不执行未审脚本。硬约束：先扫只读清单确认无密钥明文再生成可分享笔记；高频脚本单独标「推荐入口」。`,
    outcomes: [
      "源未披露脚本识别准确率、笔记采纳率、交接工时或误执行事故率等量化；公开帖侧重「读 tools 文件夹 → 解析脚本进记忆 → 跨界面复用」的能力叙事。",
      "作者自述：Cowork 约十一步读完 tools 目录后理解其工作方式，并把发邮件/CRM/调研/起草回复等脚本能力迁到新界面；同时称产品仍慢、启动崩溃过、改过授权（帖文陈述，非我方实测）。",
      "个人或小团队可把隐性脚本习惯收成可检索用法卡片与飞书/本地笔记；是否执行、改写脚本仍由人校对后决定，Agent 默认只读不跑。",
    ],
    caveats: [
      "公开源未给出可复用的文档质量基线，上线后用自有目录复盘卡片是否可交接，勿把「读过文件夹」当成已安全自动化。",
      "硬约束：只读扫描；禁止擅自执行未审脚本；禁止把真实密钥/Token/环境变量写入笔记或飞书；对外分享前再扫一遍敏感信息。",
      "模型可能误读参数或编造用法；每张卡片须链回源文件路径；改授权类副作用要人立刻核对本地配置。",
    ],
    prompts: [
      {
        title: "tools 目录用法卡片",
        body: `你是个人脚本文档助手。在只读前提下，根据给定脚本清单生成中文「用途 / 用法 / 可复用片段」卡片。禁止建议执行未审脚本；禁止输出真实密钥或环境变量值，一律用占位名（如 \${API_KEY}）。

输出：
## 脚本名与路径
## 何时用（一句话）
## 入口与典型参数
## 依赖（包/CLI/占位环境变量名）
## 可复用片段（短，脱敏）
## 风险提示（破坏性操作/外发）
## 非目标（不执行脚本、不抄密钥）

脚本清单与摘录：
{{tools_inventory}}`,
      },
      {
        title: "飞书归档校对清单",
        body: `把用法卡片压成飞书/企微校对清单（≤180 字）：新增卡片数、标为「推荐入口」的脚本、仍缺文档的文件、疑似含密钥需人工重扫项。结尾写「只读归档，勿自动执行」。不要粘贴任何疑似密钥字符串。

卡片摘要：
{{cards_digest}}`,
      },
    ],
    primarySource: {
      url: "https://x.com/ttunguz/status/2011189040591319304",
      label: "X · @ttunguz（Claude Cowork 读取 tools 文件夹归纳个人脚本工作流）",
      date: "2026-01-13",
      dateLabel: "发布",
    },
  },
  {
    id: "192",
    slug: "data-clean-to-exec-summary",
    title: "数据清洗到高管摘要的 Agent 流水线",
    summary:
      "Agent 流水线完成清洗→分析→飞书高管一页纸；不编造数字，敏感数据脱敏。",
    description:
      "业务方常卡在「表脏、分析散、高管要一页纸」。用 n8n/Agent 串起：清洗校验 → 约定指标分析 → 生成飞书高管摘要。全程引用可追溯数据源；不编造数字；身份证/手机号等敏感字段脱敏。人审数字与结论后再发高管群。适合周报/月报类固定节奏。",
    categories: ["enterprise", "efficiency"],
    platforms: ["feishu", "chatgpt", "claude", "n8n"],
    sourceUrl:
      "https://bronsonelliott.substack.com/p/i-built-a-complete-data-analysis",
    sourceLabel: "Substack · 数据分析流水线",
    upvotes: 89,
    trending: false,
    tags: ["数据清洗", "高管摘要", "飞书", "企业流水线", "脱敏"],
    howItWorks: [
      "接入原始表与清洗规则，跑校验并输出洁净数据集",
      "按预定指标分析，生成带出处的结论草稿",
      "渲染飞书高管一页纸，人核对数字后发布",
    ],
    tips: [
      "摘要每个数字旁标注来源表与计算口径",
      "流水线默认脱敏；未脱敏字段禁止进入对外文档",
    ],
    approach: `Substack 作者 Bronson Elliott 记述：先用对话式 Agent 问清问题，写成约 713 行规格（非代码），再在一个冬夜用 Claude Code 按规格搭出数据分析 Agent 套件。作者自述约 5 小时内完成清洗、分析、可视化、报告、高管摘要五类专用 Agent 加流水线编排，并称共约 627 项测试通过、构建期几乎不手写代码（约数十次权限确认）。流水线可将脏 CSV 串到高管一页纸；作者强调输出仍须人审，且文中称尚未用于生产业务数据。公开文未给出生产口径的清洗差错率、摘要被高管采纳率等可独立核对量化。

国内落地对齐「清洗校验 → 约定指标分析 → 飞书高管一页纸」：接入原始表与清洗规则，结论数字旁标注来源表与计算口径；身份证/手机号等默认脱敏，未脱敏字段禁止进对外文档；人核对数字与结论后再发高管群。硬约束：不编造数字；摘要每个数字可追溯；飞书发布前人审。`,
    outcomes: [
      "源未披露生产环境清洗差错率、指标正确率、高管采纳率或人审驳回率等量化；公开文侧重「规格驱动 + 多 Agent 流水线一夜搭通」的搭建叙事。",
      "作者自述：约 713 行规格后，一晚约 5 小时建成清洗/分析/可视化/报告/高管摘要等 Agent 与编排，并称约 627 项测试通过、几乎未手写代码（文中陈述，非我方实测，不可外推为普遍工期）。",
      "业务方可把「表脏、分析散、高管要一页纸」收成飞书高管摘要草稿；是否发布、结论是否成立仍由人核对数字后决定。",
    ],
    caveats: [
      "公开源未给出可复用的分析质量或省时基线，且作者写明尚未用于生产数据；上线后用自有周报/月报复盘，勿把「测试通过」当成业务正确。",
      "硬约束：禁止编造未提供的数字或因果；敏感字段默认脱敏；未脱敏内容禁止进飞书对外/高管文档；数字与结论须人审后再发。",
      "模型可能误读口径或幻觉统计结论；每个数字旁保留来源表与计算口径；流水线权限最小化，原始含 PII 的表勿默认共享到宽群。",
    ],
    prompts: [
      {
        title: "清洗到结论草稿",
        body: `你是数据分析流水线助手。根据洁净数据字典与预定指标，输出带出处的中文分析结论草稿。禁止编造表中不存在的数字；禁止输出未脱敏的身份证/手机号等 PII。

输出：
## 数据范围与清洗摘要
## 核心指标（数值 / 口径 / 来源表）
## 主要发现（每条附出处）
## 数据质量与缺口
## 非目标（不编造数字、不给投资建议）

输入：
{{cleaned_schema_and_metrics}}`,
      },
      {
        title: "飞书高管一页纸",
        body: `把分析草稿压成飞书高管一页纸（≤400 字可读版 + ≤180 字群摘要）：结论三句、关键数字（均带来源口径）、需决策项、风险。页眉写「草稿｜数字待人审｜已脱敏」。不要添加未提供的同比/预测。

分析草稿：
{{analysis_draft}}`,
      },
    ],
    primarySource: {
      url: "https://bronsonelliott.substack.com/p/i-built-a-complete-data-analysis",
      label: "Substack · Bronson Elliott（规格驱动的数据清洗→高管摘要 Agent 套件）",
      date: "2026-01-24",
      dateLabel: "发布",
    },
  },
  {
    id: "193",
    slug: "car-repair-triage-reply",
    title: "汽修请求分拣并回复客户",
    summary:
      "企微/飞书接入汽修进线，Agent 分拣紧急度与车型故障标签，生成人审后回复草稿，不自动报价承诺。",
    description:
      "汽修门店或售后群里进线杂乱：救援、保养预约、零件询价、投诉混在一起。用 n8n/Agent 监听企微或飞书会话，按紧急度、车型、故障关键词分拣进待办队列，并起草礼貌、可核对的客户回复。本地化落在企微/飞书；草稿必须人审后再发。硬约束：勿自动报价或承诺交车时间、费用上限；价格与工期仅由人工确认后写入终稿。",
    categories: ["enterprise", "efficiency"],
    platforms: ["wecom", "feishu", "chatgpt", "claude", "n8n"],
    sourceUrl: "https://x.com/ho_lar_s/status/2109790708970438953",
    sourceLabel: "X 原帖",
    upvotes: 86,
    trending: false,
    tags: [
      "汽修分拣",
      "企微飞书",
      "客户回复草稿",
      "人审后发",
      "勿自动报价",
    ],
    howItWorks: [
      "配置企微/飞书进线源、分拣标签与回复草稿模板",
      "Agent 标注紧急度与故障类型，生成待人审的回复草稿",
      "坐席核对车况与排期后手动发送，系统不代报价格或工期",
    ],
    tips: [
      "紧急救援类单独置顶并通知值班人，避免淹没在普通询价里",
      "回复模板预留「价格/交车时间待确认」占位，禁止 Agent 填具体数字",
    ],
    approach: `X 上 @ho_lar_s 展示为汽修店搭的 n8n 流：网页表单进线 → AI 标注工单类型/紧急度/摘要 → 写入 Airtable → 向客户回执；不确定单打标待审，超出范围则礼貌谢绝。公开帖为流程演示向短述，未给出分拣准确率、误回率或人审占比等量化；帖面写有即时回客户一环，国内落地须收紧为「草稿 + 人审后发」。

国内映射为企微/飞书售后或门店会话：按紧急度、车型、故障关键词分拣进待办，起草礼貌、可核对的回复草稿；救援类置顶并通知值班人。硬约束：客服回复须人审后再发；禁止 Agent 自动报价或承诺交车时间、费用上限；价格与工期仅人工确认后写入终稿；模板预留「价格/交车时间待确认」占位。`,
    outcomes: [
      "源未披露分拣准确率、误回复率、人审驳回率或救援响应时长等量化；公开帖侧重「表单→AI 分类→台账→客户回执（含待审/拒单）」的流程描述。",
      "作者自述：用 n8n 完成类型/紧急度/摘要分类并落 Airtable，不确定单待审、超范围礼貌谢绝（帖文陈述，非我方实测）。",
      "门店可把杂乱进线收成企微/飞书待办 + 回复草稿；是否发送、如何报价与排期仍由坐席核对后决定，系统不代报价格或工期。",
    ],
    caveats: [
      "公开源未给出可复用的分拣或客服质量基线，上线后用自有进线复盘，勿把「流程跑通」当成可无人值守。",
      "硬约束：客户回复须人审后再发，禁止自动发送；禁止自动报价或承诺交车时间/费用上限；紧急救援须置顶通知值班人。",
      "模型可能误判车型或紧急度；缺关键车况时只追问不承诺；企微/飞书会话权限与存档须合规授权。",
    ],
    prompts: [
      {
        title: "汽修进线分拣卡",
        body: `你是汽修进线分拣助手。根据客户消息输出分拣卡，不要报价、不要承诺交车时间或费用。不确定则标记「待人审」。

输出：
## 紧急度（救援/当日/可预约/投诉）
## 车型与故障标签（未知则写未知）
## 一句话摘要
## 建议队列与值班通知（是否置顶）
## 需客户补充的信息
## 非目标（不报价、不承诺工期、不自动发送）

进线原文：
{{inbound_message}}`,
      },
      {
        title: "人审后发的回复草稿",
        body: `起草一条企微/飞书客户回复草稿（≤120 字）。语气礼貌；价格与交车时间必须写成「待确认」占位，禁止填具体数字。文首加「【待人审·勿自动发送】」。若进线超出门店范围，改为礼貌说明可覆盖范围并请留联系方式转人工。

分拣卡与门店政策：
{{triage_and_policy}}`,
      },
    ],
    primarySource: {
      url: "https://x.com/ho_lar_s/status/2109790708970438953",
      label: "X · @ho_lar_s（n8n 汽修进线：AI 分类 + 台账 + 客户回执）",
      date: "2026-10-12",
      dateLabel: "发布",
    },
  },
  {
    id: "194",
    slug: "sales-order-verify-email-draft",
    title: "销售订单从核验到客户邮件草稿",
    summary:
      "销售订单经字段核验后生成客户确认邮件草稿；人确认再发，流水线不自动扣款。",
    description:
      "订单从下单到客户确认常卡在「字段漏填、邮件措辞不一致」。Agent/n8n 流水线先核验 SKU、数量、交期、收货信息与库存线索，通过后按模板起草客户确认邮件，推到飞书/企微待办。人核对无误后再发送。硬约束：核验→草稿邮件；人确认后发；不自动扣款、不触发支付或出库指令。异常订单标红并交回销售改单。",
    categories: ["efficiency", "enterprise"],
    platforms: ["feishu", "wecom", "chatgpt", "claude", "n8n"],
    sourceUrl: "https://x.com/rassailor/status/2108221352641741264",
    sourceLabel: "X 原帖",
    upvotes: 82,
    trending: false,
    tags: [
      "销售订单",
      "字段核验",
      "邮件草稿",
      "人确认后发",
      "不自动扣款",
    ],
    howItWorks: [
      "接入订单表与核验规则（必填项、库存/交期线索）",
      "通过后生成带订单摘要的客户确认邮件草稿",
      "销售在飞书/企微确认后手动发送；支付与出库仍走原流程",
    ],
    tips: [
      "核验失败写清缺项清单，方便销售一次补齐",
      "邮件草稿默认不含付款链接或扣款话术，避免误触发支付预期",
    ],
    approach: `X 上 Elvis Rigglet（@rassailor）记述对 Grok Bot 一声令下：登记订单、改到十月、佣金按发货日。作者自述 Bot 找回 PI，对照 PO 与银行水单，发现其口述定金日期差一天，随后登记订单、为财务建佣金台账并完成通知；又据工厂两行消息生成装箱单，起草客户邮件并放入 Gmail 草稿箱。公开帖为个人销售侧单次经历，未给出核验正确率、错单拦截率或邮件发送量等量化。

国内落地收成「字段核验 → 客户确认邮件草稿 → 飞书/企微待办」：核验 SKU、数量、交期、收货与库存/单据线索；失败则写清缺项清单交销售改单。硬约束：核验与草稿可自动，客户邮件须人确认后再发；禁止自动扣款、禁止触发支付或出库指令；草稿默认不含付款链接或扣款话术。`,
    outcomes: [
      "源未披露字段核验正确率、错单拦截率、人确认驳回率或从核验到出草稿的耗时等量化；公开帖侧重「对单→登记→佣金台账→装箱单→客户邮件进草稿箱」的一次演示。",
      "作者自述：一次口令后完成 PI/PO/水单核对（发现定金日期差一天）、登记订单与佣金台账，并生成装箱单与客户邮件草稿（帖文陈述，非我方实测）。",
      "销售可把漏填与措辞不一致收成飞书/企微待办上的确认邮件草稿；是否发送、是否扣款/出库仍走原人工与业务系统流程。",
    ],
    caveats: [
      "公开源未给出可复用的核验质量基线，上线后用自有订单抽样复盘，勿把「草稿已生成」当成可自动对客承诺。",
      "硬约束：订单核实结果与客户邮件均须人确认；禁止自动发送客户邮件；禁止自动扣款或触发支付/出库指令；草稿不含付款链接。",
      "模型可能误读金额或交期；单据影像须可追溯；飞书待办勿泄露完整银行账号与过多客户隐私字段。",
    ],
    prompts: [
      {
        title: "销售订单核验清单",
        body: `你是销售订单核验助手。对照订单与单据线索输出核验结果。禁止建议扣款、支付或出库；禁止编造未提供的库存与金额。

输出：
## 通过/失败
## 缺项与不一致清单（字段 / 单据线索 / 建议补齐）
## 订单摘要（SKU/数量/交期/收货）
## 风险标记（日期冲突、金额不符等）
## 非目标（不扣款、不出库、不自动发信）

订单与单据：
{{order_and_docs}}`,
      },
      {
        title: "客户确认邮件草稿（人发）",
        body: `在核验通过的前提下，起草一封客户确认邮件中文草稿，并生成飞书/企微待办摘要（≤120 字）。邮件语气专业；不要附付款链接或扣款话术；文首写「【草稿·待销售确认后发送】」。若核验失败，改为「勿发信，先补齐缺项」并只列缺项。

核验结果：
{{verification_result}}`,
      },
    ],
    primarySource: {
      url: "https://x.com/rassailor/status/2108221352641741264",
      label: "X · @rassailor（Grok Bot：订单对单核验到客户邮件草稿）",
      date: "2026-10-08",
      dateLabel: "发布",
    },
  },
  {
    id: "195",
    slug: "browser-agents-workday-test",
    title: "用真实工作日任务测评浏览器 Agent",
    summary:
      "用真实工作流对照测评浏览器 Agent，记录完成度与卡点，结果写入飞书；勿在生产账号乱点。",
    description:
      "宣传里的浏览器 Agent 难分高下。把本人真实工作日任务（填表、查后台、整理公开页）做成对照题，在隔离环境跑两款或多款 Agent，记录成功率、步数、卡点与人工干预次数，汇总进飞书测评表。强调真实工作流对照测评；结果进飞书。硬约束：勿在生产账号乱点——用测试账号/沙箱；涉及写操作须人确认；不保存生产 Cookie 到评测脚本。",
    categories: ["efficiency", "devtools"],
    platforms: ["chatgpt", "claude", "deepseek", "feishu"],
    sourceUrl: "https://natesnewsletter.substack.com/p/i-threw-my-real-workday-at-two-ai",
    sourceLabel: "Substack · 浏览器 Agent 测评",
    upvotes: 88,
    trending: false,
    tags: [
      "浏览器Agent",
      "工作日测评",
      "对照实验",
      "飞书结果",
      "沙箱账号",
    ],
    howItWorks: [
      "选出若干可复现的真实任务与评分维度，准备测试账号",
      "按同一脚本分别跑候选浏览器 Agent，记录完成度与卡点",
      "汇总对照表写入飞书，团队讨论后再决定是否试点",
    ],
    tips: [
      "每条任务写清「允许/禁止的写操作」，防止 Agent 误改生产数据",
      "同一任务至少跑两轮，减少偶发网络波动对结论的干扰",
    ],
    approach: `Substack「Nate’s Newsletter」文记述作者把真实工作日任务扔给两款浏览器侧 AI Agent 做对照（文中点名 Comet 与 OpenAI Operator），强调不用消毒演示题，而用改期、检索、公开材料整理等messy 场景；公开导语称跑了八项真实工作流测试，并以文宣口径对比「日历冲突约 5 分钟级处理」与「订票约 16 分钟」等耗时感受，同时讨论约 $200/月档工具是否值回时间。免费可见部分详述 Operator 界面与登录体验槽点、以及 Comet 侧栏改期并起草跟进信的经历；完整逐项计分表多在付费区，公开页未给出可独立复核的全表成功率。

国内落地收成「真实任务对照题 + 沙箱账号 + 飞书测评表」：统一脚本记录完成度、步数、卡点与人工干预次数；写操作白名单。硬约束：勿在生产账号乱点；勿越权登录付款——用测试账号/沙箱；涉及写操作、登录与任何支付须人确认；不把生产 Cookie 写入评测脚本。`,
    outcomes: [
      "源未披露可独立复核的全量八项对照成功率、错误率或团队级推广数据（完整计分多在付费正文）；公开页侧重「真实工作日任务对照测评」方法与个别场景体验。",
      "作者自述：对 Comet 与 Operator 跑同一组真实工作流；导语口径提到日历冲突约 5 分钟级处理、订票约 16 分钟等耗时对比，并讨论约 $200/月是否值回（文宣/自述，非我方实测，不可外推）。",
      "团队可把「宣传难分高下」收成飞书对照测评表；是否试点、是否开通生产权限仍由人依据沙箱结果决定，评测中不得代为登录付款。",
    ],
    caveats: [
      "公开免费页未给出完整可复用基线，上线测评只用自有任务集与沙箱账号，勿把作者个人耗时或产品偏好写成采购承诺。",
      "硬约束：禁止在生产账号上让浏览器 Agent 随意点击；禁止越权登录与代为付款/下单；写操作须人确认；禁止保存生产 Cookie/密码到评测脚本或飞书。",
      "网络波动与验证码会导致结果不稳定，同一任务至少两轮；测评记录脱敏，避免把客户数据贴进公开频道。",
    ],
    prompts: [
      {
        title: "工作日对照测评脚本",
        body: `你是浏览器 Agent 测评书记员。根据任务说明书生成可复现的对照测评脚本（中文）。必须单列「允许的写操作 / 禁止的写操作」；默认禁止生产登录、禁止付款与改计费资料。

输出：
## 任务目标与成功标准
## 前置：测试账号/沙箱
## 步骤清单（两款 Agent 共用）
## 记录字段（完成度/步数/卡点/人工干预）
## 中止条件（验证码、付费墙、越权）
## 非目标（不生产乱点、不登录付款）

任务想法：
{{workday_task_idea}}`,
      },
      {
        title: "飞书对照结果卡",
        body: `把两轮测评记录压成飞书/企微对照卡（≤200 字）：任务名、两款 Agent 完成度、主要卡点、人工干预次数、是否建议试点。必须出现「沙箱账号｜禁止生产乱点｜禁止越权登录付款」。不要编造未记录的耗时百分比。

原始记录：
{{trial_logs}}`,
      },
    ],
    primarySource: {
      url: "https://natesnewsletter.substack.com/p/i-threw-my-real-workday-at-two-ai",
      label: "Substack · Nate’s Newsletter（真实工作日任务对照测评浏览器 Agent）",
      date: "2025-07-11",
      dateLabel: "发布",
    },
  },
  {
    id: "196",
    slug: "youtube-cited-research-notes",
    title: "把 YouTube 视频做成带引用的研究笔记",
    summary:
      "把 YouTube 视频提炼成带时间戳引用的研究笔记写入飞书；不抄字幕当原文发表。",
    description:
      "长视频调研耗时，口头观点又难回溯。Agent 基于字幕/章节生成结构化研究笔记：论点、证据、反方、可跟进问题，每条关键论断附时间戳引用，归档到飞书知识库。硬约束：时间戳引用；不抄字幕当原文发表——笔记用自己的话复述，公开成稿须二次原创与事实核验；版权素材勿整段转载。",
    categories: ["content", "education"],
    platforms: ["chatgpt", "claude", "kimi", "feishu"],
    sourceUrl: "https://artemxtech.substack.com/p/notebooklm-has-a-knowledge-graph",
    sourceLabel: "Substack · 视频研究笔记",
    upvotes: 79,
    trending: false,
    tags: [
      "YouTube",
      "时间戳引用",
      "研究笔记",
      "飞书知识库",
      "不抄字幕",
    ],
    howItWorks: [
      "提供视频链接与笔记模板（论点/证据/时间戳字段）",
      "Agent 提炼结构并给每条关键论断挂时间戳引用",
      "人校对后写入飞书；对外发表前再做原创改写与核验",
    ],
    tips: [
      "时间戳写成可点击格式（如 12:34），方便回看原片",
      "笔记页眉固定「内部研究草稿；禁止整段字幕外发」",
    ],
    approach: `Substack 作者 Artem Zhutov 记述用 Claude Code 编排 NotebookLM：终端检索 YouTube、一次把约 20 条视频加为来源、提问后拿回带引用的回答，再落到 Obsidian 成「来源/主题/引用」可跳转的知识图，避免研究只困在浏览器标签页。作者自述做过引用准确率抽检：约 60% 强匹配原文段落、约 31% 部分匹配、约 10–15% 偏弱，并强调够当研究起点、不够不核对就当论文引用；文中还演示音频概览、闪卡等输出，公开文未给出飞书采纳率或团队级省时量化。

国内落地收成「视频链接 + 论点/证据/时间戳模板 → 结构化研究笔记 → 人校对进飞书知识库」：每条关键论断挂可点击时间戳，回看原片核验；笔记用自己的话复述。硬约束：引用须可核（时间戳/来源可点回）；禁止整段抄字幕当原文发表；版权素材勿整段转载；对外成稿须二次原创与事实核验；页眉固定「内部研究草稿；禁止整段字幕外发」。`,
    outcomes: [
      "源未披露飞书/团队场景下的笔记采纳率、对外成稿差错率或相对「纯倍速看片」的省时量化；公开文侧重「多视频入源 → 带引用回答 → 本地知识图」的搭建叙事。",
      "作者自述：约 20 条 YouTube 视频进 NotebookLM 后可一问多源并回链段落；引用抽检约 60% 强匹配、约 31% 部分匹配、约 10–15% 偏弱（文中陈述，非我方实测，不可外推为普遍准确率）。",
      "调研者可把「看完就忘、难回溯」收成飞书知识库里的带时间戳研究草稿；是否对外发表、论断是否成立仍须人回片核验与原创改写后决定。",
    ],
    caveats: [
      "公开源未给出可复用的笔记质量基线，上线后用自有视频集复盘引用可点回率，勿把「抽检约六成强匹配」写成对外引用承诺。",
      "硬约束：关键论断须带可核时间戳/来源；禁止整段抄录字幕当原文发表；禁止整段转载版权素材；对外成稿须二次原创与事实核验。",
      "模型可能错挂时间戳或捏造未出现的观点；每条论断保留回片路径；飞书页仅作内部草稿，勿把未核验摘要当已发表结论。",
    ],
    prompts: [
      {
        title: "带时间戳的研究笔记卡",
        body: `你是视频研究笔记助手。根据给定字幕/章节摘要，用中文写结构化研究笔记。禁止整段照抄字幕；禁止编造未出现的观点或时间戳。每条关键论断必须附可核时间戳（如 12:34）。

输出：
## 视频与范围
## 核心论点（复述，非逐字字幕）
## 证据与反方（各条附时间戳）
## 可跟进问题
## 不确定/待回片核验
## 非目标（不抄字幕当原文、不整段转载）

输入：
{{video_transcript_or_chapters}}`,
      },
      {
        title: "飞书归档校对清单",
        body: `把研究笔记压成飞书知识库校对清单（≤180 字）：论断条数、已挂时间戳条数、待回片项、疑似弱引用项。页眉写「内部研究草稿｜禁止整段字幕外发｜对外须二次原创」。不要粘贴大段字幕原文。

笔记摘要：
{{notes_digest}}`,
      },
    ],
    primarySource: {
      url: "https://artemxtech.substack.com/p/notebooklm-has-a-knowledge-graph",
      label: "Substack · Artem Zhutov（YouTube 多源入 NotebookLM → 带引用笔记与 Obsidian 知识图）",
      date: "2026-02-24",
      dateLabel: "发布",
    },
  },
  {
    id: "197",
    slug: "course-revise-from-evals",
    title: "按学生评教反馈改课",
    summary:
      "脱敏学生评教后归纳主题，给出大纲与练习改写建议；教师人审后再发布新版课件。",
    description:
      "评教问卷往往又长又散，教师难系统改课。Agent 先对评教文本脱敏（去姓名/学号/可识别细节），聚类主题（节奏、难度、案例、作业负荷等），再输出大纲调整与练习改写建议，写入飞书改课草稿。硬约束：脱敏评教→改大纲/练习建议；人审后发布——不自动覆盖正式课件或成绩规则；个别攻击性言论单独标记不入公开摘要。",
    categories: ["education", "efficiency"],
    platforms: ["feishu", "chatgpt", "claude", "deepseek"],
    sourceUrl: "https://practicespace.substack.com/p/using-claude-code-to-modernize-my",
    sourceLabel: "Substack · 评教改课",
    upvotes: 85,
    trending: false,
    tags: [
      "学生评教",
      "脱敏",
      "大纲改写",
      "练习建议",
      "人审发布",
    ],
    howItWorks: [
      "导入评教导出并跑脱敏与主题聚类",
      "Agent 生成「保留/加强/删减」建议及对应练习改写草案",
      "教师审阅后手动更新大纲与课件，再发布给学生",
    ],
    tips: [
      "公开改课说明只写主题级反馈，不引用可识别原句",
      "建议旁标注「依据评教条数/占比」，避免被单条极端意见带偏",
    ],
    approach: `Substack 作者 Nick Feamster 记述用 Claude Code 改课：先把学期评教 PDF 丢给 Agent 归纳赞扬与建设性主题（如批改反馈慢且不透明、三小时连堂吃力、考题不均、作业偏浅、材料难找等），再落成带清单的跟踪 Issue，每项主题一格，改完在对应格记「已合入某提交」。其后以 Issue 为规格推进作业量规、教学大纲一致性、考试材料规则统一，以及约二十余套幻灯片的并行重建；作者强调先手搓一套参考版并批准后再扇出多 Agent，且审 diff、不让 Agent 未经确认就提交推送。公开文未给出评教条目准确率、学生满意度前后差等可独立核对量化。

国内落地收成「评教导出脱敏 → 主题聚类 → 大纲/练习改写建议 → 飞书改课草稿」：公开说明只写主题级反馈；建议旁标注依据条数/占比。硬约束：评教数据必须脱敏（去姓名/学号/可识别细节）；攻击性言论单独标记不入公开摘要；不自动覆盖正式课件或成绩规则；教师人审后再发布。`,
    outcomes: [
      "源未披露评教主题识别准确率、改课后满意度提升幅度或教师人审驳回率等量化；公开文侧重「评教→跟踪 Issue→多形态改课」的流程叙事。",
      "作者自述：将评教归纳为可勾选跟踪 Issue，并以此驱动作业量规、大纲/考试一致性与约二十余套幻灯片重建；先批准参考版再扇出，合入前审 diff（文中陈述，非我方实测）。",
      "教师可把散乱评教收成飞书改课草稿（保留/加强/删减 + 练习建议）；是否发布新版课件、是否改成绩规则仍由教师手动决定。",
    ],
    caveats: [
      "公开源未给出可复用的改课效果基线，上线后用自有评教与开课数据复盘，勿把「Issue 勾完」当成教学质量已提升。",
      "硬约束：评教须先脱敏再分析；禁止把可识别原句写入公开改课说明或飞书宽群；禁止自动覆盖正式课件/成绩规则；攻击性言论单独标记不入公开摘要。",
      "模型可能被单条极端意见带偏；每条建议旁保留依据条数/占比；发布前教师核对学术与院系政策。",
    ],
    prompts: [
      {
        title: "评教脱敏与主题聚类",
        body: `你是评教分析助手。先对评教文本脱敏（删除姓名、学号、邮箱、可识别个人细节），再聚类主题。禁止输出可识别原句到「公开摘要」区；攻击性言论单独列入「仅教师可见」。

输出：
## 脱敏说明（已去除字段类型）
## 主题列表（主题 / 条数或占比 / 一句话归纳）
## 公开可用摘要（仅主题级）
## 仅教师可见（攻击性/敏感原句占位编号）
## 非目标（不改成绩规则、不自动覆盖课件）

评教导出：
{{evals_export}}`,
      },
      {
        title: "飞书改课建议草稿",
        body: `根据脱敏主题生成飞书改课草稿（≤400 字可读版 + ≤180 字群摘要）：「保留/加强/删减」三项，每项附对应练习或大纲改写建议与依据条数/占比。页眉写「草稿｜评教已脱敏｜待教师人审后发布」。不要引用可识别学生原句，不要自动改成绩规则。

主题聚类：
{{theme_clusters}}`,
      },
    ],
    primarySource: {
      url: "https://practicespace.substack.com/p/using-claude-code-to-modernize-my",
      label: "Substack · Nick Feamster（评教归纳为跟踪 Issue 后驱动改课与多 Agent 课件更新）",
      date: "2026-06-03",
      dateLabel: "发布",
    },
  },
  {
    id: "198",
    slug: "migrate-legacy-product-stack",
    title: "用编码 Agent 迁移遗留产品技术栈",
    summary:
      "编码 Agent 按模块开可审 PR 迁移遗留技术栈，保留回滚路径，禁止一次切全生产。",
    description:
      "遗留产品换栈风险大：依赖缠绕、测试薄、一次切换易出事。约定用编码 Agent 按模块拆迁移：每模块独立分支、可审 PR、配套测试与回滚说明；先影子流量或特性开关验证再逐步放量。硬约束：分模块可审 PR；有回滚；不一次切全生产。密钥与生产配置不进 Agent 上下文明文；关键路径必须人审 diff 与 CI。",
    categories: ["devtools"],
    platforms: ["chatgpt", "claude", "deepseek", "grok"],
    sourceUrl:
      "https://dev.to/aws-builders/the-setup-is-the-strategy-how-i-orchestrated-a-product-migration-with-claude-code-b92",
    sourceLabel: "DEV.to · 产品迁移实践",
    upvotes: 90,
    trending: false,
    tags: [
      "遗留迁移",
      "分模块PR",
      "回滚",
      "编码Agent",
      "不一次切全量",
    ],
    howItWorks: [
      "盘点模块边界、依赖图与回滚策略，划定首批低风险模块",
      "Agent 按模块生成迁移改动与测试，开独立可审 PR",
      "人审合入后灰度/特性开关放量；异常立即回滚该模块",
    ],
    tips: [
      "每个 PR 描述写清「回滚命令/开关」与影响面，方便值班",
      "生产切换清单单独人工把关，Agent 不得直接操作生产发布按钮",
    ],
    approach: `DEV.to（AWS Community Builders）作者 Karthik Subramanian 记述以 Claude Code 为主平台编排真实产品迁移：四套遗留仓收成两套、MySQL→PostgreSQL、全栈框架升级（如 Spring Boot 2→3、Java 17→21、React 17→18）、认证模型替换与配套测试。作者强调「设置即策略」：多层 CLAUDE.md、记忆规则、设计评审后再拆可审工单；执行上用 worktree 并行、MR/CI 闭环，合入前人工把关。作者自述 POC 约 15 个工作日、约 50 张工单、约 580 项测试通过，QA 交接时自称 API 覆盖约 95%+、前端约 91%，并称 API token 花费近 5000 美元量级；另称一次会话拆出约 19 张 Jira、AI 初审大约能抓住三到四成偏低层级问题。公开文未给出生产事故率或「一次切全量」对照实验。

国内落地对齐「分模块可审 PR + 回滚/特性开关 + 灰度放量」：先盘模块边界与回滚策略，低风险模块先行；密钥与生产配置不进 Agent 上下文明文。硬约束：不一次切全生产；每个 PR 写清回滚命令/开关与影响面；生产切换清单单独人工把关，Agent 不得直接按生产发布按钮；关键路径人审 diff 与 CI。`,
    outcomes: [
      "源未披露生产环境一次切全量对照下的事故率、回滚次数或业务中断时长等量化；公开文侧重「上下文与工单拆分 → 并行可审 MR → 人审放量」的编排叙事。",
      "作者自述：约 15 个工作日完成规划到 QA 交接量级的迁移 POC，约 50 工单/约 580 测试，并给出覆盖率与近 5000 美元 token 成本等自述口径（文中陈述，非我方实测，不可外推为普遍工期或成本）。",
      "团队可把缠绕换栈收成「模块级可审 PR + 回滚说明 + 灰度」；是否合入、是否打开生产开关仍由人依据 CI 与值班清单决定，禁止 Agent 一次切全生产。",
    ],
    caveats: [
      "公开源未给出可复用的生产稳定性基线，上线后用自有模块与回滚演练复盘，勿把作者个人 POC 覆盖率/花费写成承诺。",
      "硬约束：分模块可审 PR；必须有回滚路径；禁止一次切全生产；禁止 Agent 直接操作生产发布；密钥/生产配置禁止进上下文明文。",
      "模型可能漏改依赖或误删仍被回调引用的状态；CI 与人审不可省；大文档/工单同步工具可能截断，重要变更以仓库与人工确认为准。",
    ],
    prompts: [
      {
        title: "模块迁移可审 PR 说明",
        body: `你是遗留栈迁移助手。根据模块边界与依赖图，起草一份中文「可审 PR」说明。禁止建议一次切全生产；禁止输出真实密钥或生产连接串。

输出：
## 模块范围与非目标
## 改动文件/迁移步骤摘要
## 测试计划与验收标准
## 回滚命令或特性开关
## 影响面与值班注意
## 非目标（不一次切全量、不直接点生产发布）

输入：
{{module_inventory}}`,
      },
      {
        title: "灰度放量检查表（飞书）",
        body: `把迁移 PR 压成飞书/企微放量检查表（≤180 字）：模块名、CI 状态、回滚入口、影子流量/开关是否就绪、是否需人工点发布。必须出现「禁止一次切全生产｜Agent 不得按发布按钮」。不要编造未提供的覆盖率数字。

PR 摘要：
{{pr_digest}}`,
      },
    ],
    primarySource: {
      url: "https://dev.to/aws-builders/the-setup-is-the-strategy-how-i-orchestrated-a-product-migration-with-claude-code-b92",
      label: "DEV.to · Karthik Subramanian（Claude Code 编排遗留产品迁移：可审工单与并行 MR）",
      date: "2026-04-16",
      dateLabel: "发布",
    },
  },
  {
    id: "199",
    slug: "landing-page-ads-campaign",
    title: "落地页上线并搭广告投放",
    summary:
      "从文案与结构到落地页上线，再搭 Google Ads 投放草案；人审发布，不自动改预算。",
    description:
      "营销常卡在「页还没稳就急着投」或「投了却无人盯转化」。本条走落地页+广告投放闭环：Agent 据产品卖点起草落地页结构与文案，用模板/静态站工具生成可预览页；同步产出 Google Ads 广告组、关键词与广告文案草案，以及转化事件与 UTM 清单。飞书待办汇总预览链接与投放检查表；n8n 可串「预览→人审→发布」状态。与 163（从工单规格出落地页）不同：本条强调页+投放一体闭环。硬约束：不自动改预算、不自动调价或扩词；上线与投放开关须人确认；禁止伪造点击/转化数据。",
    categories: ["content", "efficiency"],
    platforms: ["feishu", "chatgpt", "claude", "n8n"],
    sourceUrl: "https://x.com/TheOneGroupAI/status/2108930755933913527",
    sourceLabel: "X 原帖",
    upvotes: 84,
    trending: false,
    tags: [
      "落地页",
      "Google Ads",
      "投放草案",
      "人审发布",
      "不自动改预算",
    ],
    howItWorks: [
      "输入卖点、受众与转化目标，生成落地页结构/文案与 Ads 投放草案",
      "产出可预览页、广告组与 UTM/转化检查表，推入飞书待审",
      "人核对合规与预算后手动发布落地页并开启投放；系统不改预算或自动扩词",
    ],
    tips: [
      "首周只用「建议预算」占位，真正日预算由人写入广告后台",
      "落地页主 CTA 与广告落地 URL、转化事件一一对照，避免错链",
    ],
    approach: `X 上 Alec（@TheOneGroupAI）发帖称交给 @openclaw 一项真实任务：搭建并上线落地页、接入带去重保护的线索收集、配置仅搜索且带地域定向的 Google Ads 广告系列，并安装 consent-mode 标签；帖称「不是演示，已上线」并附链接。公开帖为短述演示，未给出花费、CPC、转化率或线索质量等量化，也未说明预算由谁最终写入后台。

国内落地收成「卖点→落地页预览 + Ads 投放草案→飞书待审→人确认后发布/开投」：同步产出广告组、关键词与文案草案、转化事件与 UTM 清单；主 CTA、落地 URL、转化事件一一对照。硬约束：投放须人确认，禁止自动烧预算——不自动改预算、不自动调价或扩词；上线与投放开关须人点；首周日预算仅「建议」占位，真人写入广告后台；禁止伪造点击/转化数据。`,
    outcomes: [
      "源未披露广告花费、CPC/CPA、转化率、线索有效率或人审驳回率等量化；公开帖侧重「落地页上线 + 线索收集 + Search 地域定向 Ads + consent 标签」的一次实装描述。",
      "作者自述：Agent 完成落地页上线、去重线索收集、Search-only 地域定向 Google Ads 与 consent-mode 标签，并称已上线非演示（帖文陈述，非我方实测）。",
      "营销方可把「页未稳就投 / 投了无人盯」收成飞书待审的预览页与投放检查表；是否发布、是否开投与真实日预算仍由人确认，系统不自动改预算或扩词。",
    ],
    caveats: [
      "公开源未给出可复用的投放效果基线，上线后用自有转化与花费复盘，勿把「页已 live」当成获客效果承诺。",
      "硬约束：投放开关与预算须人确认；禁止自动改预算、自动调价或自动扩词（勿自动烧预算）；禁止伪造点击/转化数据；合规与隐私同意标签须人核对。",
      "模型可能写错落地 URL 或 UTM；发布前逐项对照主 CTA、广告 URL 与转化事件；国内渠道可映射为合规信息流/搜索广告后台，权限最小化。",
    ],
    prompts: [
      {
        title: "落地页与 Ads 投放草案",
        body: `你是落地页与搜索广告草案助手。根据卖点、受众与转化目标，输出中文落地页结构/文案要点，以及 Google Ads（或等价搜索广告）广告组、关键词与广告文案草案、转化事件与 UTM 清单。禁止填写真实日预算数字并宣称已生效；预算栏只写「建议占位，待人写入后台」。禁止伪造点击或转化。

输出：
## 落地页结构与主 CTA
## 广告组 / 关键词 / 文案草案
## UTM 与转化事件对照表
## 合规与同意提示
## 非目标（不自动改预算、不自动开投）

输入：
{{offer_audience_goal}}`,
      },
      {
        title: "飞书投放待审检查表",
        body: `把预览链接与投放草案压成飞书待办（≤180 字）：预览 URL、主 CTA 与广告落地 URL 是否一致、转化事件是否对齐、建议预算是否仍为占位。必须出现「人确认后再发布/开投｜禁止自动改预算烧钱」。不要编造花费或转化率。

草案摘要：
{{campaign_draft}}`,
      },
    ],
    primarySource: {
      url: "https://x.com/TheOneGroupAI/status/2108930755933913527",
      label: "X · @TheOneGroupAI（落地页上线 + 线索收集 + Google Ads Search 地域定向）",
      date: "2026-10-10",
      dateLabel: "发布",
    },
  },
  {
    id: "200",
    slug: "inbox-courses-budgets-assistant",
    title: "收件箱与做课预算一并打理",
    summary:
      "个人同时打理收件箱、做课进度与支出预算：分拣草稿、课纲待办与预算提醒进飞书，付款须人确认。",
    description:
      "独立讲师或内容作者常一手回邮件、一手赶课、还要盯工具订阅与外包支出。Agent 把收件箱按「需回复/可归档/待跟进」分拣并起草回复；把做课任务拆成大纲、素材、发布节点；再对照预算表汇总本周支出与余额预警，统一写入飞书看板。与 138（邮件式审批收件箱）不同：本条是个人同时管课与预算，不是企业审批流。硬约束：对外邮件与任何付款/订阅变更须人确认；不自动扣款、不自动回复客户；预算数字以本人账本为准，Agent 只做汇总与提醒。",
    categories: ["efficiency", "education"],
    platforms: ["chatgpt", "claude", "feishu", "deepseek"],
    sourceUrl: "https://michaelcrist.substack.com/p/claude-code",
    sourceLabel: "Substack · 收件箱与课程预算",
    upvotes: 81,
    trending: false,
    tags: [
      "收件箱分拣",
      "做课进度",
      "预算提醒",
      "飞书看板",
      "付款人确认",
    ],
    howItWorks: [
      "接入邮箱标签规则、课纲任务板与简易预算表",
      "Agent 分拣邮件草稿、更新做课待办，并生成周支出/余额摘要",
      "人在飞书审阅后手动发信与记账；付款与订阅变更仍本人操作",
    ],
    tips: [
      "预算表固定「已承诺/已支出/剩余」三列，避免 Agent 混用计划数与实付数",
      "客户询价类邮件单独标签，回复草稿禁止承诺未定价课包",
    ],
    approach: `Substack 作者 Michael Crist 以非技术背景 CEO 视角记述使用 Claude Code 约四个月：用 Agent 打理收件箱（过滤噪音、只留需回复）、把约 15 份孩子在家教育课程 PDF 做成带语音讲解的互动课，并从银行流水等材料搭家庭预算看板；文中亦覆盖邮件草稿、数据问答与仪表盘等「上下文简报」用法。公开文为个人上手指南叙事，未给出邮件处理条数、课程完成率或预算偏差等可独立核对量化；作者强调权限提示要人看、数字要抽查。

国内落地收成「邮箱分拣草稿 + 做课任务板 + 预算三列汇总 → 飞书看板」：需回复/可归档/待跟进分拣；课纲拆大纲/素材/发布节点；预算固定「已承诺/已支出/剩余」。硬约束：对外邮件与任何付款/订阅变更须人确认；禁止自动发信、禁止自动扣款或越权付款；预算以本人账本为准，Agent 只汇总提醒；询价邮件草稿禁止承诺未定价课包。`,
    outcomes: [
      "源未披露邮件分拣准确率、自动草稿采纳率、做课交付周期或预算偏差等量化；公开文侧重「收件箱 + 做课 + 预算看板」的个人并行打理叙事。",
      "作者自述：约四个月用 Claude Code 过滤收件箱、将约 15 份在家教育 PDF 做成互动课，并从流水材料搭建预算看板（文中陈述，非我方实测）。",
      "独立讲师/作者可把邮件、课纲与支出收成飞书看板待办；是否发信、是否付款/改订阅仍本人确认操作，Agent 不自动扣款、不自动回复客户。",
    ],
    caveats: [
      "公开源未给出可复用的效率或财务基线，上线后用自有邮箱与账本复盘，勿把「看板已更新」当成可无人值守财务。",
      "硬约束：对外邮件须人确认后发送；禁止自动回复客户；禁止自动扣款、禁止越权付款或擅自变更订阅；预算数字以本人账本为准。",
      "模型可能混用计划数与实付数；三列口径固定；客户询价单独标签且草稿不承诺未定价课包；邮箱与流水含隐私，飞书权限最小化。",
    ],
    prompts: [
      {
        title: "收件箱分拣与回复草稿",
        body: `你是个人收件箱助手。将邮件分为「需回复/可归档/待跟进」，并为需回复项起草中文回复草稿。禁止声称已发送；禁止承诺未定价课包或未确认档期；文首加「【草稿·待人确认后发送】」。

输出：
## 分拣列表（类目 / 主题 / 理由）
## 回复草稿（仅需回复项）
## 需人工补充的信息
## 非目标（不自动发信、不承诺未定价）

邮件摘要：
{{inbox_digest}}`,
      },
      {
        title: "做课待办与预算周摘要（飞书）",
        body: `根据课纲任务与预算表生成飞书看板周摘要（≤200 字）：做课节点（大纲/素材/发布）、已承诺/已支出/剩余三列、余额预警。必须出现「付款与订阅变更须人确认｜禁止自动扣款发信」。不要编造未提供的支出数字，不要混用计划数与实付数。

课纲与预算：
{{courses_and_budget}}`,
      },
    ],
    primarySource: {
      url: "https://michaelcrist.substack.com/p/claude-code",
      label: "Substack · Michael Crist（非技术向：收件箱、互动课与预算看板的 Claude Code 用法）",
      date: "2026-03-18",
      dateLabel: "发布",
    },
  },
  {
    id: "201",
    slug: "freelance-website-outreach",
    title: "自由职业接站外联",
    summary:
      "独立开发者/自由职业主动接建站单：筛线索、写个性化外联草稿，人审后发，不自动群发。",
    description:
      "接建站单靠冷启动时，难在「找对人」和「信不千篇一律」。Agent 据公开站点/招聘页/本地商户线索筛出可能需要改版或新建站的对象，提取业务一句话与可见痛点，再起草短、个性化的外联邮件或 LinkedIn 私信草稿，进飞书待发队列。与 154（线索评分）、170（CRM 填表）不同：本条是独立开发者主动接建站外联草稿，不是评分流水线或 CRM 字段填充。硬约束：人审后发；禁止自动群发、禁止伪造案例与客户评价；未公开邮箱勿爬取或购买名单。",
    categories: ["efficiency", "career"],
    platforms: ["chatgpt", "claude", "feishu", "deepseek"],
    sourceUrl: "https://x.com/Chris_Wozniczek/status/2108253723558326629",
    sourceLabel: "X 原帖",
    upvotes: 78,
    trending: false,
    tags: [
      "自由职业",
      "建站外联",
      "个性化草稿",
      "人审后发",
      "不自动群发",
    ],
    howItWorks: [
      "设定目标行业与线索来源规则，生成可核对的潜在客户清单",
      "按站点公开信息写个性化外联草稿，附可替换的作品集链接占位",
      "人逐条审阅后手动发送；回复与报价另开跟进，不自动承诺工期价",
    ],
    tips: [
      "每封草稿点名对方站点上一处具体问题（速度、移动端、表单），忌空泛推销",
      "日发送上限由人手动控制，草稿队列默认关闭「一键全发」",
    ],
    approach: `X 上 Chris Wozniczek（@Chris_Wozniczek）发帖称：读过 Cognition 侧用 Devin 做营销运营的实验后，把 Devin 当同事接入——建好含流程与决策的 GitHub「大脑」、打通 Linear 与 Slack，并让其检索自由职业平台上的建站类机会、按预建站点做个性化冷外联草稿，同时检索潜在商户线索；帖称刚在周末前启动，尚无成交结果，并自嘲邮箱预热偏晚。公开帖为个人试验短述，未给出回复率、成交单量或垃圾投诉率等量化。

国内落地收成「公开线索筛清单 → 点名站点具体问题的个性化外联草稿 → 飞书待发队列 → 人手动发送」：每封点名速度/移动端/表单等可见痛点，附可替换作品集链接占位；LinkedIn/邮件等价通道皆可，回复与报价另开跟进。硬约束：外联须人确认后发；禁止自动群发、禁止一键全发、禁止伪造案例与客户评价；未公开邮箱勿爬取或购买名单；日发送上限由人手动控制。`,
    outcomes: [
      "源未披露外联回复率、约见转化、成交单量或垃圾投诉率等量化；公开帖侧重「Devin + GitHub 流程脑 + Linear/Slack → 检索线索并起草建站冷外联」的个人试验叙事，并称当时尚无结果。",
      "作者自述：已把 Agent 接入流程仓与协作工具，令其检索自由职业建站机会并按预建站点写个性化冷外联，同时检索商户线索；启动于周末前、尚无成交反馈（帖文陈述，非我方实测）。",
      "独立开发者可把「找人对、信不千篇一律」收成飞书待发的个性化草稿队列；是否发出、报价与工期承诺仍由人逐条确认，系统不自动群发。",
    ],
    caveats: [
      "公开源未给出可复用的外联效果基线，上线后用自有线索与送达/投诉复盘，勿把「草稿已生成」写成获客承诺。",
      "硬约束：外联须人确认后发；禁止自动群发与一键全发（勿发垃圾）；禁止伪造案例/客户评价；禁止爬取或购买未公开邮箱名单；日发送上限由人手动控制。",
      "模型可能编造对方业务细节或夸大自身案例；每封须点名可核的公开站点问题，缺信息标「待核实」；飞书队列默认关闭全发，报价工期另开人审。",
    ],
    prompts: [
      {
        title: "建站外联个性化草稿",
        body: `你是自由职业建站外联助手。根据公开站点/商户线索，写一封短、个性化的中文外联草稿（也可改作企微/邮件）。禁止伪造案例、客户评价或未提供的作品链接；禁止声称已发送；文首加「【草稿·待人确认后发送】」。

输出：
## 线索摘要（可核公开信息）
## 点名的具体站点问题（速度/移动端/表单等）
## 外联正文（≤180 字，含作品集链接占位）
## 待核实项
## 非目标（不自动群发、不伪造案例）

线索：
{{lead_public_profile}}`,
      },
      {
        title: "飞书待发队列校对清单",
        body: `把多封外联草稿压成飞书待发校对清单（≤180 字）：条数、已点名具体问题条数、缺公开邮箱/待核实条数、建议今日手动发送上限占位。必须出现「人确认后逐条发｜禁止一键全发群发」。不要编造回复率。

草稿摘要：
{{drafts_digest}}`,
      },
    ],
    primarySource: {
      url: "https://x.com/Chris_Wozniczek/status/2108253723558326629",
      label: "X · @Chris_Wozniczek（Devin 检索建站线索并起草个性化冷外联）",
      date: "2026-10-08",
      dateLabel: "发布",
    },
  },
  {
    id: "202",
    slug: "fleet-ci-fix-ship-prs",
    title: "工程 Bot 机群修 CI 并开 PR",
    summary:
      "多 Bot 机群专修 CI 失败：并行定位、修测例/脚本并开可审 PR，不自动合并。",
    description:
      "主干 CI 红灯堆积时，单人排队修测例效率低。约定一组工程 Bot：各自认领失败 job，拉取日志与相关 diff，尝试最小修复（测例、超时、依赖锁定、脆弱断言），每修一处开独立可审 PR 并附复现步骤与本地/CI 绿过说明。与 175（跨工具编排多 PR）、189（额度换可审 PR）不同：本条是多 Bot 机群专修 CI 失败。硬约束：不自动合并；密钥与生产凭据不进 Bot 上下文；破坏性改动（删测、跳过断言）须标红等人审；失败不可复现则只开诊断 issue，不瞎改。",
    categories: ["devtools"],
    platforms: ["chatgpt", "claude", "deepseek", "grok"],
    sourceUrl: "https://x.com/XFreeze/status/2098448967294173482",
    sourceLabel: "X 原帖",
    upvotes: 87,
    trending: false,
    tags: [
      "CI修复",
      "Bot机群",
      "可审PR",
      "不自动合并",
      "最小改动",
    ],
    howItWorks: [
      "监听 CI 失败队列，按 job/包拆分给多个工程 Bot",
      "各 Bot 据日志做最小修复并开带复现说明的可审 PR",
      "人审 diff 与 CI 状态后手动合并；机群无权点合并或绕过保护分支",
    ],
    tips: [
      "同一失败簇只派一个 Bot，避免重复开 PR 抢修同一测例",
      "PR 模板强制勾选「未删测、未加 skip、未改生产密钥」自检项",
    ],
    approach: `X 上 X Freeze（@XFreeze）记述 SpaceXAI 工程师 Lingxi 的机群用法：五个专长工程 Bot（iOS/共享移动、桌面、Android、基础设施、Grok Bot harness）各自可拉起云端编码 Agent，检视 transcript/截图，并把失败任务打回继续修；共用 Notion PR 库，约每 30 分钟扫描失败 CI、安全发现与合并冲突——有问题则派 Agent 再修，看起来过关则触发下一轮代码审阅。帖称此前人工大约能盯约 15 个云端 Agent，机群可并行管理逾 200 个，并配合运营 Bot「Jenny」做晨间同步与剧本更新，隔夜审计后早上留下待人审的 PR。另转述团队他人自述量级（如单月大量 PR、数周内搭基础能力等）。公开帖未给出「自动合并生产」流程，也未披露生产事故率。

国内落地收成「CI 失败队列 → 多 Bot 认领最小修复 → 带复现说明的可审 PR → 人审 diff/CI 后手动合入」：同一失败簇只派一个 Bot；密钥与生产凭据不进 Bot 上下文；破坏性改动（删测、skip 断言）标红。硬约束：合入与推生产须人审；禁止自动 merge、禁止机群点合并或绕过保护分支；失败不可复现则只开诊断 issue，不瞎改。`,
    outcomes: [
      "源未披露生产环境自动合并对照下的事故率、回滚次数或主干红灯平均修复时长等量化；公开帖侧重「多专长 Bot + 定时扫 CI/安全/冲突 → 隔夜留下可审 PR」的机群叙事。",
      "作者自述（帖内转述 Lingxi 机群）：五类工程 Bot 约每 30 分钟扫描失败 CI 等并打回修复；机群并行管理逾 200 个云端 Agent（相对此前约 15 的人工上限），早上留下待审 PR；并列举团队他人 PR/工期量级（帖文陈述，非我方实测，不可外推）。",
      "工程团队可把堆积红灯收成「最小修复可审 PR」队列；是否合入、是否推生产仍由人依据 diff 与保护分支规则决定，机群无权自动 merge 生产。",
    ],
    caveats: [
      "公开源未给出可复用的 CI 修复质量基线，上线后用自有失败簇与回滚演练复盘，勿把「并行 Agent 数」写成质量或稳定性承诺。",
      "硬约束：合入与推生产须人审；禁止自动 merge、禁止绕过保护分支；禁止密钥/生产凭据进 Bot 上下文；删测/skip 等破坏性改动须标红等人审；不可复现失败只开诊断 issue。",
      "模型可能用跳过断言「假绿」；PR 模板强制自检「未删测、未加 skip、未改生产密钥」；同一失败簇避免多 Bot 抢修重复开 PR。",
    ],
    prompts: [
      {
        title: "CI 失败最小修复 PR 说明",
        body: `你是 CI 修复助手。根据失败 job 日志与相关 diff，起草中文「可审 PR」说明：最小修复意图、复现步骤、本地/CI 验证说明。禁止建议自动合并或绕过保护分支；禁止输出真实密钥；若属删测/加 skip/弱化断言，必须标红「破坏性改动·待人审」。

输出：
## 失败簇与根因假设
## 最小改动摘要
## 复现与验证
## 风险与标红项
## 非目标（不自动 merge、不推生产）

输入：
{{ci_failure_bundle}}`,
      },
      {
        title: "飞书/企微合入检查表",
        body: `把机群开出的 PR 压成飞书/企微合入检查表（≤180 字）：PR 链接、CI 状态、是否触及删测/skip、是否含密钥变动、是否可复现。必须出现「人审后手动合入｜禁止自动 merge 生产」。不要编造通过率。

PR 摘要：
{{pr_digest}}`,
      },
    ],
    primarySource: {
      url: "https://x.com/XFreeze/status/2098448967294173482",
      label: "X · @XFreeze（转述 Lingxi 工程 Bot 机群扫 CI/安全并留下可审 PR）",
      date: "2026-09-11",
      dateLabel: "发布",
    },
  },
  {
    id: "203",
    slug: "research-paper-data-pipelines",
    title: "为论文搭建数据管道与分析",
    summary:
      "为研究论文搭建可复现的数据管道与分析脚本，结果与图表进飞书；不编造实验结果。",
    description:
      "论文写作常卡在「数据清洗散落、分析步骤说不清」。Agent 协助搭可复现管道：原始数据清单、清洗规则、特征/聚合步骤、分析笔记本或脚本，以及图表与表格输出约定；全程写清依赖版本与随机种子，归档到仓库与飞书研究页。硬约束：可复现；不编造实验结果——仅基于用户提供或公开可核验数据跑分析；缺失数据标「未跑/待补」而非填假数；统计结论须人核对后再写入论文草稿。",
    categories: ["education", "devtools"],
    platforms: ["chatgpt", "claude", "deepseek", "feishu"],
    sourceUrl: "https://yang3kc.substack.com/p/claude-code-is-secretly-an-excellent",
    sourceLabel: "Substack · 论文数据管道",
    upvotes: 83,
    trending: false,
    tags: [
      "论文",
      "数据管道",
      "可复现",
      "分析脚本",
      "不编造结果",
    ],
    howItWorks: [
      "明确研究问题、数据来源与可公开程度，列出管道阶段与输出物",
      "Agent 生成清洗/分析脚本骨架、配置与运行说明，试跑后导出图表",
      "人核对数值与图表后写入飞书/论文草稿；异常或缺数如实标注",
    ],
    tips: [
      "每个图表旁保留「数据文件哈希/生成命令」，方便审稿与复现",
      "禁止让 Agent「补全」未观测的单元格；缺测一律显式 NA",
    ],
    approach: `Substack 作者 Kevin Yang（yang3kc）记述用 Claude Code 做论文数据分析：以 Agent 为主写清洗与分析脚本，配合 Lazygit、Cursor 审改与 Jupyter 看图；强调先写 Markdown 总计划与分组件计划（清洗 → 各研究问题分析 → 图表输出），再逐脚本生成、审代码与核对输出，用 Git 回滚失控改动，并为 Parquet 等格式提供 CLI 工具说明写入项目约定。作者自述在撰文阶段的论文分析中，相信 Agent 生成了逾 98% 的相关代码，并称会继续审结果、对发表级精细作图仍常手调。公开文未给出图表差错率、审稿返工次数或相对纯手写管道的省时量化。

国内落地收成「研究问题 + 数据清单 → 可复现管道骨架 → 试跑图表 → 人核数值后进飞书/论文草稿」：依赖版本与随机种子写清；每图旁留数据文件哈希/生成命令；缺测显式 NA。硬约束：可复现；不编造实验结果——仅基于用户提供或公开可核验数据；缺失标「未跑/待补」而非填假数；统计结论须人核对后再写入论文草稿。`,
    outcomes: [
      "源未披露图表数值差错率、人审驳回率、审稿返工次数或相对手写管道的省时量化；公开文侧重「计划拆解 → 逐脚本生成与核验 → Git 回滚」的论文数据管道叙事。",
      "作者自述：用 Claude Code 完成在研论文的数据分析管道搭建与探索，并相信相关代码逾 98% 由 Agent 生成；仍逐步审代码与输出，发表级作图常手调（文中陈述，非我方实测）。",
      "研究者可把散落清洗/分析收成仓库脚本 + 飞书研究页图表归档；是否写入论文结论仍须人核对数值与统计假设后决定，禁止用假数补全未观测单元格。",
    ],
    caveats: [
      "公开源未给出可复用的分析正确率基线，上线后用自有数据与复现命令复盘，勿把「代码占比高」写成结论可靠。",
      "硬约束：管道须可复现（依赖/种子/命令可核）；禁止编造实验结果或补全未观测值；缺失一律显式 NA/未跑；统计结论须人核对后再进论文草稿。",
      "模型可能误解变量定义或静默丢行；每步保留摘要统计与回滚点；飞书页只作研究草稿，对外投稿口径以人审为准。",
    ],
    prompts: [
      {
        title: "论文数据管道计划骨架",
        body: `你是科研数据管道助手。根据研究问题与数据清单，用中文写可复现管道计划（Markdown）。禁止编造未提供的数据文件、样本量或实验结果；缺数据处写「待补/未跑」。

输出：
## 研究问题与非目标
## 原始数据清单与可公开程度
## 阶段：清洗 / 各 RQ 分析 / 图表输出（输入输出与脚本名）
## 依赖版本与随机种子约定
## 复现命令草稿
## 非目标（不编造结果、不填假数）

输入：
{{research_scope_and_data}}`,
      },
      {
        title: "飞书图表归档校对卡",
        body: `把试跑图表压成飞书研究页校对卡（≤180 字）：图表名、生成命令或脚本、数据文件哈希/路径、是否含 NA/未跑标记、待人核数值项。必须出现「结论须人核对｜禁止编造实验结果」。不要填写未跑出的显著性或效应量。

图表摘要：
{{figures_digest}}`,
      },
    ],
    primarySource: {
      url: "https://yang3kc.substack.com/p/claude-code-is-secretly-an-excellent",
      label: "Substack · Kevin Yang（Claude Code 搭论文数据管道与分析：计划拆解与逐步核验）",
      date: "2025-07-09",
      dateLabel: "发布",
    },
  },
  {
    id: "204",
    slug: "prep-sales-youtube-ideas",
    title: "销售通话准备与 YouTube 选题调研",
    summary:
      "双线并行：会前销售简报 + YouTube 选题池调研；两类草稿均人审后再用。",
    description:
      "销售与内容常抢同一块时间：明天要通话，本周还要定视频选题。Agent 双线作业——会前据公开资料与 CRM 笔记整理客户背景、可能异议与提问清单成销售简报；同时扫描赛道热议与自家产品能力，产出 YouTube 选题池（标题候选、角度、素材缺口）。结果一并进飞书。硬约束：双线草稿人审；简报不编造客户未说过的承诺或竞品数据；选题不作假播放量/评论；对外邮件与视频脚本发布前须本人定稿。",
    categories: ["content", "efficiency"],
    platforms: ["feishu", "chatgpt", "claude", "deepseek"],
    sourceUrl: "https://annikahelendi.substack.com/p/my-honest-lindy-ai-review-what-works",
    sourceLabel: "Substack · 销售准备与选题",
    upvotes: 76,
    trending: false,
    tags: [
      "销售简报",
      "YouTube选题",
      "双线调研",
      "飞书",
      "草稿人审",
    ],
    howItWorks: [
      "输入通话对象与内容栏目目标，分别跑会前简报与选题调研",
      "输出客户背景/异议清单与选题池卡片，写入飞书双栏看板",
      "销售与内容负责人各自审阅后使用；通话纪要与成片脚本另开人审",
    ],
    tips: [
      "简报标明每条事实来源（官网/新闻/CRM 字段），无来源标「待核实」",
      "选题池按「可拍素材是否已有」排序，优先可落地的低成本角度",
    ],
    approach: `Substack 作者 Annika Helendi 记述试用 Lindy AI 约月余：从模板库拉起销售通话准备自动化——日历事件含 discovery 时，会前用 LinkedIn、Crunchbase 与网页检索整理会面对象资料，并在会前约十分钟发一封简明摘要邮件；另搭 YouTube 研究助手 Agent，用于找选题、扫竞品频道与起草脚本等。文中同时谈及记笔记模板、合规徽章与积分消耗焦虑，并称复杂内容系统仍偏 Make.com 等传统编排。公开文为产品评测叙事，未给出通话赢单率、选题采纳率或脚本发布量等可独立核对量化。

国内落地收成「会前销售简报 + YouTube/短视频选题池 → 飞书双栏看板 → 两类草稿均人审」：简报每条事实标明来源（官网/新闻/CRM），无来源标「待核实」；选题按「可拍素材是否已有」排序。硬约束：销售通话准备勿编造客户未说过的承诺、竞品数据或未核实职衔；对外话术与视频脚本发布前须本人定稿；不作假播放量/评论；不自动对外发信。`,
    outcomes: [
      "源未披露通话赢单率、简报事实差错率、选题采纳率或成片发布量等量化；公开文侧重「会前销售准备模板 + YouTube 选题研究助手」的双线试用叙事。",
      "作者自述：销售准备模板可在数分钟内跑通，discovery 日程触发后会前检索并约十分钟送达摘要邮件；另建 YouTube 研究助手做选题/竞品/脚本向辅助（文中陈述，非我方实测）。",
      "销售与内容同学可把「明天通话 + 本周选题」收成飞书双栏草稿；是否用于通话、是否对外发布话术/脚本仍须人审定稿，禁止编造客户事实。",
    ],
    caveats: [
      "公开源未给出可复用的销售或内容效果基线，上线后用自有 CRM 与选题看板复盘，勿把「会前邮件已发」当成赢单或播放承诺。",
      "硬约束：勿编造客户事实、未证实职衔、竞品数据或客户未承诺条款；对外话术/邮件/视频脚本须人审后定稿；禁止作假播放量/评论；禁止自动对外发信。",
      "模型可能把检索噪声写成「客户痛点」；每条简报保留来源或「待核实」；选题池优先低成本可拍角度；飞书权限按销售/内容分栏最小化。",
    ],
    prompts: [
      {
        title: "会前销售简报（可核来源）",
        body: `你是销售会前简报助手。只根据给定公开资料与 CRM 笔记写中文简报。禁止编造客户未说过的承诺、未提供的竞品数据或未核实职衔；无来源句子必须标「待核实」。文首加「【草稿·通话使用前须人审】」。

输出：
## 对象与公司背景（条条附来源）
## 可能异议与提问清单
## 待核实项
## 非目标（不编造客户事实、不自动发信）

输入：
{{call_context_sources}}`,
      },
      {
        title: "YouTube/短视频选题池卡片（飞书）",
        body: `根据赛道热议与产品能力输出飞书选题池（≤5 张卡片要点）：标题候选、角度、素材缺口、是否已有可拍素材。禁止编造播放量/评论数；页眉写「草稿｜发布前须人定稿」。

输入：
{{niche_and_product_notes}}`,
      },
    ],
    primarySource: {
      url: "https://annikahelendi.substack.com/p/my-honest-lindy-ai-review-what-works",
      label: "Substack · Annika Helendi（Lindy：销售会前准备模板 + YouTube 选题研究助手）",
      date: "2025-07-28",
      dateLabel: "发布",
    },
  },
  {
    id: "205",
    slug: "home-assistant-automations-agent",
    title: "用编码 Agent 管家庭自动化",
    summary:
      "用编码 Agent 读写 Home Assistant 自动化与脚本：编排、排障、改 YAML/蓝图；改动须人确认后写入，不擅自控设备。",
    description:
      "家里灯、温控、安防规则越积越多，改一条自动化常要翻 YAML、查实体 ID、对照日志。本条聚焦 Home Assistant：Agent 在本地仓库/配置目录里梳理自动化与脚本，按场景起草或改写触发器与动作，对照失败日志定位实体缺失、时区错配、条件过严等问题，并给出可审 diff。结果可摘要进飞书家庭运维页。区别于日历入历、个人助理杂事与语音提醒：本条只管 HA 自动化编排与排障，不做通用日程或提醒。硬约束：任何写入 HA、重启集成或远程控设备须人确认；禁止在无人值守时开关门锁/安防/燃气相关实体；密钥与访问令牌不进对话明文；改动能回滚才合入。",
    categories: ["life", "efficiency"],
    platforms: ["claude", "chatgpt", "deepseek", "feishu"],
    sourceUrl: "https://blog.beguelin.com/2026/04/claude-code-home-assistant/",
    sourceLabel: "个人博客 · Home Assistant",
    upvotes: 86,
    trending: false,
    tags: ["Home Assistant", "家庭自动化", "YAML编排", "排障", "改动人确认"],
    howItWorks: [
      "接入本地 HA 配置仓库或导出的自动化清单，标明可改实体范围",
      "Agent 起草/修订自动化与脚本，对照日志给出排障说明与可审 diff",
      "人核对后手动写入 HA 或合并配置；门锁/安防类实体默认只读",
    ],
    tips: [
      "先在测试区或影子配置跑通，再合入生产 automations.yaml",
      "为门锁、摄像头、燃气阀单独建「禁止自动执行」实体白名单的反面清单",
    ],
    approach: `个人博客作者 Adam Beguelin 记述用 Claude Code 管 Home Assistant：自动化 YAML 进 Git 仓，经 scp 部署并 reload；经 MCP 查实体、读 automation trace、查设备状态。典型会话包括：排查「到家关摄像头」因定位心跳反复触发（补 from/to 过滤后部署提交）、把卧室夜灯亮度从过暗调高、从零设计棚屋运动亮灯且对「原本已亮的灯」到期不误关，并用 skills 文件固化 HA/OpenWrt 约定。作者称小改可在数轮对话内完成，示例排障到部署约两分钟量级。公开文为个人工作流叙事，未给出全屋故障率、误触安防次数或相对纯手写 YAML 的省时量化。

国内落地收成「HA 配置仓/导出清单 → Agent 起草可审 diff 与排障说明 → 人确认后写入/合入 → 摘要进飞书家庭运维页」：先在测试区或影子配置验证；门锁/摄像头/燃气阀进「禁止自动执行」反面清单。硬约束：任何写入 HA、重启集成或远程控设备须人确认；禁止在无人值守时越权改门锁/安防/燃气等危险场景；危险自动化须人确认；密钥与访问令牌不进对话明文；改动能回滚才合入。`,
    outcomes: [
      "源未披露全屋自动化故障率、误触安防/门锁次数、回滚次数或相对手写 YAML 的省时量化；公开文侧重「对话描述 → 查 trace/实体 → 写 YAML → scp/reload → git 提交」的 HA 运维叙事。",
      "作者自述：用 Claude Code + HA MCP 完成重复触发排障、亮度微调与新建运动亮灯等改动，并称示例排障到部署可在约两分钟内完成、小改数轮对话即可（文中陈述，非我方实测）。",
      "家庭用户可把散落自动化收成可审 diff + 飞书运维摘要；是否写入生产 HA、是否启用门锁/安防相关实体仍须人确认，Agent 不擅自控危险设备。",
    ],
    caveats: [
      "公开源未给出可复用的安全或稳定性基线，上线后用自有实体与回滚演练复盘，勿把「对话改 YAML 很快」写成可无人值守控家。",
      "硬约束：写入 HA/重启集成/远程控设备须人确认；禁止无人值守越权改门锁、安防布撤防、燃气阀等危险场景；危险自动化须人确认；令牌不进明文；无回滚不合入。",
      "模型可能选错实体 ID 或放宽触发条件；门锁/摄像头/燃气默认只读；先影子配置再合入 automations.yaml；飞书页不存长期有效访问令牌。",
    ],
    prompts: [
      {
        title: "HA 自动化可审 diff 说明",
        body: `你是 Home Assistant 自动化助手。根据场景与现有 YAML/实体清单，起草中文修订说明与拟议触发器/动作要点。禁止给出真实长期访问令牌；涉及门锁、安防布撤防、燃气阀或可能造成财产/人身风险的动作，必须标红「危险场景·默认只读·须人确认」，并默认不写入执行动作。

输出：
## 目标场景与非目标
## 拟议触发/条件/动作（含实体 ID 占位）
## 风险标红与回滚思路
## 验证步骤（影子配置优先）
## 非目标（不擅自控门锁安防燃气、不无人值守写入生产）

输入：
{{ha_scene_and_inventory}}`,
      },
      {
        title: "飞书家庭运维摘要",
        body: `把本次 HA 改动压成飞书家庭运维摘要（≤180 字）：改动文件/自动化名、是否触及门锁安防燃气、是否已人确认写入、回滚入口。必须出现「危险场景须人确认｜禁止无人值守改门锁安防」。不要粘贴访问令牌。

改动摘要：
{{ha_change_digest}}`,
      },
    ],
    primarySource: {
      url: "https://blog.beguelin.com/2026/04/claude-code-home-assistant/",
      label: "个人博客 · Adam Beguelin（Claude Code + HA MCP：编排/排障自动化并 git 部署）",
      date: "2026-04-02",
      dateLabel: "发布",
    },
  },
  {
    id: "206",
    slug: "interview-repurpose-content-pack",
    title: "客户访谈改写成多形态内容",
    summary:
      "一次客户访谈产出博客、短帖与 newsletter 草稿包；人审后发，不做多平台自动分发。",
    description:
      "访谈录音/纪要往往只用一次，复用成本高。Agent 据转录或笔记抽出金句、痛点与可公开案例，改写成博客长文骨架、短帖要点与 newsletter 段落，打成「内容包」进飞书待审。区别于社媒热帖选题、GitHub 周动态成博文、热点新闻 CMS 发稿：本条是单次访谈→多形态改写，不是选题发现或 CMS 直发。也≠多平台自动分发——各渠道文案只生成草稿，不自动推送到公域。硬约束：对外发布须人审；客户未授权的姓名/数据脱敏；禁止伪造引用与效果数字；录音仅用本人有权处理的材料。",
    categories: ["content", "efficiency"],
    platforms: ["feishu", "chatgpt", "claude", "deepseek"],
    sourceUrl: "https://aidecode.substack.com/p/building-a-content-repurposing-skill",
    sourceLabel: "Substack · 访谈改写内容包",
    upvotes: 82,
    trending: false,
    tags: ["客户访谈", "内容复用", "博客", "newsletter", "人审后发"],
    howItWorks: [
      "上传访谈转录/纪要，标注可公开段落与须脱敏字段",
      "Agent 生成博客骨架、短帖要点与 newsletter 段落组成内容包",
      "编辑在飞书审阅定稿后手动发布；系统不自动分发到各平台",
    ],
    tips: [
      "内容包统一附「出处时间码/纪要段落」，方便核对原话",
      "短帖与长文共用同一金句库，避免各渠道事实互相打架",
    ],
    approach: `Substack 作者 Wilbert Kramer（AI Decode）记述用 Claude Cowork 搭可复用「内容复用」技能：固定文件夹放入 brief.txt、访谈视频/照片，先转录（本地 Whisper 或浏览器工具回退），再按新闻叙事风格生成客户案例博客；人审通过后，以定稿博客为输入分别生成 LinkedIn 短帖与 newsletter 短段，最后仅以草稿形式落入 CMS/LinkedIn/邮件工具。核心原则是每步生成后等人反馈与明确批准才前进，技能规则写明永不自动点 Publish。作者自述：首访约一小时搭技能，之后每次约十分钟——备文件夹、触发、审三轮、查草稿再人手发布。公开文未给出阅读量、打开率、线索转化或客户投诉等量化。

国内落地收成「访谈转录/纪要 → 脱敏标注 → 博客骨架+短帖要点+newsletter 段落内容包 → 飞书待审 → 人审定稿后手动发」：短帖与长文共用金句库并附时间码/纪要出处；企微朋友圈/公众号草稿等价通道亦可。硬约束：对外发布须人审；访谈素材须客户同意且脱敏后再发；禁止伪造引用与效果数字；录音仅用本人有权处理的材料；系统不自动分发到各平台。`,
    outcomes: [
      "源未披露阅读量、打开率、线索转化、客户投诉或相对纯手写的省时对照等量化；公开文侧重「转录→博客→短帖→newsletter 逐步人审、只存草稿不自动发布」的 Cowork 技能叙事。",
      "作者自述：首访约一小时搭好可复用技能，之后每次访谈约十分钟完成三形态草稿审阅与落草稿箱；人保持创意控制，流程不黑箱一次吐完（文中陈述，非我方实测）。",
      "内容/客户成功团队可把「一次访谈只用一次」收成飞书待审内容包；是否对外发布、是否露出客户姓名与数据，仍须人审与客户授权确认，系统不自动分发。",
    ],
    caveats: [
      "公开源未给出可复用的内容效果基线，上线后用自有渠道数据复盘，勿把「草稿已生成/十分钟」写成传播或获客承诺。",
      "硬约束：访谈素材须脱敏且客户同意后再发；对外发布须人审；禁止伪造引用与效果数字；禁止自动多平台分发；录音仅用本人有权处理的材料。",
      "模型可能编造客户原话或夸大项目成果；内容包须附时间码/纪要出处，缺授权字段标「待脱敏/待同意」；飞书队列默认关闭一键全发。",
    ],
    prompts: [
      {
        title: "访谈内容包草稿",
        body: `你是客户访谈内容复用助手。根据已脱敏、已标注可公开范围的转录/纪要，生成中文「内容包」草稿：博客骨架、短帖要点、newsletter 段落。禁止伪造客户原话、效果数字或未授权姓名；禁止声称已发布；文首加「【草稿·待人审·须客户同意后发】」。

输出：
## 可公开摘要与须脱敏项
## 金句库（附时间码/纪要段落）
## 博客骨架（标题+小标题+引语占位）
## 短帖要点（≤130 字口径）
## newsletter 段落（60–100 字量级）
## 非目标（不自动分发、不伪造引用）

输入：
{{interview_transcript_redacted}}`,
      },
      {
        title: "飞书待审内容包校对卡",
        body: `把一份访谈内容包压成飞书待审校对卡（≤180 字）：是否已客户同意/脱敏、金句是否有出处、三形态是否事实一致、待核实项。必须出现「人审定稿后手动发｜禁止自动分发｜未同意不发」。不要编造打开率或阅读量。

内容包摘要：
{{content_pack_digest}}`,
      },
    ],
    primarySource: {
      url: "https://aidecode.substack.com/p/building-a-content-repurposing-skill",
      label: "Substack · Wilbert Kramer（Claude Cowork：访谈→博客/LinkedIn/newsletter 逐步人审草稿）",
      date: "2026-03-12",
      dateLabel: "发布",
    },
  },
  {
    id: "207",
    slug: "newsletter-perf-dashboard-nocode",
    title: "零代码搭 newsletter 效果看板",
    summary:
      "用 Agent+零代码把 newsletter 打开率/点击等指标拉成看板；只读汇总，不擅自改文案或名单。",
    description:
      "独立媒体与个人品牌常有发送平台数据，却缺一张能周看趋势的看板。Agent 协助对接导出 CSV/API（或 n8n 定时拉取），整理打开率、点击、退订与热门链接，生成飞书多维表或简易仪表盘字段与图表说明——重点是「搭看板看效果」，不是写稿发稿。区别于热点 CMS 发布、广告变体拉数、竞品广告日研报：本条盯自家 newsletter 效果面板，不做投放实验或竞品扫描。硬约束：默认只读指标；不自动改标题、不自动加减订阅者、不伪造打开/点击；对外分享报告前脱敏订阅者邮箱。",
    categories: ["efficiency", "content"],
    platforms: ["feishu", "n8n", "chatgpt", "claude"],
    sourceUrl:
      "https://futureinsidernews.substack.com/p/claude-code-changed-everything-heres",
    sourceLabel: "Substack · newsletter 效果看板",
    upvotes: 79,
    trending: false,
    tags: ["newsletter", "效果看板", "零代码", "飞书多维表", "只读汇总"],
    howItWorks: [
      "约定数据源（导出文件或只读 API）与指标字典：打开/点击/退订/热链",
      "Agent 生成清洗规则、看板字段与 n8n/飞书同步草案并试跑样例",
      "人确认字段映射后启用定时汇总；改文案与改名单仍在发送平台手动操作",
    ],
    tips: [
      "首周只接「汇总表」，勿把原始收件人列表同步进共享看板",
      "图表旁注明统计窗口与时区，避免跨周对比口径漂移",
    ],
    approach: `Substack 作者 Future Insider 记述非程序员用法：用 Claude Code 直接操作本机文件夹与工作流。文中举例「用自然语言描述想要的 newsletter 效果看板」，由 Agent 搭出可运行的内部工具，并自述过去同类外包约需 2,000–5,000 美元、现约三十分钟量级出雏形；同文还覆盖发票整理、研报抽取、写作管线与竞品并行分析等，但未公布任何自家 newsletter 的打开率、点击率、退订率或热链排行数值。公开文重点是「描述需求→出内部工具」的工作方式，不是一份带指标的效果复盘报告。

国内落地收成「发送平台导出 CSV/只读 API → 指标字典（打开/点击/退订/热链）→ Agent 生成清洗规则与飞书多维表/看板字段草案（可配 n8n 定时）→ 人确认映射后只读汇总」：首周只接汇总表，原始收件人列表不进共享看板；图表旁注明统计窗口与时区。硬约束：默认只读指标；不自动改标题、不自动加减订阅者；禁止伪造打开/点击等数字；对外分享报告前脱敏订阅者邮箱。`,
    outcomes: [
      "源未披露打开率、点击率、退订率、热链转化或看板准确率等量化；公开文侧重「自然语言描述 → Claude Code 搭 newsletter 效果内部看板」的非程序员叙事，未给出指标表。",
      "作者自述：描述所需看板后由 Claude Code 搭出可运行工具，称约三十分钟量级；并对比过去外包同类工具约 2,000–5,000 美元（文中陈述，非我方实测，不可外推为打开率提升）。",
      "独立媒体/个人品牌可把散落导出收成飞书多维表只读汇总；改文案与改名单仍在发送平台人手操作，系统不伪造或回写打开/点击。",
    ],
    caveats: [
      "公开源未给出可复用的 newsletter 效果基线，上线后用自有导出复盘，勿把「看板已搭好/三十分钟」写成打开率或增长承诺。",
      "硬约束：默认只读汇总；禁止伪造打开率/点击/退订等指标；禁止自动改标题或加减订阅者；对外分享前脱敏邮箱；原始收件人列表勿进共享看板。",
      "模型可能把样例数或他刊口径写成「你的真实打开率」；字段映射与统计窗口/时区须人确认；飞书图表只展示已核对的汇总行。",
    ],
    prompts: [
      {
        title: "newsletter 看板字段与清洗草案",
        body: `你是 newsletter 效果看板助手。根据数据源说明与指标字典，用中文起草「只读汇总」清洗规则与飞书多维表/看板字段草案。禁止编造打开率、点击率、退订率或任何未提供的指标数值；禁止建议自动改文案或改订阅名单。

输出：
## 数据源与只读边界
## 指标字典（打开/点击/退订/热链）与窗口/时区
## 清洗规则与字段映射
## 样例行占位（数值处写「待导入」）
## 非目标（不伪造指标、不回写发送平台）

输入：
{{newsletter_source_spec}}`,
      },
      {
        title: "飞书周看校对卡",
        body: `把本周 newsletter 汇总压成飞书校对卡（≤180 字）：期数、统计窗口与时区、是否仅汇总表、是否含原始邮箱、待人核字段。必须出现「只读汇总｜禁止伪造打开/点击｜不自动改名单」。不要填写未导入的打开率数字。

汇总摘要：
{{weekly_digest}}`,
      },
    ],
    primarySource: {
      url: "https://futureinsidernews.substack.com/p/claude-code-changed-everything-heres",
      label: "Substack · Future Insider（非程序员用 Claude Code：含 newsletter 效果看板等内部工具）",
      date: "2026-03-30",
      dateLabel: "发布",
    },
  },
  {
    id: "208",
    slug: "local-webapp-test-fix-one-session",
    title: "同会话测本地 Web 应用并修错",
    summary:
      "同一会话里打开本地 Web 应用、复现报错并提交最小修复；不自动合并，密钥不进上下文。",
    description:
      "独立开发者本地联调常在「浏览器看错 → 切回编辑器改 → 再刷新」之间来回。本条把「测+修」收进同一会话：Agent 按检查清单点本地页面或读控制台/网络日志，复现前端/接口错误，定位到相关文件后给出最小补丁与复测步骤。区别于浏览器 Agent 工作日测评、SEO 浏览巡检、意图评审加测试：本条是本地 Web 应用同会话修错闭环，不是线上巡检或产品意图评审。硬约束：改动以可审 diff/PR 提交，不自动合并主干；生产密钥与 .env 不进提示词；破坏性操作（清库、删迁移）须人显式同意；仅连接本机或本人授权的开发环境。",
    categories: ["devtools"],
    platforms: ["claude", "chatgpt", "deepseek", "grok"],
    sourceUrl: "https://www.test-lab.ai/blog/claude-code-chrome-extension-local-testing",
    sourceLabel: "test-lab.ai · 本地联调",
    upvotes: 88,
    trending: false,
    tags: ["本地联调", "Web应用", "同会话修错", "最小补丁", "不自动合并"],
    howItWorks: [
      "启动本地开发服务，约定可测路由与账号（无真实生产数据）",
      "Agent 按清单复现问题，读日志/堆栈后提交最小修复与复测说明",
      "人审 diff 并本地确认通过后再合并；会话无权推保护分支或清库",
    ],
    tips: [
      "用固定「复现脚本/点击路径」模板，避免每次口头描述漂移",
      "把含密钥的配置文件加入 Agent 忽略列表，只暴露脱敏后的报错片段",
    ],
    approach: `test-lab.ai 公开文记述 Claude Code（或 Desktop）搭配 Chrome 扩展做本地开发闭环：Agent 写代码后打开本机页面（如 localhost）、点击 UI、读控制台/报错，再回到终端最小修复并复测，全部在同一会话完成；扩展共用开发者真实 Chrome 会话（本机登录态与本地服务），新域名首次白名单批准。文中自举示例：为看板表加筛选时发现 query 未正确更新 URL，修路由后再确认，约三轮迭代且人无需来回切浏览器。文亦对比 Playwright MCP / Playwriter 的稳定与登录摩擦，并强调该组合不适合无头 CI、跨浏览器与团队回归。公开文未给出缺陷逃逸率、生产事故或相对纯手工联调的省时量化。

国内落地收成「本地开发服务 + 可测路由/测试账号 → 同会话按清单复现 → 最小补丁与复测说明 → 人审 diff 后手动合入」：固定复现脚本/点击路径；含密钥配置加入忽略列表。硬约束：仅连本机或本人授权的开发环境；改动以可审 diff/PR 提交，不自动合并主干；生产密钥与 .env 不进提示词；禁止连接生产库乱改；清库/删迁移等破坏性操作须人显式同意。`,
    outcomes: [
      "源未披露缺陷逃逸率、生产事故、回滚次数或相对手工联调的省时量化；公开文侧重「写码→本机浏览器点测→读控制台→同会话最小修复」的本地闭环叙事。",
      "作者自述（团队日用经验）：Chrome 扩展共用本机会话，示例「加筛选→发现 URL query 未更新→修路由→复测」约三轮迭代、人侧零次切换浏览器；并称该闭环适合本地冒烟而非 CI/团队回归（文中陈述，非我方实测）。",
      "独立开发者可把「浏览器看错↔编辑器改」收成同会话可审补丁；是否合入主干仍由人审 diff 与本地确认后决定，会话无权推保护分支或连生产库乱改。",
    ],
    caveats: [
      "公开源未给出可复用的联调质量基线，上线后用自有缺陷与回归清单复盘，勿把「同会话三轮修好」写成上线质量承诺。",
      "硬约束：仅本机/授权开发环境；禁止连接生产库乱改；禁止自动合并主干；密钥与 .env 不进上下文；清库/删迁移须人显式同意。",
      "模型可能用跳过校验或假数据「假绿」；PR/补丁说明须含复现路径与复测步骤；飞书/企微仅作联调摘要，合入仍走保护分支人审。",
    ],
    prompts: [
      {
        title: "同会话复现与最小修复说明",
        body: `你是本地 Web 联调助手。根据可测路由、复现路径与控制台/网络日志，起草中文「最小修复」说明与复测步骤。禁止建议连接生产库、清库或自动合并主干；禁止输出真实密钥；若需破坏性操作必须标红「待人显式同意」。

输出：
## 复现路径与现象
## 根因假设（对照日志）
## 最小改动文件与意图
## 复测步骤
## 风险与标红项
## 非目标（不连生产库、不自动 merge）

输入：
{{local_repro_bundle}}`,
      },
      {
        title: "飞书联调合入检查表",
        body: `把同会话补丁压成飞书/企微合入检查表（≤180 字）：复现是否通过、是否触及生产库/密钥、是否含清库等破坏性操作、本地确认人。必须出现「人审 diff 后合入｜禁止连生产库乱改｜禁止自动 merge」。不要编造通过率。

补丁摘要：
{{patch_digest}}`,
      },
    ],
    primarySource: {
      url: "https://www.test-lab.ai/blog/claude-code-chrome-extension-local-testing",
      label: "test-lab.ai · Claude Code + Chrome 扩展：本地写测修同会话闭环",
      date: "2026-03-14",
      dateLabel: "发布",
    },
  },
  {
    id: "209",
    slug: "homeschool-family-ops-agents",
    title: "家庭在家教育用多 Agent 运转",
    summary:
      "多 Agent 协同家庭在家教育：课表、作业检查与家务日程进飞书；对外通知与采购须家长确认。",
    description:
      "在家教育要把教学节奏、作业反馈与家庭后勤揉在一起。约定几个专职 Agent：课表/单元目标、作业批改草稿与学习材料清单、家务与接送日程，结果汇总到飞书家庭看板，家长一眼看到「今日学什么、谁欠交、家里还缺什么」。区别于个人助理杂事、预约提醒、旅行邮件入历：本条是家庭教学+后勤多 Agent 协同，不是单人杂事或旅行行程。硬约束：孩子对外消息、家校沟通与任何采购/付款须家长确认；不自动发布孩子照片或成绩到公域；学习评价仅草稿，最终反馈由家长定稿；敏感健康与身份信息最小化存储。",
    categories: ["life", "education"],
    platforms: ["feishu", "chatgpt", "claude", "doubao"],
    sourceUrl:
      "https://www.shippingskool.com/blog/mom-runs-family-5-ai-agents-homeschool-openclaw",
    sourceLabel: "个人博客 · 在家教育多 Agent",
    upvotes: 84,
    trending: false,
    tags: ["在家教育", "多Agent", "课表作业", "家庭看板", "家长确认"],
    howItWorks: [
      "设定学期目标、日课表模板与各 Agent 职责边界",
      "教学/作业/后勤 Agent 分别产出当日计划、批改草稿与待办，写入飞书",
      "家长审阅后执行通知与采购；孩子相关对外发送默认关闭自动执行",
    ],
    tips: [
      "作业批改草稿只给家长可见频道，避免孩子未准备好就看到生硬评语",
      "采购清单标注「可选/必需」，防止 Agent 把教具愿望单当成必买",
    ],
    approach: `Shipping Skool 博文（Beau Johnson）记述 Jesse Genet 的在家教育多 Agent 实践：五台 Mac Mini 各跑一名 OpenClaw Agent 并划权限——Sylvie 把教材照片转为课表/单元目标与可打印材料，Cole 做编码（文称四天内做出面向孩子的安全观看应用并部署到家用电视流媒体盒），Finn 只读财务摘要且仅私密频道沟通，Claire 管日程/消息，另有通用杂务；另用照片建教具库存并与课表联动。作者归纳硬件约三千美元量级、模型月费约五十美元以下。公开文未给出学业成绩提升、家校沟通时效或误发外消息次数等量化，也非对照实验。

国内落地收成「学期目标+日课表模板 → 教学/作业/后勤多 Agent → 飞书家庭看板（今日学什么、欠交、家缺）→ 家长审阅后执行」：作业批改草稿仅家长可见；采购清单标可选/必需。硬约束：未成年人隐私最小化；孩子对外消息、家校沟通与任何采购/付款须监护人确认；禁止越权联系学校或自动付款；不自动发布孩子照片或成绩到公域；学习评价仅草稿，最终反馈由家长定稿。`,
    outcomes: [
      "源未披露学业成绩变化、家校响应时效、误发外消息/误付款次数或相对纯人工课表的省时量化；公开文侧重「多 Agent 分权 + 教材/教具照片入知识库 + 飞书式家庭协同」的个人实践叙事。",
      "作者自述（转述 Jesse）：五 Agent 分机分权；Sylvie 从教材照片出课表与插图材料；Cole 约四天做出安全观看应用并上电视；硬件约三千美元、月费约五十美元以下量级（文中陈述，非我方实测，不可外推教育效果）。",
      "在家教育家庭可把课表/作业草稿/家务待办收成飞书家庭看板；对外通知、联系学校与采购付款仍须监护人确认，系统默认关闭孩子相关自动外发。",
    ],
    caveats: [
      "公开源未给出可复用的教育效果或安全事件基线，上线后用自有课表与外发审计复盘，勿把「Agent 已跑通」写成成绩或减负承诺。",
      "硬约束：未成年人隐私与身份信息最小化；对外消息/家校沟通/采购付款须监护人确认；禁止越权联系学校或自动付款；禁止自动公开孩子照片或成绩；评价仅草稿。",
      "模型可能生成不适龄评语或把愿望单当必买；批改草稿仅家长频道；财务类 Agent 保持只读并与教学 Agent 权限隔离。",
    ],
    prompts: [
      {
        title: "家庭当日教学与后勤看板",
        body: `你是在家教育家庭运营助手。根据学期目标、日课表模板与教具库存摘要，生成中文「当日看板」草稿（课表要点、作业检查草稿、家务/接送待办、采购可选清单）。禁止编造成绩或未提供的医疗/身份信息；禁止建议自动联系学校或自动付款；文首加「【草稿·待监护人确认】」。

输出：
## 今日学什么（按孩子代号，勿写真实全名）
## 作业检查草稿（仅家长可见口径）
## 家务/接送待办
## 采购清单（标注可选/必需）
## 待监护人确认项
## 非目标（不自动外发、不联系学校、不付款）

输入：
{{family_day_context}}`,
      },
      {
        title: "飞书家长确认卡",
        body: `把当日看板压成飞书家长确认卡（≤180 字）：是否含对外消息/家校联系、是否含采购付款、批改是否仅家长可见、隐私字段是否最小化。必须出现「监护人确认后执行｜禁止越权联系学校或自动付款｜未成年人隐私优先」。不要编造完成率或成绩。

看板摘要：
{{board_digest}}`,
      },
    ],
    primarySource: {
      url: "https://www.shippingskool.com/blog/mom-runs-family-5-ai-agents-homeschool-openclaw",
      label: "个人博客 · Beau Johnson / Shipping Skool（Jesse Genet：OpenClaw 多 Agent 运转在家教育）",
      date: "2026-03-26",
      dateLabel: "发布",
    },
  },
  {
    id: "210",
    slug: "smb-support-call-content-agents",
    title: "小团队客服外呼与内容 Agent 套件",
    summary:
      "小团队一套客服草稿、外呼提纲与内容稿 Agent；企微/飞书落地，外呼与对外发送须人审。",
    description:
      "十几人团队常一人兼客服、回访与内容。本条提供可本地化到企微/飞书的 Agent 套件：工单/会话回复草稿、回访外呼提纲与话术要点、以及可复用的帮助中心/短内容稿，统一进待审队列。区别于工单分拣回复草稿（133）、企微线程支持（139）、CRM 填表外联（154）、流失扩容信号回复（170）：本条是小团队「客服+外呼提纲+内容」组合套件，不是单一工单流、线程助手、CRM 填表或流失信号触发。硬约束：外呼与任何对外发送须人审；禁止自动拨号连拨与自动群发；不编造承诺折扣或未核实的政策；客户隐私字段最小化，通话录音仅按公司合规保留。",
    categories: ["enterprise", "efficiency"],
    platforms: ["wecom", "feishu", "chatgpt", "claude"],
    sourceUrl: "https://www.lindy.ai/case-study/seven-zero-ventures-b2lq1",
    sourceLabel: "案例站 · 小团队 Agent 套件",
    upvotes: 80,
    trending: false,
    tags: ["小团队", "客服草稿", "外呼提纲", "企微飞书", "人审外呼"],
    howItWorks: [
      "在企微/飞书配置客服、外呼、内容三类队列与可见范围",
      "Agent 分别生成回复草稿、外呼提纲与内容稿，写入对应待审列表",
      "负责人审阅后手动发送或外呼；系统不自动拨号、不自动群发",
    ],
    tips: [
      "外呼提纲强制带「今日可承诺范围」字段，超出范围标红停发",
      "内容稿与客服回复共用产品事实表，避免两边口径不一致",
    ],
    approach: `Lindy 案例页记述 Seven Zero Ventures 创始人 Rashi Gupta 的一人实践：面向十人以下团队与利基经营者，交付聊天客服、呼入/呼出外呼、内容复用与谈判类 Agent/工作流；客户线索自述全部来自合作伙伴目录而非广告投放。案例给出其自报目录线索收入「自 2025 年 1 月起 10K+ 美元」、客户 100% 来自目录等获客数字，但未披露外呼接通率、工单一次解决率、内容发布量或投诉率等客服/外呼运营量化。公开页重点是「一人用平台交付客服+外呼+内容能力」，不是自动外呼轰炸剧本。

国内落地收成「企微/飞书三类队列（客服回复、外呼提纲、内容稿）→ Agent 写入待审 → 负责人审阅后手动发送或外呼」：外呼提纲强制「今日可承诺范围」，超出标红；内容稿与客服共用产品事实表。硬约束：外呼与任何对外发送须合规人确认；禁止自动拨号连拨与自动群发；不编造承诺折扣或未核实政策；客户隐私字段最小化，通话录音仅按公司合规保留。`,
    outcomes: [
      "源未披露外呼接通率、工单一次解决率、内容采纳/发布量、客户投诉或相对纯人工的省时量化；案例页侧重「客服+呼入呼出+内容复用」组合交付与目录获客叙事，未给外呼效果表。",
      "作者/案例自述（Seven Zero Ventures）：面向小团队交付聊天客服、呼入/呼出与内容复用等能力；并自报自 2025 年 1 月起目录线索收入 10K+ 美元、客户 100% 来自目录（获客陈述，非外呼/客服效果实测，不可外推）。",
      "十几人团队可把一人兼岗收成企微/飞书三类待审队列；是否外呼、是否对外发送仍须合规人逐条确认，系统不自动拨号、不自动群发。",
    ],
    caveats: [
      "公开源未给出可复用的外呼/客服效果基线，上线后用自有接通与投诉复盘，勿把「目录收入/套件已上线」写成外呼转化承诺。",
      "硬约束：外呼须合规人确认；禁止自动拨号连拨与外呼轰炸；禁止自动群发；禁止编造折扣/未核实政策；隐私最小化，录音按合规保留。",
      "模型可能夸大可承诺范围或编造政策条款；外呼提纲缺「今日可承诺范围」则标红停发；飞书/企微队列默认关闭一键全拨全发。",
    ],
    prompts: [
      {
        title: "客服回复与外呼提纲草稿",
        body: `你是小团队客服与回访助手。根据工单/会话摘要与产品事实表，生成中文：①回复草稿 ②外呼提纲（含今日可承诺范围）。禁止编造折扣、未核实政策或竞品数据；禁止建议自动拨号连拨；文首加「【草稿·待合规人确认后发送/外呼】」。

输出：
## 工单事实（可核）
## 客服回复草稿
## 外呼提纲与可承诺范围
## 超出范围标红项
## 非目标（不自动拨号、不群发、不编造承诺）

输入：
{{ticket_and_product_facts}}`,
      },
      {
        title: "飞书/企微三类队列校对卡",
        body: `把客服/外呼/内容三类待审项压成飞书或企微校对卡（≤180 字）：各类条数、是否含自动拨号建议、是否超出可承诺范围、是否需隐私脱敏。必须出现「合规人确认后外呼/发送｜禁止自动外呼轰炸｜禁止一键群发」。不要编造接通率。

队列摘要：
{{queues_digest}}`,
      },
    ],
    primarySource: {
      url: "https://www.lindy.ai/case-study/seven-zero-ventures-b2lq1",
      label: "Lindy 案例 · Seven Zero Ventures（小团队客服/外呼/内容等 Agent 交付）",
      date: "2025-08-26",
      dateLabel: "收录更新",
    },
  },
  {
    id: "211",
    slug: "downloads-folder-sort-summaries",
    title: "下载文件夹自动分类并写摘要",
    summary:
      "把 Downloads 里散落文件按类型归档到子文件夹，并为每类写一页摘要；只整理本地目录，不擅自删除或上传云端。",
    description:
      "下载目录常堆满安装包、截图、合同 PDF 与临时压缩包，找文件靠滚动翻页。本条让 Agent 扫描本机 Downloads（或你指定的下载目录），按扩展名/内容线索分到「安装包」「文档」「图片」「压缩包」等子夹，并为每个子夹生成简短摘要（含数量、代表文件名、建议保留或清理线索）。结果可同步一份目录树摘要到飞书个人页便于检索。区别于桌面整理、PDF 归档入历：本条聚焦下载目录批量分类+文件夹级摘要，不做桌面图标重排，也不把文件写入日历。硬约束：默认只移动/复制到本机子目录，删除与清空回收站须人确认；不自动上传到网盘或外发；含身份证/银行卡号等敏感 PDF 仅本地处理并脱敏进摘要；路径与操作日志可回滚才执行批量移动。",
    categories: ["efficiency", "life"],
    platforms: ["claude", "chatgpt", "deepseek", "feishu"],
    sourceUrl:
      "https://wonderingaboutai.substack.com/p/i-tried-using-claude-cowork-to-organize",
    sourceLabel: "Substack · Downloads 整理",
    upvotes: 87,
    trending: false,
    tags: ["下载文件夹", "文件分类", "摘要", "本地整理", "删除须确认"],
    howItWorks: [
      "选定 Downloads（或自定义路径），约定分类规则与「只移不删」默认策略",
      "Agent 扫描并归档到子文件夹，为每类输出数量与代表文件摘要",
      "人核对摘要与样例路径后可选择性清理；敏感文件保持本地、摘要脱敏",
    ],
    tips: [
      "先在「试跑子目录」复制一小批文件验证规则，再对整库执行",
      "安装包与含密钥的配置文件单独建「勿摘要全文」规则，只记文件名与大小",
    ],
    approach: `Substack 作者 Karen Spinner（Wondering About AI）记述用 Claude Cowork 整理本机 Downloads：主目录约 2,200 个散落文件（整夹累积更多），授权文件夹后先盘点类型与数量，再提出约 11 个主分类方案，获批后才批量移动；随后按内容线索细分（如图片再拆社交/AI 生成等），并为含糊文件名给出重命名建议（作者自评约七成可用）。全文强调删除须多次确认、敏感凭证会被隔离提示，并反复提醒先备份。作者自述整段互动约二十分钟量级，清出可审的「过时安装包约 2GB」与待删试探文件清单；公开文未给出误移率、找回失败次数或相对纯手工整理的省时对照表。

国内落地收成「先整夹/关键子树备份 → 试跑子目录验证规则 → 只移不删默认策略 → 子夹摘要（数量+代表文件名）进飞书个人页 → 人核样例路径后再选择性清理」：安装包与含密钥配置「勿摘要全文」；身份证/银行卡类 PDF 仅本地处理、摘要脱敏。硬约束：勿误删或覆盖原文件；批量移动前须可回滚备份；删除与清空回收站须人确认；不自动上传网盘或外发。`,
    outcomes: [
      "源未披露误移率、误删次数、找回失败或相对纯手工整理的省时对照等量化；公开文侧重「授权目录→方案审批→分类移动→摘要/重命名建议、删除须确认」的 Cowork 叙事。",
      "作者自述：主目录约 2,200 文件在约二十分钟互动后收成约 11 个主分类及细分、67+ 文件获更可检索文件名，并标出约 2GB 过时安装包与少量待删试探项（文中陈述，非我方实测）。",
      "个人/小团队可把「下载目录乱堆」收成带摘要的本地子夹树与飞书目录摘要；是否删除、是否上传云端仍由人确认，系统默认只移不删、不外发。",
    ],
    caveats: [
      "公开源未给出可复用的整理准确率基线，上线后用自有抽样核对，勿把「二十分钟整理完」写成零误移承诺。",
      "硬约束：先备份再整理；勿误删/覆盖原文件；删除与清空回收站须人确认；禁止自动上传网盘或外发；敏感 PDF 仅本地且摘要脱敏。",
      "模型可能误判类型或重命名失真；批量移动须保留操作日志与可回滚路径；飞书只放脱敏目录摘要，不贴证件全文。",
    ],
    prompts: [
      {
        title: "Downloads 分类与摘要草案",
        body: `你是本机下载目录整理助手。根据文件清单（文件名、扩展名、大小、可选修改时间），用中文起草「只移不删」分类方案与各类一页摘要。禁止建议直接永久删除或清空回收站；禁止要求上传网盘；摘要中对疑似身份证/银行卡/密钥文件只记文件名与大小，不摘录正文。

输出：
## 备份与回滚前提（必须先满足）
## 分类规则与目标子夹
## 各类摘要（数量+代表文件名+保留/清理线索）
## 敏感/勿摘要全文清单
## 非目标（不误删覆盖、不自动上传）

输入：
{{downloads_inventory}}`,
      },
      {
        title: "飞书整理核对卡",
        body: `把一次 Downloads 整理计划压成飞书核对卡（≤180 字）：是否已备份、是否试跑子目录、是否默认只移不删、敏感文件是否本地脱敏、待人确认的删除项。必须出现「先备份再整理｜勿误删覆盖｜删除须人确认」。不要编造已删除数量。

计划摘要：
{{sort_plan_digest}}`,
      },
    ],
    primarySource: {
      url: "https://wonderingaboutai.substack.com/p/i-tried-using-claude-cowork-to-organize",
      label: "Substack · Karen Spinner（Claude Cowork：Downloads 约 2,200 文件分类+摘要，删除须确认）",
      date: "2026-01-31",
      dateLabel: "发布",
    },
  },
  {
    id: "212",
    slug: "interactive-html-lessons-for-students",
    title: "按课文生成互动 HTML 教案",
    summary:
      "教师给出段落、词汇与学习目标，生成含翻转卡片与理解题的互动 HTML 单课；仅教案草稿，不自动发给学生。",
    description:
      "备课时常要把课文段落改成可点的翻转卡片、填空与理解题，手工做 HTML 费时。教师粘贴课文片段、核心词汇与本节目标后，Agent 生成单课互动 HTML：词汇翻转卡、段落理解选择题、简短自测与答案区，可本地下载预览或放进飞书备课文件夹。区别于在家教育多 Agent 运转、课程反馈改课：本条是「单课互动教材生成」，不是家庭教学后勤协同，也不是依据测验成绩改整门课。硬约束：输出为教案草稿，默认不向学生邮箱/班级群自动推送；不收录学生真实姓名与成绩；版权课文仅用教师有权使用的材料；答案区可折叠，课堂展示前由教师审一遍。",
    categories: ["education"],
    platforms: ["claude", "chatgpt", "doubao", "feishu"],
    sourceUrl: "https://baseclasses.com/p/what-claude-code-can-teach-us-about",
    sourceLabel: "baseclasses.com · 互动教案",
    upvotes: 83,
    trending: false,
    tags: ["互动HTML", "教案", "翻转卡片", "理解题", "教师审后发"],
    howItWorks: [
      "粘贴课文段落、词汇表与本节学习目标，标明学段与难度",
      "Agent 生成含翻转卡、选择题与自测的单课 HTML，附答案折叠区",
      "教师本机预览修订后手动下发；系统不自动推班级群或学生邮箱",
    ],
    tips: [
      "同一单元复用词汇库，避免每课 HTML 术语写法不一致",
      "公开分享前去掉学校内网链接与班级花名册痕迹",
    ],
    approach: `baseclasses.com 作者 Luke Shepard 谈教育场景里的「vibe teaching」与 Agent 杠杆：文中引用教师用 Claude Code 的做法——粘贴课文段落、学段难度与词汇表，生成可在浏览器打开的单课互动 HTML（词汇翻转卡、理解题、选择题、简答框、教师模式与进度指示等），本机或智慧屏打开即用。同文还引用更广的教师 AI 省时调查与出题案例，但那是背景论据，并非本条「单课 HTML」的实测对照表。公开文未给出该 HTML 教案的正确率、学习增益或班级试用量化。

国内落地收成「课文片段+词汇+学习目标 → 单课互动 HTML 草稿（翻转卡/选择题/自测+答案折叠）→ 本机预览 → 教师人审后手动下发飞书备课夹/班级」：同单元复用词汇库；公开分享前去掉内网链接与花名册。硬约束：课件勿抄版权教材全文，仅用教师有权使用的材料；发布/下发前人审；默认不自动推学生邮箱或班级群；不收录学生真实姓名与成绩。`,
    outcomes: [
      "源未披露互动 HTML 教案的正确率、学习增益、班级完成率或相对手写课件的省时对照等量化；公开文侧重「段落+词汇+目标 → 可浏览器打开的互动单课」教师工作流叙事。",
      "作者转述教师用法：给出段落、学段、词汇与练习目标后，Agent 产出含翻转卡与理解题等的完整 HTML 单课，本机/智慧屏打开即可教（文中陈述/转述，非我方实测）。",
      "教师可把「手工做互动页」收成飞书备课文件夹中的 HTML 草稿；是否下发班级仍须教师预览人审，系统不自动推学生。",
    ],
    caveats: [
      "公开源未给出可复用的教学效果基线，试用后用自有课堂观察复盘，勿把「HTML 已生成」写成成绩提升承诺。",
      "硬约束：勿抄版权教材全文；仅用有权材料；发布/下发前人审；禁止自动推班级群或学生邮箱；不收录学生真实姓名与成绩。",
      "模型可能编造课文原句或答案错误；答案区须教师核对；飞书仅存教案草稿，对外分享前去掉花名册与内网链接。",
    ],
    prompts: [
      {
        title: "单课互动 HTML 教案草稿",
        body: `你是中小学/教培互动教案助手。根据教师提供的课文片段、词汇表、学段与学习目标，用中文说明结构并生成可本机打开的单课互动 HTML 草稿（词汇翻转卡、理解选择题、简短自测、可折叠答案区）。禁止照抄未授权的版权教材大段全文；禁止写入学生真实姓名或成绩；文首加「【教案草稿·待教师人审后下发】」。

输出：
## 学习目标与难度
## HTML 结构说明
## 完整 HTML（答案默认折叠）
## 版权/授权自检
## 非目标（不自动发给学生）

输入：
{{lesson_brief}}`,
      },
      {
        title: "飞书备课下发核对卡",
        body: `把一份互动 HTML 教案压成飞书备课核对卡（≤180 字）：材料是否有权使用、答案是否已核、是否含学生个人信息、是否将自动推群。必须出现「教师人审后下发｜勿抄版权教材全文｜不自动发给学生」。不要编造学习效果数据。

教案摘要：
{{html_lesson_digest}}`,
      },
    ],
    primarySource: {
      url: "https://baseclasses.com/p/what-claude-code-can-teach-us-about",
      label: "baseclasses.com · Luke Shepard（教育 Agent / 教师用 Claude Code 生成互动 HTML 单课）",
      date: "2026-01-07",
      dateLabel: "发布",
    },
  },
  {
    id: "213",
    slug: "tech-blog-draft-error-critique",
    title: "技术博文草稿挑错校对",
    summary:
      "对磁盘上的技术博文草稿做技术事实与代码片段校对循环；只出修订意见，不代发 CMS。",
    description:
      "技术博文最怕 API 参数写错、版本号过时、示例代码跑不通。作者把本地 Markdown/草稿目录交给 Agent，按「事实—代码—链接」三轮挑错：核对库名与版本表述、检查代码块语法与常见坑、标出失效或可疑外链，输出带行号的修订清单与建议改写句。区别于热点 CMS 发稿、社媒选题、访谈改写：本条不做选题发现与发布，只做技术向校对闭环。硬约束：默认不登录 CMS、不自动发布；不把仓库私钥或生产配置贴进示例；对不确定的外部事实标「待核实」而非编造；修订以 diff/批注形式交还作者定稿。",
    categories: ["content", "devtools"],
    platforms: ["claude", "chatgpt", "deepseek", "grok"],
    sourceUrl:
      "https://dev.to/railsstudent/automating-devrel-how-i-use-gemini-cli-and-gemini-3-to-catch-bugs-in-my-blog-posts-3koo",
    sourceLabel: "dev.to · 技术博文校对",
    upvotes: 85,
    trending: false,
    tags: ["技术博文", "挑错", "代码校对", "修订清单", "不代发"],
    howItWorks: [
      "指定本地草稿文件与目标技术栈/版本范围",
      "Agent 分轮检查事实表述、代码块与外链，输出带行号的问题清单",
      "作者按清单改稿；发布仍在本人 CMS 手动完成",
    ],
    tips: [
      "校对前提交「本文声称支持的版本表」，减少误报过时 API",
      "示例命令默认用占位符代替真实密钥与账号 ID",
    ],
    approach: `DEV.to 作者 Connie Leung 记述用 Gemini CLI 自定义 \`/critique\` 命令，对本地 Markdown 技术博文草稿做「技术编辑」循环：语法与术语大小写、代码块正确性与过时写法、叙事清晰度、结构可扫读、面向 DEV.to 的标签/标题建议，并给出发布就绪分与优先修改项。作者据此在示例项目中修了初始化白屏、开发态 Remote Config 拉取间隔、缺失环境变量一次性回报等问题——校对既盯博文表述，也反哺示例代码。公开文未公布每篇抓出多少缺陷、误报率或相对人工校对的省时表。

国内落地收成「本地草稿 + 声称支持的版本表 → 事实/代码/外链分轮挑错 → 带行号修订清单进飞书/企微待改 → 作者定稿后本人 CMS 手动发」：示例命令用占位符代替密钥。硬约束：默认不登录 CMS、不代发；不确定外部事实标「待核实」不编造；仓库私钥与生产配置不进示例；修订以 diff/批注交还作者。`,
    outcomes: [
      "源未披露每篇缺陷数、误报率、漏检率或相对人工校对的省时量化；公开文侧重「Gemini CLI `/critique` → Markdown 技术编辑反馈 → 改稿」闭环。",
      "作者自述：自定义 critique 命令后对草稿做多维挑错，并据此修复示例中的初始化白屏、开发态配置拉取间隔与缺失环境变量回报等问题（文中陈述，非我方实测）。",
      "技术作者可把「发前技术校对」收成带行号的飞书/企微修订清单；是否发布仍在本人 CMS 手动完成，系统不代发。",
    ],
    caveats: [
      "公开源未给出可复用的校对质量基线，上线后用自有勘误表复盘，勿把「已跑 critique」写成零技术错误承诺。",
      "硬约束：不代发 CMS；不确定事实标待核实、禁止编造 API/版本；示例禁止贴真实密钥与生产配置；发布仍由作者手动完成。",
      "模型可能误报过时 API 或漏看逻辑坑；校对前提供版本表；飞书清单须附行号与待核实标记。",
    ],
    prompts: [
      {
        title: "技术博文三轮挑错清单",
        body: `你是技术博文校对助手。根据本地 Markdown 草稿与「本文声称支持的版本表」，用中文输出带行号的修订清单，分轮覆盖：事实表述、代码块、外链。禁止编造未核对的 API/版本结论；不确定处标「待核实」；禁止建议自动登录 CMS 发布；示例中的密钥改为占位符。

输出：
## 版本表对照
## 事实问题（行号）
## 代码问题（行号）
## 外链/待核实
## 优先修改 Top3
## 非目标（不代发 CMS）

输入：
{{blog_draft_and_version_table}}`,
      },
      {
        title: "飞书发前校对卡",
        body: `把技术博文挑错结果压成飞书/企微发前校对卡（≤180 字）：高优缺陷数、待核实项、是否含真实密钥、是否已人改定稿。必须出现「作者 CMS 手动发｜不代发｜待核实不编造」。不要填写未提供的阅读量。

挑错摘要：
{{critique_digest}}`,
      },
    ],
    primarySource: {
      url: "https://dev.to/railsstudent/automating-devrel-how-i-use-gemini-cli-and-gemini-3-to-catch-bugs-in-my-blog-posts-3koo",
      label: "DEV.to · Connie Leung（Gemini CLI `/critique`：技术博文草稿挑错与示例代码回修）",
      date: "2025-12-20",
      dateLabel: "发布",
    },
  },
  {
    id: "214",
    slug: "refund-email-from-photo-receipt",
    title: "凭照片与收据起草退货退款邮件",
    summary:
      "商品照片+邮箱收据对齐订单号与日期，起草退货退款邮件；人审后发，勿自动提交退款。",
    description:
      "退货时常要对照快递箱照片、订单号与邮件收据再写一封条理清楚的退款信。用户上传瑕疵/错发照片，并提供邮件中的收据或订单摘要，Agent 抽取订单号、购买日期、商品名与金额，核对照片说明与收据字段是否一致，再起草礼貌、要素齐全的退货退款邮件草稿（可进飞书待发）。区别于亚马逊订阅取消退款、账单争议：本条聚焦「实物退货场景下照片与收据对齐后起草」，不是订阅管理或卡账单争议。硬约束：邮件仅草稿，须人审后手动发送；禁止自动提交平台退款表单、自动点击「申请退款」或代填支付密码；不伪造未发生的损坏描述；收据中的完整卡号与身份信息脱敏后再写入正文。",
    categories: ["life", "efficiency"],
    platforms: ["chatgpt", "claude", "deepseek", "feishu"],
    sourceUrl:
      "https://www.chatprd.ai/how-i-ai/workflows/automate-product-returns-and-refunds-using-claude-cowork",
    sourceLabel: "chatprd.ai · 退货退款草稿",
    upvotes: 81,
    trending: false,
    tags: ["退货退款", "收据对齐", "邮件草稿", "人审后发", "勿自动提交"],
    howItWorks: [
      "上传商品照片与收据/订单邮件摘要，标注期望处理方式（退货/换货/仅退款）",
      "Agent 对齐订单号、日期与金额，生成退款邮件草稿与核对表",
      "人核对事实后手动发送；系统不自动提交平台退款、不代点申请按钮",
    ],
    tips: [
      "草稿强制含「订单号、购买日期、问题简述、期望结果」四字段检查清单",
      "照片说明只用可见事实，避免夸大损坏以免审核驳回",
    ],
    approach: `chatprd.ai 工作流页整理 How I AI 节目片段（嘉宾 Nicole Ruiz 系统；页面亦写 Nicole Forsgren 演示片段）：用 Claude Cowork 上传瑕疵商品照片，检索已连接邮箱/支付收据中的订单号与购买信息，再起草面向客服的退货退款邮件；人核对订单细节与损坏表述后才发送。页列「照片→口述任务→助手搜收据并起草→人审发送」四步，并提醒多笔相近订单要按日期与金额过滤、照片须能看清瑕疵、不可核验的表述删掉。公开文/页未给出退款成功率、平均回款天数或相对手写邮件的省时量化。

国内落地收成「商品照片 + 订单/收据摘要 → 对齐订单号/日期/金额核对表 → 退款邮件草稿进飞书待发 → 人确认后手动发送」：草稿强制含订单号、购买日期、问题简述、期望结果；卡号与身份信息脱敏。硬约束：退款邮件须人确认后发；禁止伪造未发生的订单/金额/损坏；禁止自动提交平台退款表单或代点「申请退款」/支付密码。`,
    outcomes: [
      "源未披露退款成功率、平均回款天数、客服一次通过率或相对手写邮件的省时量化；公开页侧重「照片+收据检索→退款邮件草稿→人审发送」工作流。",
      "来源记述：助手可从邮件/PayPal 等收据中抽出订单号与购买细节并起草退款请求，最终由用户核准措辞后发送（节目/工作流页陈述，非我方实测）。",
      "消费者可将「找收据+写退款信」收成飞书待发草稿与核对表；是否发送、是否在电商 App 点申请，仍须人确认，系统不自动提交退款。",
    ],
    caveats: [
      "公开源未给出可复用的退款效果基线，勿把「草稿已生成」写成一定退成承诺。",
      "硬约束：退款邮件须人确认后发；禁止伪造订单号/金额/损坏描述；禁止自动提交平台退款或代填支付密码；收据中的完整卡号与身份信息须脱敏。",
      "模型可能张冠李戴相近订单；发送前逐项核对照片与收据；飞书队列默认关闭一键发送。",
    ],
    prompts: [
      {
        title: "退货退款邮件草稿",
        body: `你是退货退款邮件助手。根据商品照片说明与收据/订单摘要，用中文起草一封礼貌、要素齐全的退款邮件草稿，并附字段核对表。禁止编造未提供的订单号、金额、购买日期或损坏细节；禁止声称已提交平台退款；文首加「【草稿·待人确认后发送】」；卡号只保留末四位。

输出：
## 核对表（订单号/日期/金额/商品/期望结果）
## 邮件主题与正文
## 照片可见事实（不夸大）
## 待人确认项
## 非目标（不自动发送、不代点申请退款）

输入：
{{photo_and_receipt_bundle}}`,
      },
      {
        title: "飞书待发退款校对卡",
        body: `把退款邮件草稿压成飞书待发校对卡（≤180 字）：订单号与金额是否与收据一致、是否含未核验夸大表述、是否将自动发送。必须出现「人确认后发｜勿伪造订单/金额｜勿自动提交退款」。不要填写未提供的退款进度。

草稿摘要：
{{refund_draft_digest}}`,
      },
    ],
    primarySource: {
      url: "https://www.chatprd.ai/how-i-ai/workflows/automate-product-returns-and-refunds-using-claude-cowork",
      label: "chatprd.ai · How I AI 工作流（Claude Cowork：照片+收据→退款邮件草稿，人审后发）",
      date: "2026-06-06",
      dateLabel: "发布",
    },
  },
  {
    id: "215",
    slug: "biz-trip-hotel-shortlist-sheet",
    title: "出差酒店候选一键进表格",
    summary:
      "按价格与距离筛出差酒店，写入飞书表格短名单供审批；只做短名单，不自动下单付款。",
    description:
      "出差订房要在预算、距会场距离与评分之间反复比。给定城市、日期、预算上限与办公地点，Agent 汇总候选酒店的价位区间、通勤距离、取消政策要点，写入飞书多维表/表格短名单，方便同事或财务一眼对比后审批。区别于短途游规划、旅行邮件入历：本条是出差选酒店短名单进表，不是休闲行程，也不把行程自动写入日历。硬约束：只产出短名单与对比字段，禁止自动下单、自动付款或绑定公司卡；价格以当时公开页面为准并标注抓取时间；最终预订由人在差旅平台或官网完成；公司协议价与内部折扣不写入对外可转发表格。",
    categories: ["efficiency", "enterprise"],
    platforms: ["feishu", "chatgpt", "claude", "n8n"],
    sourceUrl:
      "https://app.therundown.ai/guides/use-claudes-chrome-extension-to-quickly-book-business-trips",
    sourceLabel: "therundown.ai · 出差酒店短名单",
    upvotes: 78,
    trending: false,
    tags: ["出差", "酒店短名单", "飞书表格", "价格距离", "不下单"],
    howItWorks: [
      "填写城市、入住离店日、预算、会场/办公室地址与必选字段",
      "Agent 整理候选并写入飞书表格：价、距离、评分摘要、取消政策",
      "审批人选定后由本人在差旅渠道下单；自动化流程止于短名单",
    ],
    tips: [
      "表格加「抓取时间」列，避免隔夜比价时还用过期房价",
      "默认勾选「可免费取消」筛选，降低改签差旅的沉没成本",
    ],
    approach: `The Rundown 指南（Billy Howell / The Rundown University）介绍用 Claude Chrome 扩展做出差酒店调研：先建 \`/hotel-picker\` 快捷指令（如 Booking.com 上限定酒店类型、距市中心、星级与口碑过滤），再准备表格表头，让助手把候选写入 Google Sheet（名称、每晚价、评分、距市中心、设施摘要、预订链接等）。文称一次调研约 10–15 分钟返回名单；亦可改接到 Notion。标题虽含 Book，正文交付物是表格短名单与可复用快捷指令，而非代扣款下单。公开指南未给出最终成单率、价差节省或相对手搜的准确率量化。

国内落地收成「城市/日期/预算/会场地址 → 候选整理 → 飞书多维表短名单（价、距离、评分摘要、取消政策、抓取时间）→ 审批人选定后本人在差旅渠道下单」：默认优先可免费取消。硬约束：订房付款须人确认；禁止自动下单、自动扣款或绑定公司卡；价格标注抓取时间；公司协议价不写入对外可转发表格。`,
    outcomes: [
      "源未披露成单率、平均节省房费、比价误差或审批通过率等量化；公开指南侧重「Chrome 扩展筛酒店→写入表格短名单（约 10–15 分钟量级）」流程。",
      "来源自述：跑通快捷指令与表格后，酒店调研名单约 10–15 分钟返回；字段含价、评分、距离、设施与链接等（文中陈述，非我方实测，不可外推为已自动订成）。",
      "差旅/行政可把多标签比价收成飞书短名单供审批；最终预订与付款仍由人在差旅平台或官网完成，自动化止于短名单。",
    ],
    caveats: [
      "公开源未给出可复用的省钱或准确性基线，勿把「10–15 分钟出表」写成已订房或最低价承诺。",
      "硬约束：订房付款须人确认；禁止自动下单/自动扣款/绑定公司卡；房价以抓取当时公开页为准并标注时间；协议价勿写入对外可转发表。",
      "模型或浏览自动化可能读到过期房价或触发站点风控；隔夜比价须重抓；飞书表默认无「一键支付」。",
    ],
    prompts: [
      {
        title: "出差酒店短名单表草案",
        body: `你是出差选酒店助手。根据城市、入住离店日、预算、会场/办公室地址与偏好，用中文起草飞书多维表短名单字段与候选行占位。禁止声称已下单或已扣款；禁止填写未提供的实时房价数字（价格处写「待抓取」并预留抓取时间列）；禁止建议自动绑定公司卡。

输出：
## 需求与过滤条件
## 表头（含抓取时间、取消政策）
## 候选行占位（3–10 行）
## 审批人待确认项
## 非目标（不下单、不自动扣款）

输入：
{{trip_hotel_brief}}`,
      },
      {
        title: "飞书订房审批卡",
        body: `把酒店短名单压成飞书审批卡（≤180 字）：预算是否超标、是否含抓取时间、是否可免费取消、是否将自动下单付款。必须出现「人确认后订｜禁止自动扣款预订｜短名单为止」。不要编造已支付金额。

短名单摘要：
{{hotel_sheet_digest}}`,
      },
    ],
    primarySource: {
      url: "https://app.therundown.ai/guides/use-claudes-chrome-extension-to-quickly-book-business-trips",
      label: "therundown.ai · Billy Howell（Claude Chrome：酒店调研写入表格短名单，约 10–15 分钟）",
      date: "2025-12-30",
      dateLabel: "发布",
    },
  },
  {
    id: "216",
    slug: "calendar-guest-research-briefing",
    title: "会前嘉宾调研推送到协作群",
    summary:
      "读取日历嘉宾名单，用公开网页做背景调研，会前短简报推飞书/企微；≠会议纪要，仅公开信息。",
    description:
      "重要会面前常要快速了解对方近期公开动态与角色背景。Agent 从日历事件读取嘉宾姓名/公司（或你粘贴的参会人列表），仅检索公开网页与官方简介，整理成一页会前简报：职位、近期公开言论/产品动态要点、可能相关的议题提示，推送到飞书或企微指定频道。区别于会议纪要、企微线程支持（139）：本条是会前背景简报，不是会后纪要，也不是客服/支持线程助手。硬约束：只用公开可访问信息，禁止爬取需登录的私密资料、禁止人肉非公开联系方式；简报默认内部频道，不自动群发外部嘉宾；涉及未证实传闻标「未核实」或省略；日历私密事件标题可脱敏后再推送。",
    categories: ["enterprise", "efficiency"],
    platforms: ["feishu", "wecom", "chatgpt", "claude"],
    sourceUrl: "https://www.xray.tech/post/ai-agent-zapier",
    sourceLabel: "xray.tech · 会前嘉宾简报",
    upvotes: 80,
    trending: false,
    tags: ["会前简报", "嘉宾调研", "飞书企微", "公开信息", "非纪要"],
    howItWorks: [
      "约定日历来源或粘贴参会人列表，指定飞书/企微推送频道",
      "Agent 仅用公开来源整理一页背景简报与议题提示",
      "会前推送到内部协作群；不生成会后纪要、不联系外部嘉宾",
    ],
    tips: [
      "简报模板固定「来源链接」栏，方便会中一键核对原文",
      "对内部敏感会议开启「仅推送组织者」模式，避免频道过宽泄露议题",
    ],
  },
  {
    id: "217",
    slug: "kids-homework-due-dates-calendar",
    title: "孩子作业与截止日期汇入日历",
    summary:
      "把各科作业与交截止时间整理进孩子专属日历并提前提醒；孩子数据默认本地、由家长掌控。",
    description:
      "小学到初中各科作业分散在家校群、纸质本与口头布置里，家长容易漏记某一科的交截止。家长把作业清单（拍照、粘贴或从群消息摘录）交给 Agent，抽取科目、任务名与截止日期，写入孩子专属日历事件，并按约定提前 N 小时/天提醒。可同步一份「本周作业一览」到飞书家长个人页便于全家查看。区别于在家教育多 Agent 运转、互动 HTML 教案：本条只做「作业清单→日历同步与提醒」，不做整套教学协同，也不生成课堂互动页。硬约束：孩子姓名、学校、成绩与作业正文默认仅存本机或家长可控目录，不上传公开网盘、不写入对外可转发频道；禁止自动联系老师或同学；日历标题可用脱敏昵称；删除/共享日历须家长确认；不把孩子真实证件号或定位轨迹写入事件备注。",
    categories: ["education", "life"],
    platforms: ["claude", "chatgpt", "doubao", "feishu"],
    sourceUrl: "https://news.ycombinator.com/item?id=49796524",
    sourceLabel: "HN · 作业截止日期入历",
    upvotes: 88,
    trending: false,
    tags: [
      "作业日历",
      "截止日期",
      "家校",
      "本地隐私",
      "家长可控",
    ],
    howItWorks: [
      "家长提供本周作业清单（文字/截图摘录）与提醒提前量，指定孩子日历",
      "Agent 抽取科目、任务与交截止，生成日历事件草案并附本周一览",
      "家长核对后写入日历；孩子数据保持本地/家长可控，不对外群发",
    ],
    tips: [
      "同一科目统一事件颜色，周末复习块单独标「可选」避免误当成硬截止",
      "开启「仅家长可编辑」日历权限，孩子端只读提醒即可",
    ],
  },
  {
    id: "218",
    slug: "grocery-cart-from-regular-list",
    title: "按常购清单自动填购物车",
    summary:
      "用家庭常购表一键往网超购物车加货并标缺货替代；只填车，默认不自动结账付款。",
    description:
      "每周买米油蛋奶水果几乎是同一批 SKU，在 App 里反复点选浪费时间。把常购清单（表格或备忘录：品名、规格偏好、数量、备选品牌）交给 Agent，对照当前网超可购商品填入购物车，缺货时按备选规则推荐替代并标出差价。区别于冰箱剩菜食谱、退货退款草稿：本条不做菜谱推荐，也不办退款，只做「常购表→购物车」。硬约束：默认只加购到购物车并输出核对清单，禁止自动点击结算、禁止代填支付密码/绑卡付款、禁止静默下单；价格与库存以当时页面为准并标注抓取时间；最终下单须人在 App/网页确认；会员专享价与地址隐私不写入可外发摘要。",
    categories: ["life", "efficiency"],
    platforms: ["chatgpt", "claude", "deepseek", "n8n"],
    sourceUrl:
      "https://christinasouch.com/blog/can-claude-automate-my-grocery-shopping",
    sourceLabel: "christinasouch.com · 常购清单",
    upvotes: 84,
    trending: false,
    tags: [
      "常购清单",
      "购物车",
      "网超",
      "缺货替代",
      "不自动结账",
    ],
    howItWorks: [
      "维护常购表（品名、规格、数量、备选品牌）并选定目标网超",
      "Agent 按表加购，缺货按备选规则给出替代与差价，输出购物车核对单",
      "人核对后在 App 手动结算；自动化止于购物车，不代付",
    ],
    tips: [
      "常购表加「勿替代」列（如特定品牌奶粉），避免被低价货顶掉",
      "周末大促前先试跑「只比价不加购」模式，确认规则再填车",
    ],
  },
  {
    id: "219",
    slug: "ai-saas-subscription-receipt-audit",
    title: "从邮件收据审计 AI 工具订阅",
    summary:
      "扫描邮箱收据列出 AI SaaS 订阅、标出重复与闲置线索；只盘点查重，不自动取消订阅。",
    description:
      "个人与小团队常同时开着多家大模型、绘图与写作 SaaS，邮件里收据散落，月底才发现重复付费。Agent 在授权邮箱范围内检索订阅/收据类邮件，抽出服务名、套餐档、扣款周期与金额，汇总成订阅台账，标出「同功能重叠」「长期无登录线索（若你提供使用记录）」与「即将续费」。结果可写入飞书表格便于复盘。区别于订阅取消与退款助手、账单争议：本条重心是盘点与查重，不是代办退订或卡单争议。硬约束：只产出台账与建议优先级，禁止自动取消订阅、禁止代点退订链接、禁止改绑支付方式；完整卡号与账单地址脱敏；本条不构成投资、理财或税务建议，是否续费由人决定；邮箱只读扫描，不转发收据到外部。",
    categories: ["efficiency", "life"],
    platforms: ["claude", "chatgpt", "deepseek", "feishu"],
    sourceUrl: "https://www.mindstudio.ai/blog/meta-muse-ai-agent",
    sourceLabel: "MindStudio · Muse 订阅审计",
    upvotes: 86,
    trending: false,
    tags: [
      "AI订阅",
      "邮件收据",
      "查重盘点",
      "不自动取消",
      "台账",
    ],
    howItWorks: [
      "授权只读扫描订阅/收据邮件文件夹，或粘贴近期收据摘要",
      "Agent 汇总服务名、金额、周期与重叠标记，输出续费日历与优先级建议",
      "人决定保留/降级/手动退订；系统不自动取消任何订阅",
    ],
    tips: [
      "台账加「上次实际使用日期」列（手工填），比单纯金额更能发现闲置",
      "团队共享席位与个人席位分行记录，避免把公司卡和个人卡混算",
    ],
  },
  {
    id: "220",
    slug: "sentry-bug-to-fix-pr",
    title: "Sentry 报错一键开修复 PR",
    summary:
      "从 Sentry 报错做根因草稿并开修复 PR 供人审；不自动合并、不上生产。",
    description:
      "生产环境 Sentry 告警一来，独立开发者常要在堆栈、相关文件与复现步骤之间来回跳。给定 issue 链接或导出的事件摘要与仓库访问权限，Agent 归纳可能根因、起草最小修复补丁，并创建指向默认分支的修复 Pull Request，附复现说明与风险说明供审查。区别于 CI 失败归因、通用 PR 审查机群：本条从监控告警出发直达修复 PR，不是泛化的 CI 诊断流水线。硬约束：PR 仅供人审，禁止自动 merge、禁止直接推生产分支、禁止在无评审情况下部署；密钥、生产连接串与用户 PII 不得写入 PR 描述或测试夹具；高危改动（鉴权、支付、数据删除）必须标「需人工加强审」且默认不开自动合并开关。",
    categories: ["devtools"],
    platforms: ["claude", "chatgpt", "deepseek", "grok"],
    sourceUrl:
      "https://blog.sentry.io/seer-can-now-trigger-cursor-agents-to-fix-your-bugs",
    sourceLabel: "Sentry Blog · Seer→Cursor",
    upvotes: 90,
    trending: false,
    tags: [
      "Sentry",
      "修复PR",
      "根因草稿",
      "人审",
      "不自动合并",
    ],
    howItWorks: [
      "粘贴 Sentry issue 或事件摘要，绑定目标仓库与默认分支策略",
      "Agent 分析堆栈、起草补丁并开 PR，写清复现与风险",
      "开发者审查、补测后手动合并；禁止自动合入生产",
    ],
    tips: [
      "PR 模板强制含「影响面 / 回滚方式 / 是否触及鉴权支付」三栏",
      "先在复现分支跑最小失败用例，再让 Agent 改代码，减少空想补丁",
    ],
  },
  {
    id: "221",
    slug: "sales-kb-im-bot-answers",
    title: "销售知识库 IM 问答机器人",
    summary:
      "销售在企微/飞书提问，Bot 仅基于内部知识库作答；敏感价目可配置须审批后回。",
    description:
      "一线销售常在群里问「某版本含不含某功能」「标准交付周期」「合同模板哪一版」，翻网盘和旧群很慢。在企微或飞书部署问答 Bot：销售 @Bot 提问后，仅检索公司核准的产品说明、FAQ、流程与话术库作答，并附来源条目便于核对。区别于工单分拣、企微客服会话草稿、CRM 外联：本条服务内部销售答疑，不是对外客服草稿，也不自动写外联邮件。硬约束：答案范围严格限定已入库文档，知识库外问题回复「未收录请转产品/解决方案」而非编造；敏感价目、折扣底线、未公开路线图可设「须主管审批后可见」；禁止把客户名单、合同扫描件原文贴进群答案；日志可审计，默认不外发到个人微信。",
    categories: ["enterprise", "efficiency"],
    platforms: ["feishu", "wecom", "chatgpt", "claude"],
    sourceUrl:
      "https://revengine.substack.com/p/paid-members-my-experience-with-zapier",
    sourceLabel: "RevEngine · Zapier Slackbot",
    upvotes: 82,
    trending: false,
    tags: [
      "销售知识库",
      "企微飞书",
      "IM问答",
      "范围限定",
      "价目审批",
    ],
    howItWorks: [
      "导入核准知识库并标记公开答 / 审批后答字段，接入企微或飞书机器人",
      "销售在 IM 提问；Bot 检索作答并引用条目，敏感题走审批流",
      "未收录问题转人工；不编造价格与未公开路线图",
    ],
    tips: [
      "价目表变更日同步刷新向量库，并在答案脚注写「文档版本日期」",
      "对「能否再便宜」类问题统一走审批模板，避免一线口头承诺踩线",
    ],
  },
  {
    id: "222",
    slug: "youtube-thumbnail-ctr-ideas",
    title: "按频道数据挑封面并给改版建议",
    summary:
      "结合频道分析对比高 CTR 封面特征，给出原创改版方向；只出建议，不出侵权搬运图、不伪造数据。",
    description:
      "创作者常凭感觉换缩略图，却说不清哪类构图、对比度与标题字数真正带来点击。连接或导入频道分析（公开或你有权导出的 CTR、展示次数与封面图），Agent 归纳高表现封面的共性（主体占比、文字层数、色相对比等），并针对指定视频给出若干原创改版方向与文案层级建议，可附简易线框说明。区别于多平台分发、技术博文挑错：本条专做缩略图效果复盘与改版建议，不做发稿与事实校对。硬约束：只输出文字/线框级建议与自有素材改法，禁止生成或提供可直接当作「搬运竞品封面」的成图；禁止伪造 CTR、展示量或编造未授权的竞品私有后台数据；引用公开对标时注明来源且不复制其商标图形；最终上传封面仍由创作者在平台后台手动完成。",
    categories: ["content"],
    platforms: ["chatgpt", "claude", "grok", "doubao"],
    sourceUrl: "https://videostats.ai/blog/grok-bot-youtube-analytics",
    sourceLabel: "VideoStats · YouTube 封面 CTR",
    upvotes: 79,
    trending: false,
    tags: [
      "YouTube封面",
      "CTR复盘",
      "改版建议",
      "原创",
      "不伪造数据",
    ],
    howItWorks: [
      "导入有权访问的频道分析与待优化视频列表，标明风格边界",
      "Agent 对比高 CTR 样本特征，输出原创改版方向与线框级说明",
      "创作者自行制图上传；系统不产出侵权搬运封面、不编造指标",
    ],
    tips: [
      "每次只改一个变量（主视觉或主文案）便于 A/B，避免一次大改说不清因果",
      "建议稿标注「基于你导出数据的观察，非平台官方预测」以免误读成承诺涨幅",
    ],
  },
  {
    id: "223",
    slug: "meal-log-nutrition-telegram",
    title: "聊天发餐食自动记营养",
    summary:
      "在微信/飞书发文字、语音或餐食照片，自动估热量与宏量并写入表格追踪目标；只记账不荐菜。",
    description:
      "减脂增肌或慢病饮食管理时，人常懒得打开记账 App，却习惯在聊天里随手说「午饭鸡胸花菜」或拍一盘菜。把微信/飞书（也可对接 Telegram 机器人）作为入口：文字、语音转写或餐食照片交给 Agent，识别食材与大致份量，估算热量与蛋白脂肪碳水，按日写入表格或飞书多维表，并对照你设定的目标给出当日进度。区别于冰箱剩菜食谱、常购清单填购物车：本条不做菜谱推荐与网购加购，只做「餐食记录→营养追踪」。硬约束：健康数据默认存本机或自建表，不向公开频道群发饮食细节；估算值仅供参考，不构成医疗营养处方，特殊疾病须遵医嘱；禁止自动下单保健品或代付外卖；照片中他人脸与住址背景应脱敏后再存。",
    categories: ["life", "efficiency"],
    platforms: ["wechat", "feishu", "claude", "n8n"],
    sourceUrl:
      "https://n8n.io/workflows/7756-nutrition-tracker-and-meal-logger-with-telegram-gemini-ai-and-google-sheets/",
    sourceLabel: "n8n · Telegram 营养打卡",
    upvotes: 87,
    trending: false,
    tags: ["营养打卡", "餐食记录", "热量宏量", "微信飞书", "不荐菜"],
    howItWorks: [
      "设定日热量/宏量目标，选定写入表格与聊天入口（微信/飞书等）",
      "用餐后发文字、语音或照片；Agent 估营养并追加当日台账与进度",
      "人可改份量校正；系统不荐菜、不代下单、不外发隐私饮食日志",
    ],
    tips: [
      "固定碗碟拍照角度，份量估算更稳；调味油单独口述以免漏记",
      "周末复盘只看「达标天数」与蛋白缺口，避免天天纠结单餐误差",
    ],
  },
  {
    id: "224",
    slug: "teacher-homework-scan-split",
    title: "手写作业扫描按人拆分建档",
    summary:
      "批量扫描手写作业，识姓名对照名册拆 PDF 并更新成绩表；只拆分建档，不自动打分对外发。",
    description:
      "班主任与科任常把一叠试卷一次扫成厚 PDF，再手工裁成「每人一档」极耗时。上传批量扫描件与班级名册后，Agent 识别卷面手写姓名（可辅以学号/座位号），按人裁切拆成单独 PDF/图片，写入飞书或企微云盘个人文件夹，并在成绩表登记「已交/缺页」状态。区别于孩子作业入历、互动 HTML 教案：本条服务教师侧「扫描→按人拆分建档」，不做家长日历提醒，也不生成课堂互动页。硬约束：学生姓名与成绩默认仅存校内可控目录，禁止未审批群发家长群或公开网盘；不得自动给卷面打分并作为正式成绩入库；缺页、重名须人工确认后再归档；禁止把未成年人证件照、家庭住址写入文件名或对外摘要。",
    categories: ["education", "efficiency"],
    platforms: ["feishu", "wecom", "claude", "chatgpt"],
    sourceUrl: "https://mcpmarket.com/tools/skills/homework-grading-workflow",
    sourceLabel: "mcpmarket · 作业批改工作流",
    upvotes: 91,
    trending: false,
    tags: ["作业扫描", "按人拆分", "名册对照", "教师建档", "不自动打分"],
    howItWorks: [
      "导入班级名册与批量扫描 PDF，约定云盘目录与成绩表字段",
      "Agent 识姓名拆卷、标缺页/重名待确认，生成个人档与交件状态",
      "教师核对后归档；不自动打分、不未审批群发家长",
    ],
    tips: [
      "名册预留「曾用名/别字」列，减少手写潦草误拆",
      "扫描时统一方向与分辨率，封面空白页先剔除可显著降误识",
    ],
  },
  {
    id: "225",
    slug: "seo-blog-draft-publish-agent",
    title: "SEO 感知博文起草与发布",
    summary:
      "学作者文风、找 SEO 缺口并起草博文，审批通过后再发布；不擅自上线、不堆砌关键词。",
    description:
      "独立站点作者既要保持文风，又要覆盖检索缺口，选题与初稿常卡住。给定站点既有文章样本与目标关键词池，Agent 归纳文风特征，对比公开检索意图找出内容缺口，起草结构完整的博文（标题、摘要、小标题与内链建议），生成预览稿供人改。区别于热点自动发 WordPress、GitHub 周记成文、技术博文挑错：本条重心是「SEO 缺口→文风对齐起草→人审发布」，不是无审发稿或单纯挑错。硬约束：默认只产出草稿与发布清单，禁止未经审批直接推生产站点；禁止抄袭竞品全文或伪造引用数据；关键词自然融入，禁止无意义堆砌；涉及医疗金融法律等须人工合规审后再发；外链与联盟声明按站点规范由人确认。",
    categories: ["content"],
    platforms: ["chatgpt", "claude", "deepseek", "n8n"],
    sourceUrl: "https://chudi.dev/blog/openclaw-autonomous-blog-agent",
    sourceLabel: "chudi.dev · OpenClaw 博文 Agent",
    upvotes: 85,
    trending: false,
    tags: ["SEO缺口", "博文起草", "文风对齐", "人审发布", "不擅自上线"],
    howItWorks: [
      "导入代表作样例与关键词池，约定站点发布渠道与审批人",
      "Agent 标出缺口、按文风起草并附内链/元描述建议",
      "作者改稿审批后再发布；系统不擅自上线、不抄袭竞品",
    ],
    tips: [
      "每篇只主攻 1 个主词 + 2 个相关词，避免一篇塞满互抢流量",
      "发布清单强制勾「事实核对 / 图片版权 / 免责声明」三栏再点发",
    ],
  },
  {
    id: "226",
    slug: "telegram-todo-calendar-weather",
    title: "Telegram 待办日历天气助手",
    summary:
      "用轻量机器人管待办、日历与天气三件套；可落在微信/飞书，精简自托管，不接重型框架。",
    description:
      "个人不想上沉重 Agent 平台，只想在聊天里随口记待办、查今日日程与出门天气。以微信、飞书或自建 Telegram 机器人作入口：自然语言添加/完成待办，查询或写入个人日历事件，按城市拉取当日天气并在晨间摘要里一并给出。部署可走扣子 Coze 或轻量自托管脚本，避免重型编排框架。区别于 WhatsApp/语音助理全家桶、家庭共享日历：本条聚焦「待办+日历+天气」精简三件套与可自托管，不做语音全家场景与多成员家庭协同。硬约束：待办与行程默认私聊可见，禁止未确认广播到群或对外频道；位置仅用你设定的城市名，不持续追踪 GPS；禁止自动拨打电话或群发通讯录；第三方天气 API 密钥存本地环境变量，不写入聊天记录。",
    categories: ["efficiency", "life"],
    platforms: ["wechat", "feishu", "claude", "coze"],
    sourceUrl: "https://news.ycombinator.com/item?id=50198933",
    sourceLabel: "HN · 自建 Telegram 助手",
    upvotes: 83,
    trending: false,
    tags: ["待办", "日历", "天气", "轻量机器人", "自托管"],
    howItWorks: [
      "选定聊天入口与日历/天气数据源，配置城市与晨间摘要时间",
      "对话添加待办、查改日程；Agent 汇总三件套回复",
      "敏感行程仅私聊；不群发、不追踪实时定位",
    ],
    tips: [
      "待办用「今晚前 / 周五前」这类相对时间，机器人再落成绝对截止",
      "晨间摘要只含今日三项最紧待办，避免变成信息噪音",
    ],
  },
  {
    id: "227",
    slug: "figma-mcp-build-homepage",
    title: "Figma MCP 一键落地首页",
    summary:
      "经 MCP/导出把 Figma 设计接到编码 Agent，生成可审的首页代码；不上生产、不擅自改设计源文件。",
    description:
      "独立开发者常有完整 Figma 首页稿，却卡在切图与组件还原。通过 MCP 或设计导出把画板结构、样式 token 与资源交给编码 Agent，生成对齐设计的首页前端（布局、响应式断点、基础交互），并输出差异说明供对照。区别于落地页+广告投放、三小时 Micro-SaaS：本条聚焦「设计稿→可审代码落地」，不做投放素材生成与整站商业化脚手架。硬约束：生成代码仅进特性分支或本地预览，禁止未评审直接部署生产；禁止在无授权下改写 Figma 源文件或覆盖主画板；设计中的商标、摄影图须确认授权后再打包；密钥与生产环境变量不得写入示例仓库；上线前须人做视觉与无障碍抽检。",
    categories: ["devtools", "content"],
    platforms: ["claude", "chatgpt", "deepseek", "n8n"],
    sourceUrl:
      "https://designphilosophy.substack.com/p/getting-remarkable-results-quickly",
    sourceLabel: "designphilosophy · Figma→Cursor",
    upvotes: 89,
    trending: false,
    tags: ["Figma", "MCP", "首页落地", "设计转代码", "人审部署"],
    howItWorks: [
      "授权只读访问目标 Figma 首页画板或导出结构，指定代码仓库分支",
      "Agent 还原布局与 token，提交预览构建与设计差异清单",
      "开发者对照稿审阅合并；不擅自改设计源、不自动上生产",
    ],
    tips: [
      "先锁定间距与字号 token 再生成，减少二次「看起来像但不齐」",
      "移动端断点单独开一列验收清单，避免只过桌面视觉",
    ],
  },
  {
    id: "228",
    slug: "vendor-invoices-bundle-accountant",
    title: "月末供应商发票打包交会计",
    summary:
      "从 PDF 抽供应商/日期/金额/票号，按月打包装索引，审批后再交会计；不自动付款入账。",
    description:
      "小微财务月末常把邮箱与网盘里的供应商发票 PDF 翻出来，手工填表再打包给会计。定时或一键扫描指定目录/企微飞书收件：Agent 抽取供应商名、开票日期、价税合计与发票号码，按月生成压缩包与索引表（可含校验码摘要），推送到审批人；通过后再交会计或共享只读文件夹。区别于发票入账表、AI 订阅收据审计：本条聚焦「月末打包交付会计」，不是日常入账流水，也不做 SaaS 订阅查重。硬约束：只整理与打包，禁止自动付款、禁止代填网银或改供应商收款账户；完整纳税人识别号与银行账号在对外摘要中脱敏；审批未通过不得外发压缩包；本条不构成税务申报意见，抵扣与入账口径由会计最终判定。",
    categories: ["enterprise", "efficiency"],
    platforms: ["wecom", "feishu", "claude", "n8n"],
    sourceUrl: "https://grokbot.dev/marketplace/invoice-hunter/",
    sourceLabel: "grokbot.dev · Invoice Hunter",
    upvotes: 86,
    trending: false,
    tags: ["供应商发票", "月末打包", "索引表", "企微飞书", "不自动付款"],
    howItWorks: [
      "指定发票目录与月份，约定索引字段与审批人（企微/飞书）",
      "Agent 抽票面字段、生成月包与索引，提交审批",
      "通过后交会计；系统不付款、不改收款账户、不代报税",
    ],
    tips: [
      "索引加「票种/是否电子专票」列，会计分拣更快",
      "重复票号自动标红，打包前人工剔除，避免一票两交",
    ],
  },
  {
    id: "229",
    slug: "whoop-blood-lab-health-query",
    title: "用两年运动手环与化验数据问答健康",
    summary:
      "把 WHOOP 等穿戴与化验 PDF 做成可问答健康库，查趋势对照指标；只解读数据，不做诊断开方。",
    description:
      "长期减脂、恢复训练或慢病随访时，人手里常有两年 WHOOP/运动手环导出，以及邮箱里陆续收到的化验 PDF，却很难对照「某段睡眠债是否与某指标同向变化」。导入穿戴导出与化验报告后，Agent 抽取关键指标与时间轴，支持自然语言问答趋势、区间对比与异常标红，并把私聊摘要落到微信或飞书，便于周末复盘；指标单位与参考区间可按报告页脚人工校对一次。区别于饮食打卡营养追踪：本条不做餐食记录与热量估算，聚焦「长期体征+化验→可问答查询」。硬约束：输出明确非医疗诊断、不构成医嘱；不自动联系医生或代约门诊；敏感健康数据默认本地/用户可控目录，不向群或公开频道外发；不得据此自动下单处方药、保健品或擅自改用药方案。",
    categories: ["life", "efficiency"],
    platforms: ["wechat", "feishu", "claude", "n8n"],
    sourceUrl: "https://github.com/snigdhabanda/health-agent-claude-",
    sourceLabel: "GitHub · WHOOP/化验 Health Agent",
    upvotes: 88,
    trending: false,
    tags: ["健康问答", "穿戴数据", "化验PDF", "趋势对照", "非医嘱"],
    howItWorks: [
      "导入 WHOOP 等导出与化验 PDF，约定本地/自建库与问答入口（微信/飞书）",
      "Agent 建时间轴指标库，回答趋势、对照与异常标红问题",
      "人审后再分享摘要；系统不做诊断、不自动联系医生、不外发敏感数据",
    ],
    tips: [
      "化验按「报告日+项目名」建主键，避免同项目多次复查串线",
      "问答限定「描述趋势与对照」，不索要「该不该吃药」式结论",
    ],
  },
  {
    id: "230",
    slug: "trip-receipts-expense-report",
    title: "差旅收据一键生成报销单并分流文件",
    summary:
      "从差旅收据批量抽取字段生成报销明细表并按类分流归档；只整理提审，不自动提交付款。",
    description:
      "出差归来邮箱与相册里常堆几十张酒店、打车、餐饮与杂费收据，手工誊进报销表既慢又易漏票、串行程日。指定差旅文件夹或企微/飞书收件后，Agent 识别票面商户、日期、金额与币种，生成按行程日排序的报销明细表，并把原件按「交通/住宿/餐饮/其他」分流到云盘子目录，附校验清单与缺票提示，供人核对后提审。区别于月末供应商发票打包与发票入账表：本条是「出行收据→个人/项目报销单」，非供应商月结入账。硬约束：只生成报销稿与归档，禁止自动提交财务系统付款或代填网银；完整卡号与证件号在摘要中脱敏；审批人未确认前不得外发整包；票据真伪与合规口径由财务最终判定，本条不替代公司报销制度。",
    categories: ["efficiency", "enterprise"],
    platforms: ["wecom", "feishu", "claude", "n8n"],
    sourceUrl: "https://ruben.substack.com/p/quit-chatgpt",
    sourceLabel: "Ruben Hassid · 差旅报销 Cowork",
    upvotes: 86,
    trending: false,
    tags: ["差旅报销", "收据分流", "报销单", "企微飞书", "不自动付款"],
    howItWorks: [
      "指定差旅收据目录与报销模板字段，约定审批人（企微/飞书）",
      "Agent 抽票面字段、生成明细表并按类分流原件",
      "人核对提审；系统不自动提交付款、不改收款账户",
    ],
    tips: [
      "出行前约定「一程一文件夹」命名，回国后一键扫目录即可",
      "外币票保留原币与当日汇率两列，财务复核更省事",
    ],
  },
  {
    id: "231",
    slug: "canvas-grade-against-rubric",
    title: "按量规从 Canvas 批量批改作业",
    summary:
      "对接 Canvas 拉取提交，按量规给建议分与评语草稿；人审确认后再入正式成绩。",
    description:
      "高校与培训教师在 Canvas 等 LMS 上面对成批电子提交，按 rubric 逐条打分并写个性化评语极耗时，还容易前后尺度不一。经 API 或导出拉取作业提交与量规后，Agent 对照各维度给出建议分、要点评语与共性错因摘要，写入飞书或企微待审表，供教师抽检修改后再回写。区别于手写作业扫描拆分、作业入历与 HTML 教案：本条是「LMS 提交→量规批改闭环」，不做扫描建档或家长日历提醒。硬约束：建议分与评语须人审后再入正式成绩；禁止未经教师确认直接写入成绩册定稿；学生作业与成绩仅存校内可控目录，禁止未审批外发；对疑似抄袭只标「需人工复核」，不做自动处分或通报。",
    categories: ["education"],
    platforms: ["feishu", "wecom", "claude", "chatgpt"],
    sourceUrl:
      "https://www.vitraag.com/2026/03/12/ai-assisted-grading-canvas-api-claude/",
    sourceLabel: "vitraag.com · Canvas API 批改",
    upvotes: 92,
    trending: false,
    tags: ["Canvas批改", "量规", "建议分", "人审成绩", "LMS"],
    howItWorks: [
      "授权只读拉取作业与量规，约定待审表与成绩回写权限",
      "Agent 按维度给建议分与评语草稿，汇总共性错因",
      "教师抽检确认后再写入成绩册；系统不擅自定稿成绩",
    ],
    tips: [
      "先用一小班试跑校准量规措辞，再扩到全班",
      "待审表强制「抽检比例」列，低于阈值不得批量确认",
    ],
  },
  {
    id: "232",
    slug: "xiaohongshu-notes-to-skills",
    title: "刷小红书笔记并蒸馏成可复用技能",
    summary:
      "检索小红书公开笔记并蒸馏成写作/运营技能包；只做摘要技能化，不自动发帖不抄原文。",
    description:
      "内容运营常要扫竞品小红书笔记找钩子、封面结构与转化话术，却容易陷入「收藏一堆、写稿时想不起来」。给定选题关键词与对标账号范围，Agent 检索公开笔记、读图文要点，蒸馏成可复用的写作/运营技能卡（结构模板、禁忌清单、转化节奏），写入本地或飞书技能库，供人改稿时按卡调用，并可按周增量刷新。区别于多平台分发与 SEO 博文起草：本条聚焦「竞品笔记调研→技能沉淀」，不做自动发帖与整站发布。硬约束：不自动发帖、不抄笔记原文；只做摘要与技能化改写，遵守平台与版权边界；禁止搬运他人配图与商标素材；账号 Cookie 与私信权限不得用于群发或爬取非公开内容；技能卡对外分享前须脱敏账号标识。",
    categories: ["content", "efficiency"],
    platforms: ["xiaohongshu", "claude", "deepseek", "coze"],
    sourceUrl: "https://mcp.csdn.net/6a2e2a5610ee7a33f27cbaeb.html",
    sourceLabel: "CSDN MCP · 小红书运营 Agent",
    upvotes: 84,
    trending: false,
    tags: ["小红书", "笔记蒸馏", "技能包", "竞品调研", "不自动发帖"],
    howItWorks: [
      "设定选题关键词、对标账号与技能卡字段模板",
      "Agent 检索公开笔记、提炼结构与话术模式写入技能库",
      "运营按技能改稿；系统不发帖、不粘贴原文、不搬运配图",
    ],
    tips: [
      "技能卡只保留「结构+禁忌+示例句式」，避免整段原文入库",
      "每周限域刷新一次对标池，防止技能库被旧爆款带偏",
    ],
  },
  {
    id: "233",
    slug: "notion-agents-control-plane",
    title: "用 Notion 当多 Agent 舰队控制台",
    summary:
      "用飞书多维表/企微文档当控制面调度十余个 Agent；只编排运维，不越权改生产。",
    description:
      "独立开发或小团队常同时跑客服、销售线索、运维巡检等十余个 Agent，状态散落在聊天记录与脚本参数里，很难统一启停与查故障。以 Notion 工作区作控制面的思路，落地到飞书多维表或企微文档：把每个 Agent 的任务队列、健康状态、权限边界与启停开关做成控制台，编排器按表派活并回写执行日志。区别于单点客服或销售 Bot：本条是「多 Agent 编排与运维控制台」，不是单一对话机器人。硬约束：控制台默认只读生产配置，禁止越权改生产 Agent 的密钥、模型路由与对外通道；启停与权限变更须双人确认或审批流；执行日志脱敏后归档，不得把用户隐私原文写入公开页。",
    categories: ["enterprise", "devtools"],
    platforms: ["feishu", "wecom", "claude", "n8n"],
    sourceUrl:
      "https://dev.to/aws-heroes/i-turned-notion-into-a-control-plane-for-my-18-openclaw-ai-agents-5624",
    sourceLabel: "DEV · Notion 控制 18 Agent",
    upvotes: 90,
    trending: false,
    tags: ["多Agent", "控制台", "飞书多维表", "编排运维", "不越权"],
    howItWorks: [
      "在飞书多维表/企微文档建 Agent 清单、队列与权限边界字段",
      "编排器按表派任务、回写状态与错误摘要",
      "变更生产配置走审批；系统不擅自改密钥、模型与对外通道",
    ],
    tips: [
      "每个 Agent 强制「最大并发+日预算」两列，防止失控刷量",
      "控制台首页只露状态灯与待办数，细节进子表避免误点改配置",
    ],
  },
  {
    id: "234",
    slug: "voice-debug-code-hands-free",
    title: "语音免提调试代码",
    summary:
      "语音驱动编码 Agent 查错改代码，适合走路带娃时排障；只本地预览，不擅自远程推送。",
    description:
      "开发者有时双手被占——走路、带娃或做饭——却仍想继续排查报错、试小补丁。通过语音转写把「打开某文件、解释栈、试某改法」交给编码 Agent，在本地仓库查日志、提出修复建议并生成可审 diff；也可用飞书语音消息作入口，回复文字 diff 摘要。区别于同会话测本地 Web 与 Sentry 开修复 PR：本条强调「语音免提交互调试」，不是监控告警闭环或浏览器测站。硬约束：默认只在本地或特性分支改动，禁止擅自 push/force 远程或覆盖主分支；生产密钥不得读入语音会话；涉及删库、迁移与权限变更必须二次口头确认口令后再执行；语音原文默认本地可删，不上传公开频道。",
    categories: ["devtools"],
    platforms: ["claude", "chatgpt", "deepseek", "feishu"],
    sourceUrl: "https://yberreby.com/posts/hands-free-claude-code/",
    sourceLabel: "yberreby.com · 免提 Claude Code",
    upvotes: 87,
    trending: false,
    tags: ["语音调试", "免提编程", "本地diff", "编码Agent", "不擅自推送"],
    howItWorks: [
      "选定仓库与语音入口，约定仅本地/特性分支可写",
      "口述报错与意图；Agent 查代码、给修复建议与 diff",
      "人确认后再提交；系统不擅自 push/force、不碰生产密钥",
    ],
    tips: [
      "口述先报「文件路径+报错首行」，再讲期望行为，歧义更少",
      "危险操作设唤醒口令（如「确认迁移」），避免误听执行",
    ],
  },
  {
    id: "235",
    slug: "shopify-price-stock-daily-tracker",
    title: "每日盯 Shopify 店铺改价与库存变动",
    summary:
      "按日拉取公开商品 feed，盯竞品改价、库存与上下架；只做哨兵告警，不改自家店价。",
    description:
      "跨境与独立站运营常要盯对标 Shopify 店铺的货盘：谁降价、谁断货、谁上了新品，靠人工点店既慢又漏。用 n8n 定时拉取对方公开的 products.json 等可合法访问的商品 feed，Agent 对比昨日快照标出改价、库存阈值跨越与上下架，摘要推到飞书群或私聊，并可按 SKU 白名单过滤噪音；Claude/DeepSeek 负责把变动写成可读日报。区别于发票对库存采购单与差旅报销：本条是「竞品货盘价格库存哨兵」，不做进销存记账。硬约束：仅使用公开、合规的 feed/接口，不爬取违反 ToS 的私有接口或绕过访问控制；不自动改自家店铺价，禁止据此自动改售价、库存或促销规则；告警默认只读，下架/跟价动作须人确认；抓取频率与范围遵守站点合理使用边界，敏感密钥仅存本地编排器。",
    categories: ["ecommerce"],
    platforms: ["n8n", "feishu", "claude", "deepseek"],
    sourceUrl:
      "https://tools.openkrill.app/blog/shopify-products-json-price-tracker",
    sourceLabel: "OpenKrill · Shopify products.json 盯价",
    upvotes: 89,
    trending: false,
    tags: ["Shopify盯价", "库存哨兵", "竞品监控", "飞书日报", "不自动改价"],
    howItWorks: [
      "配置对标店铺公开 feed 与 SKU 白名单，约定飞书告警频道与日更节奏",
      "n8n 拉取快照，Agent 对比改价/库存/上下架并生成日报摘要",
      "人决定是否跟价或补货；系统不改自家店价、不碰私有接口",
    ],
    tips: [
      "先只盯核心 SKU，避免全店变动刷屏淹没真信号",
      "快照按「店铺+日期」存本地，便于回溯谁先动价",
    ],
  },
  {
    id: "236",
    slug: "weekly-marketing-newsletter-agent",
    title: "自动调研并起草每周营销 Newsletter",
    summary:
      "定时调研本周资讯，起草营销 Newsletter 与社媒脚本草稿；人审通过后再发送。",
    description:
      "品牌与独立开发者常要周更营销信，却卡在「选题调研+改稿+配社媒脚本」的重复劳动上。按周触发后，Agent 按选题清单检索公开资讯与自家产品动态，起草 Newsletter 正文、标题候选与配套短帖脚本，落入飞书待审文档或邮件草稿箱；n8n 负责定时与归档，Claude/ChatGPT 负责结构化改写与语气校准。区别于 Newsletter 效果看板、访谈改写稿与 SEO 博文发布：本条是「周更营销信」生产流水线，非数据看板或单篇 SEO。硬约束：成稿须人审后再发，禁止自动对订阅列表群发；不抄竞品 Newsletter 全文或大段原文，只允许公开事实摘要与原创改写；外链与宣称口径须人工核对；退订与隐私字段不得写入公开草稿外发。",
    categories: ["content"],
    platforms: ["claude", "n8n", "feishu", "chatgpt"],
    sourceUrl:
      "https://annikahelendi.substack.com/p/build-your-own-ai-newsletter-agent",
    sourceLabel: "Annika Helendi · AI Newsletter Agent",
    upvotes: 91,
    trending: false,
    tags: ["Newsletter", "周更营销", "资讯调研", "人审后发", "社媒脚本"],
    howItWorks: [
      "设定选题清单、信源范围、语气与飞书待审文档模板",
      "周定时调研并起草 Newsletter 与配套短帖脚本入库",
      "人审改稿确认后再发送；系统不自动群发、不粘贴竞品全文",
    ],
    tips: [
      "每周固定「事实源+观点源」两栏，减少幻觉与口径漂移",
      "待审文档强制「已核外链」勾选，未勾不得点发送",
    ],
  },
  {
    id: "237",
    slug: "personal-agent-paperwork-lease-finance",
    title: "医疗文书、财务梳理与续租交给个人 Agent",
    summary:
      "个人 Agent 梳理医疗文书、财务账单与续租材料并出待办清单；只整理草稿，不代诊不代交。",
    description:
      "一个人同时面对医院回执、保险理赔材料、账单对账与租约到期时，材料散落在邮箱、相册与聊天里，很容易漏交或交错版本。持久个人 Agent 接入邮件摘要、日历与本地文件目录后，按事项归类医疗文书字段、财务流水疑点与续租条款差异，生成待办清单、表单草稿与催办提醒，经微信或飞书私聊推送；复杂条款可再让 Claude 对照上一版租约标红变更。区别于 WHOOP 健康问答、差旅报销与家庭作业入历：本条是综合行政委派，非体征数据或出行收据。硬约束：输出明确非医嘱、非诊断，不得据此改用药或替代就诊；敏感医疗与财务数据默认本地或用户可控目录，禁止未授权外发群聊；不自动对外提交正式申请、理赔或续租网签，所有正式提交须人确认后亲自完成。",
    categories: ["life", "efficiency"],
    platforms: ["wechat", "feishu", "claude", "n8n"],
    sourceUrl: "https://rettig.substack.com/p/tools-and-teammates-my-first-week",
    sourceLabel: "rettig.substack · 与 AI Agent 共处一周",
    upvotes: 88,
    trending: false,
    tags: ["个人Agent", "医疗文书", "财务梳理", "续租待办", "非医嘱"],
    howItWorks: [
      "约定本地/可控目录与微信/飞书私聊入口，导入邮件与材料文件夹",
      "Agent 分类抽取字段，生成待办、表单草稿与条款变更标红",
      "人确认后再自行提交正式申请；系统不做诊断、不自动外送正式件",
    ],
    tips: [
      "医疗与财务分两个加密目录，避免混入日常聊天附件",
      "待办强制「截止日期+材料版本号」，防止交旧版回执",
    ],
  },
  {
    id: "238",
    slug: "exec-admin-email-bookkeeper-forms",
    title: "高管行政：邮件草稿、会计答疑与保险表单",
    summary:
      "代拟拒邀与律师邮件、答会计问并预填保险经纪表；草稿须人发送，不擅自承诺财务数字。",
    description:
      "高管日程里常夹杂拒邀、律师函往来、会计追问与保险经纪表单，助理缺口时容易漏回或口径不一。在企微/飞书侧把邮件线程、日程冲突与表单字段交给 Agent：代拟礼貌拒邀与律师往来草稿、整理会计答疑要点、按租约与预算预填保险经纪表，并附引用片段供人核对；n8n 负责把待审草稿排队，Claude 统一语气与风险提示。区别于多 Agent 控制台与月末供应商发票打包：本条是高管桌面行政闭环，非舰队编排或月结归档。硬约束：邮件草稿须人发送，禁止自动外发；不擅自对外承诺财务数字、付款期限或法律立场；完整卡号、证件与合同密钥在摘要中脱敏；保险与法律表单提交前必须本人或授权人签字确认。",
    categories: ["enterprise", "efficiency"],
    platforms: ["wecom", "feishu", "claude", "n8n"],
    sourceUrl: "https://www.platformer.news/openai-dots-agents-devday-2026/",
    sourceLabel: "Platformer · OpenAI Dots Agents",
    upvotes: 90,
    trending: false,
    tags: ["高管行政", "邮件草稿", "会计答疑", "保险表单", "人发邮件"],
    howItWorks: [
      "接入企微/飞书日程与待办，约定草稿队列与审批人",
      "Agent 拟拒邀/律师邮件、会计答疑要点并预填保险表",
      "人审改后亲自发送或提交；系统不自动外发、不承诺财务",
    ],
    tips: [
      "拒邀模板区分「可改期/永久婉拒」，避免误伤重要关系",
      "财务相关草稿强制高亮数字来源单元格，便于快速核对",
    ],
  },
  {
    id: "239",
    slug: "student-problem-set-ai-annotations",
    title: "用 AI 批注学生习题集辅助人工批改",
    summary:
      "对习题集生成批注与错因提示，辅助教师人工批改；人审终裁，去标识，不写入正式成绩。",
    description:
      "教师面对成叠习题集时，既要标对错，又要写针对性批注与共性错因，耗时且尺度易漂。把去标识后的习题扫描或电子卷交给 Agent，按题生成批注草稿、步骤缺口提示与班级错因摘要，写入飞书/企微待审表，供教师抽检修改后再发学生；Claude/ChatGPT 负责按参考答案与量规对齐措辞。区别于 Canvas 量规批改、手写作业扫描拆分与 HTML 教案：本条是习题批注试验流，非 LMS 拉取打分或扫描归档。硬约束：批注结果须人审终裁；作业须去标识后再入模型，禁止把学号姓名明文送入不可控外网；禁止未经教师确认写入正式成绩；疑似抄袭仅标「需人工复核」，不做自动处分或成绩锁定。",
    categories: ["education"],
    platforms: ["feishu", "wecom", "claude", "chatgpt"],
    sourceUrl: "https://www.thedartmouth.com/article/2026/05/klee-claude-prof",
    sourceLabel: "The Dartmouth · Claude 习题批注试验",
    upvotes: 93,
    trending: false,
    tags: ["习题批注", "人审终裁", "去标识", "错因摘要", "辅助批改"],
    howItWorks: [
      "导入去标识习题与参考答案，约定待审表与抽检比例",
      "Agent 按题生成批注草稿与班级错因摘要",
      "教师终裁后再反馈学生；系统不写入正式成绩、不外发明文身份",
    ],
    tips: [
      "批注前统一「学号哈希」映射表，教师端可还原、模型侧不可见",
      "先小样本校准批注语气，再扩到全班避免过严或过松",
    ],
  },
  {
    id: "240",
    slug: "car-dealer-quote-negotiate-agent",
    title: "在车商间询价比价并自动议价买车",
    summary:
      "调研行情、询价比价并起草车商议价话术与报价对照表；人确认后再成交，不越权下单付款。",
    description:
      "买车时常要在多家经销商间询价、比配置与抬价博弈，信息散、话术累、容易被催签。Agent 先汇总公开行情与库存线索，生成询价表字段与议价目标区间，再按车商回复更新报价对照表，起草下一轮还价话术推到飞书/微信供人发送；n8n 可归档往来与截止提醒，Claude 负责口径一致与陷阱条款标红。区别于酒店短名单、差旅报销与订阅收据审计：本条是大额购车议价 Agent，非差旅或 SaaS 账单。硬约束：不越权下单、不自动付款；议价结果须人确认后再成交；不得擅自签署购车合同或授权扣款；身份证、银行卡与贷款材料仅存用户可控目录，禁止未授权外发；对外报价承诺以人发送的消息为准。",
    categories: ["life"],
    platforms: ["claude", "n8n", "feishu", "wechat"],
    sourceUrl: "https://cloudship.co.uk/blog/ai-agent-bought-a-car/",
    sourceLabel: "Cloudship · AI Agent 议价买车",
    upvotes: 85,
    trending: false,
    tags: ["购车议价", "询价比价", "报价对照", "人确认成交", "不自动付款"],
    howItWorks: [
      "设定车型配置、预算上限与目标成交区间，建报价对照表",
      "Agent 生成询价表与还价话术，跟踪各车商回复并标红陷阱条款",
      "人确认最终报价后再自行下单付款；系统不越权下单、不自动扣款",
    ],
    tips: [
      "把「落地价含什么」拆成必选/可选两列，避免口头优惠对不上票",
      "设还价冷却时限，防止被「今日特价」话术逼签",
    ],
  },

];

export function getUseCaseBySlug(slug: string): UseCase | undefined {
  return usecases.find((u) => u.slug === slug);
}

export function getUseCasesByCategory(category: string): UseCase[] {
  return usecases.filter((u) =>
    u.categories.includes(category as UseCase["categories"][number])
  );
}

export function getTrendingUseCases(limit = 6): UseCase[] {
  return [...usecases]
    .filter((u) => u.trending)
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, limit);
}

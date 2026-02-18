const ARTICLE_BLUEPRINTS = [
  {
    slug: 'the-fool',
    title: '愚人牌牌义详解：如何读懂新的起点',
    cardName: '愚人牌',
    arcana: '大阿卡纳',
    coreTheme: '新的起点与对生命流动的信任',
    uprightFocus: '勇敢迈出第一步，在不确定中保持开放和学习姿态',
    shadowPattern: '冲动决策、忽视代价、把自由误解为不负责',
    love: '关系里需要更多真诚表达与轻盈感，但也要先谈清边界和期待',
    career: '适合启动新项目、试水新方向、进入陌生赛道，先做最小验证',
    money: '财务上不宜盲目冒险，先设止损和预算，再谈增长',
    practice: '给自己设定七天行动清单：每天完成一个小步骤，用进度取代焦虑'
  },
  {
    slug: 'the-magician',
    title: '魔术师牌牌义详解：把想法变成结果',
    cardName: '魔术师牌',
    arcana: '大阿卡纳',
    coreTheme: '资源整合与主动创造现实',
    uprightFocus: '把分散的能力聚焦到一个目标上，用执行力打开局面',
    shadowPattern: '过度操控、话术先行、行动不足，容易变成空转',
    love: '有机会推进关系，但要避免技巧感太重，真实比完美更重要',
    career: '适合谈判、提案、发布和协作，关键是把价值讲清并兑现',
    money: '靠能力和信息差获得增量，但必须遵守规则与节奏',
    practice: '用一页纸写清目标、资源、路径和时间点，连续执行两周'
  },
  {
    slug: 'the-high-priestess',
    title: '女祭司牌牌义详解：安静中的答案',
    cardName: '女祭司牌',
    arcana: '大阿卡纳',
    coreTheme: '直觉、观察与隐藏信息的识别',
    uprightFocus: '先收集线索再判断，给内在感受足够空间',
    shadowPattern: '回避沟通、过度防御、把沉默变成拖延',
    love: '情感里要练习倾听与慢沟通，不急于定义关系才能看见真实',
    career: '适合研究、策略、复盘和幕后推进，避免过早承诺',
    money: '在投资和消费上重视信息核验，宁可慢一步也不要误判',
    practice: '每天留十五分钟静心记录，把反复出现的信号写下来'
  },
  {
    slug: 'the-empress',
    title: '皇后牌牌义详解：丰盛与滋养如何落地',
    cardName: '皇后牌',
    arcana: '大阿卡纳',
    coreTheme: '滋养、创造力与稳定生长',
    uprightFocus: '先把土壤养好，再让结果自然出现，重视长期积累',
    shadowPattern: '过度照顾他人、情绪性消费、把付出当作控制',
    love: '关系里适合建立温暖的日常与安全感，稳定比刺激更关键',
    career: '适合内容、设计、品牌、教育等需要持续产出的方向',
    money: '优先配置稳健资产与现金流，避免为了体面而透支',
    practice: '本周做一次生活盘点：睡眠、饮食、工作节律同步优化'
  },
  {
    slug: 'the-emperor',
    title: '皇帝牌牌义详解：结构与边界的力量',
    cardName: '皇帝牌',
    arcana: '大阿卡纳',
    coreTheme: '秩序、规则和可复制的执行体系',
    uprightFocus: '用明确流程和边界提升效率，减少情绪化决策',
    shadowPattern: '控制欲过强、僵化管理、拒绝反馈导致停滞',
    love: '关系需要稳定承诺，但要避免命令式沟通',
    career: '适合搭建团队机制、制定标准、优化项目节奏',
    money: '重视资产配置和风险分层，先守再攻',
    practice: '为当前目标建立三条不可妥协的执行规则并持续追踪'
  },
  {
    slug: 'the-hierophant',
    title: '教皇牌牌义详解：传统与方法论',
    cardName: '教皇牌',
    arcana: '大阿卡纳',
    coreTheme: '价值观、学习系统与传承',
    uprightFocus: '向成熟方法学习，在结构中提升专业度',
    shadowPattern: '教条化、盲从权威、拒绝更新认知',
    love: '适合讨论长期价值观与现实安排，而非只谈感觉',
    career: '利于考证、培训、建立标准化流程与知识库',
    money: '财务决策优先采用经过验证的策略，少走捷径',
    practice: '选择一个可信导师或课程，连续四周完成学习闭环'
  },
  {
    slug: 'the-lovers',
    title: '恋人牌牌义详解：选择背后的价值一致性',
    cardName: '恋人牌',
    arcana: '大阿卡纳',
    coreTheme: '连接、选择与价值对齐',
    uprightFocus: '基于真实价值做决定，而不是只看短期得失',
    shadowPattern: '摇摆、讨好、在关键选择上逃避承担',
    love: '感情推进的关键是坦诚沟通与一致行动',
    career: '面对合作与方向选择时，要先确认目标是否一致',
    money: '消费和投资要符合长期生活观，不被情绪带动',
    practice: '写下你最看重的三条价值观，用它们筛选本周决策'
  },
  {
    slug: 'the-chariot',
    title: '战车牌牌义详解：在拉扯中保持前进',
    cardName: '战车牌',
    arcana: '大阿卡纳',
    coreTheme: '意志力、方向感与行动控制',
    uprightFocus: '统一内外目标，把分散精力拉回主线',
    shadowPattern: '急于求胜、忽视协作、透支体力换短期成绩',
    love: '关系中要把对抗转为共同目标，而不是争输赢',
    career: '适合推进高压项目，但需要节奏管理和阶段复盘',
    money: '收入增长机会明显，同时要防止冲动投入过大',
    practice: '将大目标拆成三段里程碑，每段只追一个核心指标'
  },
  {
    slug: 'strength',
    title: '力量牌牌义详解：温柔而坚定的控制力',
    cardName: '力量牌',
    arcana: '大阿卡纳',
    coreTheme: '内在稳定、耐心与自我调节',
    uprightFocus: '用稳定情绪影响局面，以柔克刚比硬碰硬更有效',
    shadowPattern: '压抑真实需求、表面平静内里消耗',
    love: '亲密关系中先安顿情绪再表达需求，冲突会明显下降',
    career: '适合带团队、做沟通协调、处理复杂人际',
    money: '财务上要克制报复性消费，先稳住现金流',
    practice: '每天进行十分钟呼吸训练，先稳住再行动'
  },
  {
    slug: 'the-hermit',
    title: '隐者牌牌义详解：独处不是退缩',
    cardName: '隐者牌',
    arcana: '大阿卡纳',
    coreTheme: '内省、筛选与深度思考',
    uprightFocus: '减少噪音输入，回到真正重要的问题',
    shadowPattern: '封闭自我、过度怀疑、长期停在准备阶段',
    love: '关系里需要真实独处空间，但不能用沉默回避沟通',
    career: '适合战略复盘、技能深耕和长期路径规划',
    money: '以保守和理性为先，暂缓高波动尝试',
    practice: '安排一次无社交日，专注复盘过去三个月的关键选择'
  },
  {
    slug: 'wheel-of-fortune',
    title: '命运之轮牌牌义详解：顺势与时机',
    cardName: '命运之轮牌',
    arcana: '大阿卡纳',
    coreTheme: '周期变化、转折点与时机把握',
    uprightFocus: '识别趋势、借力而行，在变化中寻找窗口',
    shadowPattern: '把运气当借口，忽略准备和行动',
    love: '关系可能迎来阶段转换，要跟上彼此节奏',
    career: '适合在关键时间点做迭代和升级，拥抱新变量',
    money: '收益与波动并存，必须控制仓位与风险',
    practice: '记录本月三个外部变化，判断哪些是你可以借力的'
  },
  {
    slug: 'justice',
    title: '正义牌牌义详解：回到事实与责任',
    cardName: '正义牌',
    arcana: '大阿卡纳',
    coreTheme: '公平、因果与清晰决断',
    uprightFocus: '用事实和规则做判断，减少情绪偏差',
    shadowPattern: '过度苛责、非黑即白、忽略现实弹性',
    love: '关系里要把承诺落到可执行细节，避免口头化',
    career: '适合合同、审计、流程治理与关键谈判',
    money: '财务上重视合规和透明，避免侥幸心理',
    practice: '把一个复杂问题拆成证据、责任、方案三部分处理'
  },
  {
    slug: 'the-hanged-man',
    title: '倒吊人牌牌义详解：停顿不是失败',
    cardName: '倒吊人牌',
    arcana: '大阿卡纳',
    coreTheme: '换位思考、暂停与重估价值',
    uprightFocus: '主动停下来调整视角，为下一步积蓄能量',
    shadowPattern: '长期拖延、无效忍耐、把停顿当借口',
    love: '关系中的僵局需要换一个问题问法，而非重复争执',
    career: '适合重新定义优先级，砍掉低价值任务',
    money: '短期保守为主，避免在不确定时做重决策',
    practice: '本周删掉一项消耗型承诺，把时间还给核心目标'
  },
  {
    slug: 'death',
    title: '死神牌牌义详解：结束带来重生',
    cardName: '死神牌',
    arcana: '大阿卡纳',
    coreTheme: '阶段终结、释放与转化',
    uprightFocus: '果断结束过期模式，为新秩序腾出空间',
    shadowPattern: '抗拒变化、抱住旧身份不放、反复内耗',
    love: '关系可能进入重组期，坦诚比维持表面更重要',
    career: '适合转型、换赛道、重构工作方式',
    money: '清理无效支出与旧债，先做减法再做增量',
    practice: '列出三件已经失效的习惯，逐一设定替代方案'
  },
  {
    slug: 'temperance',
    title: '节制牌牌义详解：平衡不是折中',
    cardName: '节制牌',
    arcana: '大阿卡纳',
    coreTheme: '整合、节律与长期稳定',
    uprightFocus: '把不同资源调配到合理比例，持续优化系统',
    shadowPattern: '节奏混乱、极端切换、难以长期坚持',
    love: '关系中要建立可持续的沟通节律，少做情绪爆发',
    career: '跨团队协作和流程衔接是你当前的关键能力',
    money: '采用稳健组合策略，避免情绪化重仓',
    practice: '给工作与生活设固定节律，连续执行二十一天'
  },
  {
    slug: 'the-devil',
    title: '恶魔牌牌义详解：看见你的束缚',
    cardName: '恶魔牌',
    arcana: '大阿卡纳',
    coreTheme: '依附、诱惑与权力关系',
    uprightFocus: '识别成瘾循环和被绑定的交换关系',
    shadowPattern: '否认问题、沉迷即时满足、持续自我消耗',
    love: '关系里要警惕控制与依赖，尊重比占有更重要',
    career: '避免把高压文化合理化，先处理结构性消耗',
    money: '防范冲动消费和高风险赌性操作',
    practice: '记录触发你失控的场景，提前设计替代动作'
  },
  {
    slug: 'the-tower',
    title: '高塔牌牌义详解：突变后的重建',
    cardName: '高塔牌',
    arcana: '大阿卡纳',
    coreTheme: '突发冲击、真相显现与结构重建',
    uprightFocus: '接受旧结构坍塌的事实，快速建立新秩序',
    shadowPattern: '恐慌决策、过度补救、否认现实变化',
    love: '关系中积压问题可能爆发，诚实面对才有重建机会',
    career: '项目转向或组织变化时，要先稳住基本盘',
    money: '先保现金和流动性，再考虑反攻',
    practice: '做一次危机预案：最坏情境、资源清单、第一步动作'
  },
  {
    slug: 'the-star',
    title: '星星牌牌义详解：恢复信心与方向感',
    cardName: '星星牌',
    arcana: '大阿卡纳',
    coreTheme: '疗愈、希望与长期愿景',
    uprightFocus: '在混乱后重新连接信念，让行动回到长期线',
    shadowPattern: '理想化、只想不做、用愿景逃避执行',
    love: '关系修复窗口出现，关键在于持续的善意行动',
    career: '适合重建个人品牌与职业叙事，慢慢回升',
    money: '财务以恢复稳定为主，不急于追高收益',
    practice: '写下未来一年最想实现的三个状态，并倒推本月行动'
  },
  {
    slug: 'the-moon',
    title: '月亮牌牌义详解：不确定中的辨识力',
    cardName: '月亮牌',
    arcana: '大阿卡纳',
    coreTheme: '潜意识、迷雾与情绪投射',
    uprightFocus: '承认不确定，先辨别事实与想象的边界',
    shadowPattern: '过度脑补、焦虑放大、被恐惧牵着走',
    love: '关系里容易误读对方，需要及时澄清和确认',
    career: '信息不全时先做小实验，别一次性下注太大',
    money: '谨慎对待高波动市场和来路不明的信息',
    practice: '当情绪上头时先停十分钟，再做任何关键回复'
  },
  {
    slug: 'the-sun',
    title: '太阳牌牌义详解：清晰、生命力与兑现',
    cardName: '太阳牌',
    arcana: '大阿卡纳',
    coreTheme: '清晰、成功与积极能量释放',
    uprightFocus: '把已有成果放大，让价值被看见并被验证',
    shadowPattern: '自满、轻敌、忽略细节导致回撤',
    love: '关系沟通更坦率，适合推进公开和长期计划',
    career: '曝光、合作、发布和增长机会都在增加',
    money: '收入提升窗口明显，但仍需预留安全边际',
    practice: '把最近三项成果系统复盘，提炼可复制的方法'
  },
  {
    slug: 'judgement',
    title: '审判牌牌义详解：召唤你升级版本',
    cardName: '审判牌',
    arcana: '大阿卡纳',
    coreTheme: '觉醒、复盘与阶段升级',
    uprightFocus: '正视过去经验，把它转成下一阶段能力',
    shadowPattern: '沉溺懊悔、害怕被评价、拒绝真正改变',
    love: '关系要不要继续，取决于双方是否愿意升级相处方式',
    career: '适合做职业审计，明确下一阶段身份定位',
    money: '财务层面要做年度复盘，重建目标和纪律',
    practice: '写一封给过去自己的复盘信，再写一份升级承诺'
  },
  {
    slug: 'the-world',
    title: '世界牌牌义详解：完成闭环与新起点',
    cardName: '世界牌',
    arcana: '大阿卡纳',
    coreTheme: '完成、整合与更大舞台',
    uprightFocus: '把阶段成果系统化，进入更高维度协作',
    shadowPattern: '完成后松懈、害怕下一阶段、停在舒适区',
    love: '关系进入更成熟阶段，强调共同成长与共同目标',
    career: '项目收官、品牌成型、跨域合作机会增加',
    money: '可考虑长期配置与全球化视角，分散单点风险',
    practice: '为已完成项目做最终总结，并明确下一阶段起跑动作'
  },
  {
    slug: 'ace-of-wands',
    title: '权杖王牌牌义详解：灵感点火后的第一步',
    cardName: '权杖王牌',
    arcana: '小阿卡纳',
    coreTheme: '行动火花、创意启动与冲劲',
    uprightFocus: '抓住灵感窗口，立刻把想法转成可执行原型',
    shadowPattern: '三分钟热度、只兴奋不落地、频繁换目标',
    love: '关系有新鲜感升温机会，主动表达能带来突破',
    career: '适合开启新计划、提案和快速试错',
    money: '小规模投入可行，但不宜一开始就重仓',
    practice: '在四十八小时内完成一个最小原型并拿到反馈'
  },
  {
    slug: 'two-of-cups',
    title: '圣杯二牌义详解：关系中的平等连接',
    cardName: '圣杯二',
    arcana: '小阿卡纳',
    coreTheme: '互相回应、合作与情感共振',
    uprightFocus: '建立对等关系，让沟通和承诺同步发生',
    shadowPattern: '理想化对方、依赖关系确认自我价值',
    love: '这是关系升温与修复的好时机，关键是互相尊重',
    career: '合作谈判更容易达成共识，适合建立长期伙伴关系',
    money: '可通过合作获得增量，但合同细节必须写清楚',
    practice: '和关键对象完成一次深度对话，确认共同目标和边界'
  },
  {
    slug: 'three-of-swords',
    title: '宝剑三牌义详解：直面失落后的重建',
    cardName: '宝剑三',
    arcana: '小阿卡纳',
    coreTheme: '真相刺痛、分离与认知重整',
    uprightFocus: '允许痛感存在，同时把注意力放回修复行动',
    shadowPattern: '反复自责、沉迷受伤叙事、拒绝向前',
    love: '关系可能出现失望与误解，需要边界与诚实',
    career: '面对挫折时要快速复盘，不把一次失败扩大成身份否定',
    money: '避免情绪化交易，先停手再评估',
    practice: '写下这次受挫带来的三条教训，并转成具体规则'
  },
  {
    slug: 'six-of-wands',
    title: '权杖六牌义详解：胜利之后怎么走',
    cardName: '权杖六',
    arcana: '小阿卡纳',
    coreTheme: '阶段胜利、外部认可与影响力提升',
    uprightFocus: '把阶段成果公开化，同时建立下一阶段节奏',
    shadowPattern: '沉迷掌声、忽视基础、增长后管理失衡',
    love: '关系中会更有信心，但要避免优越感压过理解',
    career: '适合发布成果、争取资源、扩大话语权',
    money: '收入有上升空间，注意把一次性收益转成长期能力',
    practice: '总结成功的关键动作，形成可复制流程给团队使用'
  },
  {
    slug: 'seven-of-cups',
    title: '圣杯七牌义详解：选择太多时如何不迷路',
    cardName: '圣杯七',
    arcana: '小阿卡纳',
    coreTheme: '想象、选项膨胀与决策迷雾',
    uprightFocus: '从愿景回到现实条件，筛选真正可行路径',
    shadowPattern: '沉迷幻想、拖延选择、用忙碌掩盖犹豫',
    love: '关系容易被理想化滤镜影响，务必看行动而非承诺',
    career: '项目机会多但资源有限，必须做优先级取舍',
    money: '警惕高收益叙事，所有决策先看风险回撤',
    practice: '给所有选项打分：价值、成本、时间，选前两项执行'
  },
  {
    slug: 'nine-of-pentacles',
    title: '星币九牌义详解：独立与精致生活的平衡',
    cardName: '星币九',
    arcana: '小阿卡纳',
    coreTheme: '独立成果、审美与稳健回报',
    uprightFocus: '享受阶段成果，同时继续维护长期能力建设',
    shadowPattern: '过度自我封闭、追求体面导致成本失控',
    love: '先拥有稳定的自我，再进入高质量关系',
    career: '适合打造个人品牌和高附加值服务',
    money: '财富管理进入精细化阶段，重视资产保护与现金流',
    practice: '做一份个人资产体检，明确保值、增值和流动性比例'
  },
  {
    slug: 'ten-of-swords',
    title: '宝剑十牌义详解：到底之后的反弹',
    cardName: '宝剑十',
    arcana: '小阿卡纳',
    coreTheme: '终局感、认清现实与重启准备',
    uprightFocus: '承认一个阶段确实结束，停止无效挽回',
    shadowPattern: '灾难化思维、持续自我否定、拒绝求助',
    love: '关系触底时要诚实面对，不再重复旧模式',
    career: '项目失败并不等于个人失败，关键是重建方法论',
    money: '先止损和清债，再逐步恢复增长计划',
    practice: '用三周完成一次系统复盘：问题、责任、下一步方案'
  },
  {
    slug: 'queen-of-cups',
    title: '圣杯皇后牌义详解：同理心与边界并存',
    cardName: '圣杯皇后',
    arcana: '小阿卡纳',
    coreTheme: '情感智慧、同理心与温柔领导力',
    uprightFocus: '理解他人情绪的同时，保持自己的边界和节奏',
    shadowPattern: '过度共情、情绪卷入、难以做理性决策',
    love: '关系中适合深度沟通，但要避免无限度迁就',
    career: '在服务、咨询、教育、管理中容易建立信任影响力',
    money: '财务决策要把感受和数据同时纳入，不偏任何一边',
    practice: '每天记录一次情绪触发点，并写下更稳妥的回应方式'
  }
];

function buildArticle(blueprint) {
  const paragraphs = [
    `${blueprint.cardName}属于${blueprint.arcana}，在塔罗系统里代表“${blueprint.coreTheme}”这一核心命题。阅读这张牌时，关键不是只看吉凶，而是观察你在现实中的状态、关系中的选择、以及当下行动是否与长期目标一致。很多人抽到这张牌会立刻想知道结果，但真正有价值的做法，是把牌义转化为可执行的判断框架：我现在最该保留什么、最该停止什么、最该开始什么。当你把问题问到具体层面，${blueprint.cardName}给出的信息会非常清晰，它会像一面镜子，照出你正在重复的模式，也提示你可以改写的路径。`,
    `在正位层面，${blueprint.cardName}强调“${blueprint.uprightFocus}”。这不是抽象鸡汤，而是一种现实中的工作方式：先确认目标，再配置资源，最后用小步快跑去验证方向。很多占卜结果之所以难以落地，是因为解读停在情绪层，没有进入决策层。你可以把这张牌当成一个行动信号：当机会出现时，不要只讨论感觉，要用时间、成本、收益、风险四个维度来评估。只要你愿意持续记录并复盘，${blueprint.cardName}会从一次性的灵感，变成可重复的能力。`,
    `在逆位层面，${blueprint.cardName}常提醒“${blueprint.shadowPattern}”。逆位并不等于坏结果，而是说明当前能量被卡住，或者你在错误的地方用力过猛。很多时候问题并不在外部，而在你对不确定性的处理方式：你是因为害怕失去而过度控制，还是因为害怕承担而不断拖延。看懂逆位的价值，在于及时止损和重设节奏。只要你愿意承认当前的偏差，并做小幅调整，局面通常会比你想象中更快恢复。`,
    `感情层面，${blueprint.cardName}给出的重点是“${blueprint.love}”。你可以把这条信息转成三个可执行动作：第一，先说事实再说感受，避免指责式表达；第二，把“我希望你理解”改成“我们如何一起调整”；第三，约定一个可复盘的沟通节奏，而不是靠情绪爆发解决问题。关系质量往往不取决于冲突有没有，而取决于冲突后是否能回到合作。`,
    `事业层面，这张牌提示“${blueprint.career}”。真正的职业成长，不是一直加任务，而是不断提高单位时间的有效产出。你可以把当前工作拆成输入、过程、输出三个阶段，分别找出最拖慢你的一个瓶颈，然后逐个优化。只要主线清晰、反馈及时，你会发现原来很多焦虑来自“看起来很忙但没有闭环”。${blueprint.cardName}更鼓励你做可复利的积累，而不是短期表演。`,
    `金钱层面，牌义对应“${blueprint.money}”。在财务决策上，先活下来，再活得好，这个顺序不能反。你可以先建立一个最基础的安全结构：应急储备、固定支出上限、风险敞口边界，然后再考虑增长性配置。很多人的财务压力并非收入不够，而是缺少稳定规则。把规则先立起来，情绪就不会轻易主导钱包。`,
    `如果你希望把本次解读真正用起来，建议执行这条行动方案：“${blueprint.practice}”。执行时不要追求完美，先追求连续。连续七天的小行动，往往比一次性的大决心更能改变现实。你可以在每天结束前做三分钟复盘：今天做了什么、遇到什么阻力、明天要调整什么。这样一来，${blueprint.cardName}就不再只是一次占卜结论，而会变成你持续升级判断力的工具。`,
    `总结来说，${blueprint.cardName}并不是替你决定命运，而是在提醒你：命运感来自重复的选择，改变也来自重复的选择。你越愿意把抽象启示转成具体行动，牌义就越准确、越有用。当你把注意力放回“我下一步做什么”，你会发现很多困局并不是无解，而是此前缺少一个清晰、稳定、可执行的路径。`
  ];

  const pureText = paragraphs.join('');
  const charCount = pureText.replace(/\s+/g, '').length;

  return {
    ...blueprint,
    paragraphs,
    excerpt: `${paragraphs[0].slice(0, 118)}...`,
    charCount
  };
}

export const tarotMeaningArticles = ARTICLE_BLUEPRINTS.map(buildArticle);

for (const article of tarotMeaningArticles) {
  if (article.charCount < 800) {
    throw new Error(`Article "${article.slug}" is shorter than 800 chars.`);
  }
}

export function getTarotMeaningArticleBySlug(slug) {
  return tarotMeaningArticles.find((item) => item.slug === slug) || null;
}

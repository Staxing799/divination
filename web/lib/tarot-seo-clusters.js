export const tarotTop10Roadmap = [
  {
    slug: 'the-fool',
    targetQueryZh: '愚人牌 正位逆位 感情 事业',
    targetQueryEn: 'the fool tarot meaning love career',
    intent:
      '你正在纠结是否开始新关系、新工作或新计划，想判断“该不该迈出第一步”，以及如何避免冲动。',
    questionTemplates: [
      '我该在未来 30 天启动这个新方向吗？最大风险是什么？',
      '这段关系是值得推进，还是我在理想化对方？',
      '如果我现在行动，最容易踩的坑是什么？'
    ]
  },
  {
    slug: 'the-magician',
    targetQueryZh: '魔术师牌 事业 资源整合 行动力',
    targetQueryEn: 'the magician tarot meaning career',
    intent:
      '你已经有想法和资源，但卡在执行层，想知道如何把零散能力变成可交付结果。',
    questionTemplates: [
      '我现在最该优先调动哪项资源，才能最快出结果？',
      '我是在有效推进，还是只是看起来很忙？',
      '这个提案要落地，第一步应该是什么？'
    ]
  },
  {
    slug: 'the-high-priestess',
    targetQueryZh: '女祭司牌 直觉 隐藏信息 关系',
    targetQueryEn: 'high priestess tarot meaning relationship',
    intent:
      '你感觉信息不完整或对方态度模糊，想判断当前应该继续观察还是主动推进。',
    questionTemplates: [
      '我现在缺失的关键信息是什么？',
      '这段关系里我该先倾听还是先表态？',
      '我是在理性判断，还是被焦虑带着走？'
    ]
  },
  {
    slug: 'the-empress',
    targetQueryZh: '皇后牌 感情 丰盛 自我价值',
    targetQueryEn: 'the empress tarot meaning love',
    intent:
      '你关注关系稳定感、情绪滋养和长期成长，想知道如何在“照顾他人”和“照顾自己”间平衡。',
    questionTemplates: [
      '这段关系里我如何建立更稳定的安全感？',
      '我是否在过度付出，忽略了自己的边界？',
      '当前阶段最该培养的长期习惯是什么？'
    ]
  },
  {
    slug: 'the-emperor',
    targetQueryZh: '皇帝牌 事业 管理 边界 规则',
    targetQueryEn: 'the emperor tarot meaning career',
    intent:
      '你正面对管理、流程、责任分配问题，想要更稳定的执行系统而不是情绪化决策。',
    questionTemplates: [
      '这个项目要稳定推进，必须先设哪三条规则？',
      '我是在有效管理，还是控制欲过强？',
      '目前最该补的结构性短板是什么？'
    ]
  },
  {
    slug: 'the-lovers',
    targetQueryZh: '恋人牌 选择 价值观 感情',
    targetQueryEn: 'the lovers tarot meaning choice relationship',
    intent:
      '你在感情或合作里面临关键选择，想确认“这是不是符合我长期价值观的决定”。',
    questionTemplates: [
      '这个选择和我真正重视的价值一致吗？',
      '我是在主动选择，还是在回避承担？',
      '如果继续这段关系，我们最需要统一什么？'
    ]
  },
  {
    slug: 'the-chariot',
    targetQueryZh: '战车牌 事业 推进力 执行',
    targetQueryEn: 'the chariot tarot meaning action',
    intent:
      '你已经进入推进期，但内部拉扯明显，想知道如何在高压下保持方向与节奏。',
    questionTemplates: [
      '我当前最该收束的分散精力是什么？',
      '这个目标要达成，下一阶段里程碑该怎么拆？',
      '我是在推进，还是在透支？'
    ]
  },
  {
    slug: 'the-hermit',
    targetQueryZh: '隐者牌 独处 复盘 职业方向',
    targetQueryEn: 'the hermit tarot meaning career path',
    intent:
      '你处在调整和反思阶段，想确定是“暂时停顿”还是“真的走偏了方向”。',
    questionTemplates: [
      '我现在该继续深耕，还是要换赛道？',
      '哪些输入在制造噪音而不是帮助我成长？',
      '未来 90 天我最该精进哪项核心能力？'
    ]
  },
  {
    slug: 'death',
    targetQueryZh: '死神牌 结束 转型 关系重组',
    targetQueryEn: 'death tarot meaning transformation',
    intent:
      '你在经历结束、离开、重组，想确认“应该放下什么，保留什么，以及如何重启”。',
    questionTemplates: [
      '这个阶段我必须结束的旧模式是什么？',
      '我在抗拒变化的真正原因是什么？',
      '接下来 30 天最关键的重启动作是什么？'
    ]
  },
  {
    slug: 'the-sun',
    targetQueryZh: '太阳牌 成功 关系公开 事业增长',
    targetQueryEn: 'the sun tarot meaning success',
    intent:
      '你看到积极信号和增长机会，想知道如何放大成果并避免“顺风期失误”。',
    questionTemplates: [
      '我现在最该放大的成果是什么？',
      '这个增长阶段最容易忽略的风险点是什么？',
      '如何把短期好结果转成长期能力？'
    ]
  }
];

const roadmapBySlug = new Map(tarotTop10Roadmap.map((item) => [item.slug, item]));

export function getTarotSeoBrief(article) {
  const base = roadmapBySlug.get(article.slug);
  if (base) {
    return {
      ...base,
      heading: `${article.cardName}常见检索场景`,
      summary: `如果你正在搜索“${base.targetQueryZh}”，这篇内容重点回答：${base.intent}`
    };
  }

  return {
    slug: article.slug,
    targetQueryZh: `${article.cardName}牌义 正位逆位 感情事业`,
    targetQueryEn: `${article.slug.replace(/-/g, ' ')} tarot meaning`,
    heading: `${article.cardName}常见检索场景`,
    summary: `如果你正在搜索“${article.cardName}牌义、${article.cardName}正位逆位、${article.cardName}感情事业”，这篇内容会给出可执行的判断框架。`,
    questionTemplates: [
      `我现在面对这个问题时，${article.cardName}最提醒我优先处理什么？`,
      `在${article.cardName}的提示下，我未来 72 小时该做哪一步？`,
      `如果继续当前节奏，${article.cardName}最可能指向什么结果？`
    ]
  };
}

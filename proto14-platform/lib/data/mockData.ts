import { Project, Part, CaseStudy, Partner, Supplier, MenuItem, Task } from '../types';

export const projects: Project[] = [
  { id: '1', product: { ja: '搬送装置A', en: 'Conveyor Unit A' }, project: { ja: '次世代モデル開発', en: 'Next-gen Model Dev' }, manager: { ja: '佐藤 太郎', en: 'Taro Sato' }, status: 'procuring', updated: '2025-09-13' },
  { id: '2', product: { ja: '検査ユニットB', en: 'Inspection Unit B' }, project: { ja: '性能改善プロジェクト', en: 'Performance Improvement' }, manager: { ja: '鈴木 一郎', en: 'Ichiro Suzuki' }, status: 'estimating', updated: '2025-09-12' },
  { id: '3', product: { ja: '制御ボックスC', en: 'Control Box C' }, project: { ja: 'コストダウン試作', en: 'Cost Reduction Proto' }, manager: { ja: '高橋 花子', en: 'Hanako Takahashi' }, status: 'delivered', updated: '2025-09-10' },
  { id: '4', product: { ja: 'ロボットアームD', en: 'Robot Arm D' }, project: { ja: '新規導入案件', en: 'New Installation Project' }, manager: { ja: '田中 誠', en: 'Makoto Tanaka' }, status: 'estimating', updated: '2025-09-14' },
];

export const quickStartItems: MenuItem[] = [
  { id: 'standard-parts', name: { ja: '規格品', en: 'Standard Parts' }, icon: 'Search', href: '/standard-parts' },
  { id: 'custom-parts', name: { ja: '加工品', en: 'Custom Parts' }, icon: 'Gem', href: '/custom-parts' },
  { id: 'bom', name: { ja: 'BOM', en: 'BOM' }, icon: 'FileSpreadsheet', href: '/bom' },
  { id: 'assy', name: { ja: 'Assy', en: 'Assembly' }, icon: 'Component', href: '#' },
  { id: 'design', name: { ja: '設計・試作', en: 'Design/Prototype' }, icon: 'Compass', href: '/design' },
  { id: 'pcb', name: { ja: '基板', en: 'Circuit Board' }, icon: 'Cpu', href: '#' },
  { id: 'harness', name: { ja: 'ハーネス', en: 'Harness' }, icon: 'Cable', href: '#' },
  { id: 'packaging', name: { ja: '包装', en: 'Packaging' }, icon: 'Package', href: '#' },
];

export const suppliers = ['Fastenal', 'McMaster-Carr', 'Misumi'];
export const partTypes = ['Electronic', 'Mechanical', 'Fastener'];
export const matchStatuses = ['Matched', 'Not Matched'];
export const purchaseStatuses = ['Available', 'Back Order', 'Unavailable'];

export function generateMockParts(count: number = 250): Part[] {
  return Array.from({ length: count }, (_, i) => {
    const isMatched = Math.random() < 0.85;
    return {
      id: i + 1,
      partNumber: `PN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      name: `部品名${i + 1}`,
      quantity: Math.floor(Math.random() * 100) + 1,
      price: isMatched ? Math.floor(Math.random() * 5000) + 50 : 0,
      leadTime: isMatched ? Math.floor(Math.random() * 10) + 1 : 0,
      supplier: isMatched ? suppliers[Math.floor(Math.random() * suppliers.length)] : '-',
      type: partTypes[Math.floor(Math.random() * partTypes.length)] as Part['type'],
      matchStatus: isMatched ? 'Matched' : 'Not Matched',
      purchaseStatus: isMatched ? purchaseStatuses[Math.floor(Math.random() * purchaseStatuses.length)] as Part['purchaseStatus'] : 'Unavailable',
    };
  });
}

export const partners: Partner[] = [
  { id: 1, name: { ja: '株式会社テックデザイン', en: 'Tech Design Inc.' }, img: '/api/placeholder/100/100', description: { ja: '最新の3D-CADとCAE解析を駆使し、高品質な筐体設計を提供します。', en: 'We provide high-quality enclosure designs using the latest 3D-CAD and CAE analysis.' }},
  { id: 2, name: { ja: '未来試作工房', en: 'Future Prototyping Workshop' }, img: '/api/placeholder/100/100', description: { ja: '医療機器基準に準拠した高精度な試作品を短納期で実現します。', en: 'We deliver high-precision prototypes compliant with medical device standards on a short lead time.' }},
  { id: 3, name: { ja: 'アッセンブリ・ソリューションズ', en: 'Assembly Solutions' }, img: '/api/placeholder/100/100', description: { ja: '小ロットから量産まで、柔軟な組立ラインで対応可能です。', en: 'We can handle everything from small lots to mass production with our flexible assembly line.' }}
];

export const caseStudies: CaseStudy[] = [
  {
    id: 101,
    partnerId: 1,
    title: { ja: '自動搬送ロボット用 高耐久性筐体', en: 'High-Durability Enclosure for Autonomous Mobile Robot' },
    img: '/api/placeholder/300/200',
    industry: 'robot',
    details: {
      application: { ja: '倉庫内自動搬送', en: 'Warehouse automated transport' },
      service: { ja: '設計', en: 'Design' },
      material: { ja: 'アルミニウム', en: 'Aluminum' },
      lead_time: { ja: '3週間', en: '3 Weeks' },
      size: '500x500x300mm'
    }
  },
  {
    id: 102,
    partnerId: 2,
    title: { ja: 'ウェアラブルヘルスケアデバイス', en: 'Wearable Healthcare Device' },
    img: '/api/placeholder/300/200',
    industry: 'medical',
    details: {
      application: { ja: '生体データ監視', en: 'Biometric data monitoring' },
      service: { ja: '試作', en: 'Prototyping' },
      material: { ja: '生体適合性樹脂', en: 'Biocompatible resin' },
      lead_time: { ja: '2週間', en: '2 Weeks' },
      size: '50x40x15mm'
    }
  },
  {
    id: 103,
    partnerId: 1,
    title: { ja: '屋外設置型IoT環境センサー', en: 'Outdoor IoT Environmental Sensor' },
    img: '/api/placeholder/300/200',
    industry: 'iot',
    details: {
      application: { ja: '農業環境モニタリング', en: 'Agricultural environment monitoring' },
      service: { ja: '設計・試作', en: 'Design & Prototyping' },
      material: { ja: 'ABS (IP67準拠)', en: 'ABS (IP67 compliant)' },
      lead_time: { ja: '4週間', en: '4 Weeks' },
      size: '120x120x80mm'
    }
  }
];

export const pastSuppliers: Supplier[] = [
  {
    ...partners[0],
    satisfaction: 5,
    comment: { ja: '毎回、納期通りに高品質な成果物を出してくれる。コミュニケーションもスムーズ。', en: 'They always deliver high-quality work on time. Communication is also very smooth.' },
    author: { ja: '山田 太郎', en: 'Taro Yamada' },
    stats: { quote: 8, order: 5, late: '1.5%', claim: '0%' }
  },
  {
    ...partners[1],
    satisfaction: 3,
    comment: { ja: '品質は良いが、コストがやや高め。大規模なプロジェクト向きかもしれない。', en: 'The quality is good, but the cost is a bit high. It might be suitable for large-scale projects.' },
    author: { ja: '佐藤 花子', en: 'Hanako Sato' },
    stats: { quote: 2, order: 1, late: '0%', claim: '0%' }
  },
  {
    ...partners[2],
    satisfaction: 4,
    comment: { ja: '組立精度は高いが、たまに連絡が遅れることがある。', en: 'The assembly precision is high, but sometimes communication can be slow.' },
    author: { ja: '鈴木 次郎', en: 'Jiro Suzuki' },
    stats: { quote: 12, order: 10, late: '5.0%', claim: '1.2%' }
  }
];

export const tasks: Task[] = [
  { id: 'task1', name: { ja: '設計・試作', en: 'Design/Prototype' } },
  { id: 'task2', name: { ja: '加工品', en: 'Machined Parts' } },
  { id: 'task3', name: { ja: '規格品', en: 'Standard Parts' } },
  { id: 'task4', name: { ja: 'Assy', en: 'Assembly' } },
  { id: 'task5', name: { ja: 'BOM', en: 'BOM' } },
  { id: 'task6', name: { ja: '基板', en: 'PCB' } },
  { id: 'task7', name: { ja: 'ハーネス', en: 'Harness' } },
  { id: 'task8', name: { ja: '包装', en: 'Packaging' } },
];

export const managers = [
  { id: 'mgr1', name: { ja: '佐藤 太郎', en: 'Taro Sato' } },
  { id: 'mgr2', name: { ja: '鈴木 一郎', en: 'Ichiro Suzuki' } },
  { id: 'mgr3', name: { ja: '高橋 花子', en: 'Hanako Takahashi' } },
  { id: 'mgr4', name: { ja: '田中 次郎', en: 'Jiro Tanaka' } },
  { id: 'mgr5', name: { ja: '伊藤 三郎', en: 'Saburo Ito' } }
];
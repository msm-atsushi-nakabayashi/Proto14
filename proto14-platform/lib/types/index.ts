export interface Translation {
  ja: string;
  en: string;
}

export interface Project {
  id: string;
  product: Translation;
  project: Translation;
  manager: Translation;
  status: 'estimating' | 'procuring' | 'delivered';
  updated: string;
}

export interface Task {
  id: string;
  name: Translation;
  icon?: string;
}

export interface MenuItem {
  id: string;
  name: Translation;
  icon: string;
  href: string;
}

export interface Part {
  id: number;
  partNumber: string;
  name: string;
  quantity: number;
  price: number;
  leadTime: number;
  supplier: string;
  type: 'Electronic' | 'Mechanical' | 'Fastener';
  matchStatus: 'Matched' | 'Not Matched';
  purchaseStatus: 'Available' | 'Back Order' | 'Unavailable';
}

export interface CaseStudy {
  id: number;
  partnerId: number;
  title: Translation;
  img: string;
  industry: string;
  details: {
    application: Translation;
    service: Translation;
    material: Translation;
    lead_time: Translation;
    size: string;
  };
}

export interface Partner {
  id: number;
  name: Translation;
  img: string;
  description: Translation;
}

export interface Supplier extends Partner {
  satisfaction: number;
  comment: Translation;
  author: Translation;
  stats: {
    quote: number;
    order: number;
    late: string;
    claim: string;
  };
}

export interface TreeNode {
  id: string;
  name: string;
  pic: string;
  tasks: string[];
  children: TreeNode[];
}

export interface UnitStructure {
  name: Translation;
  tasks: {
    name: Translation;
    status: string;
    assignee: Translation;
  }[];
}
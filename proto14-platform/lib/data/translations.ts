export const translations = {
  ja: {
    // Site
    siteTitle: 'Proto 14',

    // Navigation
    tooltip_arrangement_list: '手配品リスト',
    tooltip_cart: 'カート',
    tooltip_order_history: '注文履歴',
    tooltip_partners: '取引先リスト',
    tooltip_settings: '設定',

    // Home Page
    quick_start_title: 'クイックスタート',
    dashboard_title: 'プロジェクトダッシュボード',
    create_project_btn: '新規プロジェクト作成',
    th_product_name: '製品名',
    th_project_name: 'プロジェクト名',
    th_manager: '責任者',
    th_status: 'ステータス',
    th_last_updated: '最終更新日',
    th_actions: '操作',
    action_pj_top: 'PJ TOP',
    action_settings: '設定',

    // Quick Start Items
    standard_parts: '規格品',
    processed_goods: '加工品',
    bom: 'BOM',
    assy: 'Assy',
    design_prototype: '設計・試作',
    circuit_board: '基板',
    harness: 'ハーネス',
    packaging: '包装',

    // Status
    status_estimating: '見積中',
    status_procuring: '調達中',
    status_delivered: '納品済',

    // BOM Page
    bom_upload_title: 'BOMをアップロードして部品情報を検索',
    upload_instruction: 'ここにファイルをドラッグ＆ドロップ',
    upload_or_click: 'またはクリックしてファイルを選択',
    upload_supported_files: '対応ファイル: .xlsx, .xls, .csv',
    upload_ready_message: '準備完了です。下のボタンで開始してください。',
    process_bom_button: '見積開始',
    upload_processing: '処理中...',

    // Design Page
    initial_title: '設計・試作',
    initial_subtitle: '見積依頼先の選定方法を選択してください',
    menu_ai: 'AIレコメンド',
    menu_case_study: '事例で選ぶ',
    menu_partner_list: 'パートナーリストから選ぶ',
    menu_past_suppliers: '過去の取引先から選ぶ',
    menu_special_feature: '特集記事から依頼',

    // Project Settings
    projectInfo: 'プロジェクト情報',
    productName: '製品名',
    projectName: 'プロジェクト名',
    positioning: '位置づけ',
    manager: '責任者',
    reflectToStructure: 'プロジェクト構成へ反映',
    taskMenu: 'タスクメニュー',
    projectStructure: 'プロジェクト構成',
    editStructure: '構成を編集',
    completeAndGoToTop: '設定を完了してプロジェクトTOPへ',

    // Project Top
    back: '戻る',
    project_name_label: 'プロジェクト名:',
    project_lead_label: '責任者:',
    th_component_task: '構成 / タスク',
    th_assignee: '担当者',
    th_progress: '進捗',
    th_action: 'アクション',
    task_start: 'タスクを開始',
    not_started: '未着手',

    // Procurement List
    arrangement_list_title: '手配品リスト',
    col_status: 'ステータス',
    col_product_name: '商品名',
    col_part_number: '商品コード',
    col_quantity: '数量',
    col_amount: '金額',
    col_delivery: '納期',
    add_to_cart_btn: 'カートへ',
  },

  en: {
    // Site
    siteTitle: 'Proto 14',

    // Navigation
    tooltip_arrangement_list: 'Arrangement List',
    tooltip_cart: 'Cart',
    tooltip_order_history: 'Order History',
    tooltip_partners: 'Partner List',
    tooltip_settings: 'Settings',

    // Home Page
    quick_start_title: 'Quick Start',
    dashboard_title: 'Project Dashboard',
    create_project_btn: 'Create New Project',
    th_product_name: 'Product Name',
    th_project_name: 'Project Name',
    th_manager: 'Manager',
    th_status: 'Status',
    th_last_updated: 'Last Updated',
    th_actions: 'Actions',
    action_pj_top: 'PJ TOP',
    action_settings: 'Settings',

    // Quick Start Items
    standard_parts: 'Standard Parts',
    processed_goods: 'Processed Goods',
    bom: 'BOM',
    assy: 'Assembly',
    design_prototype: 'Design/Prototype',
    circuit_board: 'Circuit Board',
    harness: 'Harness',
    packaging: 'Packaging',

    // Status
    status_estimating: 'Estimating',
    status_procuring: 'Procuring',
    status_delivered: 'Delivered',

    // BOM Page
    bom_upload_title: 'Upload BOM to Search for Parts',
    upload_instruction: 'Drag & drop your file here',
    upload_or_click: 'or click to select a file',
    upload_supported_files: 'Supported files: .xlsx, .xls, .csv',
    upload_ready_message: 'Ready to go. Start with the button below.',
    process_bom_button: 'Start Quote',
    upload_processing: 'Processing...',

    // Design Page
    initial_title: 'Design & Prototyping',
    initial_subtitle: 'Please select a method to choose a quotation supplier.',
    menu_ai: 'AI Recommend',
    menu_case_study: 'Select by Case Study',
    menu_partner_list: 'Select from Partner List',
    menu_past_suppliers: 'Select from Past Suppliers',
    menu_special_feature: 'Request from Special Feature',

    // Project Settings
    projectInfo: 'Project Information',
    productName: 'Product Name',
    projectName: 'Project Name',
    positioning: 'Positioning',
    manager: 'Manager',
    reflectToStructure: 'Reflect to Structure',
    taskMenu: 'Task Menu',
    projectStructure: 'Project Structure',
    editStructure: 'Edit Structure',
    completeAndGoToTop: 'Complete Setup & Go to TOP',

    // Project Top
    back: 'Back',
    project_name_label: 'Project Name:',
    project_lead_label: 'Project Lead:',
    th_component_task: 'Component / Task',
    th_assignee: 'Assignee',
    th_progress: 'Progress',
    th_action: 'Action',
    task_start: 'Start Task',
    not_started: 'Not Started',

    // Procurement List
    arrangement_list_title: 'Procurement Plan',
    col_status: 'Status',
    col_product_name: 'Product Name',
    col_part_number: 'Part Number',
    col_quantity: 'Qty',
    col_amount: 'Amount',
    col_delivery: 'Delivery',
    add_to_cart_btn: 'To Cart',
  }
};

export type Language = keyof typeof translations;
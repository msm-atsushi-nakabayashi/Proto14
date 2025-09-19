'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { ArrowLeft, ShoppingCart, Download, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface ProcurementItem {
  id: string;
  projectName: string;
  unitName: string;
  partNumber: string;
  partName: string;
  brand: string;
  supplier: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  deliveryDays: number;
  orderDate?: string;
  estimatedDelivery?: string;
  status: 'unordered' | 'scheduled' | 'delivered';
}

const mockProcurementData: ProcurementItem[] = [
  // ヒューマノイドプロジェクト - 頭部ユニット
  {
    id: 'H-01-01',
    projectName: 'ヒューマノイドプロジェクト',
    unitName: '頭部ユニット',
    partNumber: 'OI-CAM-4K-25',
    partName: '4K C-MOSセンサーカメラ',
    brand: 'Optics Inc.',
    supplier: 'MISUMI',
    quantity: 2,
    unitPrice: 15000,
    totalPrice: 30000,
    deliveryDays: 5,
    status: 'scheduled',
    orderDate: '2025-09-10',
    estimatedDelivery: '2025-09-17'
  },
  {
    id: 'H-01-02',
    projectName: 'ヒューマノイドプロジェクト',
    unitName: '頭部ユニット',
    partNumber: 'SS-VRM-V3',
    partName: 'デュアルマイク アレイモジュール',
    brand: 'Sound Systems',
    supplier: 'DealerA',
    quantity: 1,
    unitPrice: 12000,
    totalPrice: 12000,
    deliveryDays: 7,
    status: 'delivered',
    orderDate: '2025-09-05'
  },
  {
    id: 'H-01-03',
    projectName: 'ヒューマノイドプロジェクト',
    unitName: '頭部ユニット',
    partNumber: 'RC-CPU-X5',
    partName: 'Cortex-A72搭載 SBC',
    brand: 'RoboCore',
    supplier: 'McMaster-Carr',
    quantity: 1,
    unitPrice: 23000,
    totalPrice: 23000,
    deliveryDays: 6,
    status: 'unordered'
  },
  // 胴体ユニット
  {
    id: 'B-01-01',
    projectName: 'ヒューマノイドプロジェクト',
    unitName: '胴体ユニット',
    partNumber: 'MSM-FRM-T6-B',
    partName: 'T6アルミニウム合金製フレーム',
    brand: 'MISUMI',
    supplier: 'MISUMI',
    quantity: 1,
    unitPrice: 80000,
    totalPrice: 80000,
    deliveryDays: 10,
    status: 'unordered'
  },
  {
    id: 'B-01-02',
    projectName: 'ヒューマノイドプロジェクト',
    unitName: '胴体ユニット',
    partNumber: 'EC-BAT-24V-10AH',
    partName: 'リチウムイオンバッテリー 24V/10Ah',
    brand: 'Energy Core',
    supplier: 'McMaster-Carr',
    quantity: 1,
    unitPrice: 40000,
    totalPrice: 40000,
    deliveryDays: 8,
    status: 'unordered'
  },
  // ドローンプロジェクト
  {
    id: 'D-01-01',
    projectName: 'ドローンプロジェクト',
    unitName: '機体ユニット',
    partNumber: 'DP-FRM-C250',
    partName: 'カーボンファイバーフレーム 250mm',
    brand: 'DroneParts',
    supplier: 'DealerA',
    quantity: 1,
    unitPrice: 8000,
    totalPrice: 8000,
    deliveryDays: 4,
    status: 'delivered',
    orderDate: '2025-09-01'
  },
  {
    id: 'D-01-02',
    projectName: 'ドローンプロジェクト',
    unitName: '機体ユニット',
    partNumber: 'MCM-MTR-2205',
    partName: 'ブラシレスモーター 2205 2300KV',
    brand: 'MotorCorp',
    supplier: 'McMaster-Carr',
    quantity: 4,
    unitPrice: 2500,
    totalPrice: 10000,
    deliveryDays: 3,
    status: 'unordered'
  }
];

export default function ProcurementListPage() {
  const { t, language } = useLanguage();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [filterProject, setFilterProject] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const projects = Array.from(new Set(mockProcurementData.map(item => item.projectName)));

  const filteredData = mockProcurementData.filter(item => {
    if (filterProject !== 'all' && item.projectName !== filterProject) return false;
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    return true;
  });

  // Group by project and unit
  const groupedData = filteredData.reduce((acc, item) => {
    const projectKey = item.projectName;
    if (!acc[projectKey]) acc[projectKey] = {};

    const unitKey = item.unitName;
    if (!acc[projectKey][unitKey]) acc[projectKey][unitKey] = [];

    acc[projectKey][unitKey].push(item);
    return acc;
  }, {} as Record<string, Record<string, ProcurementItem[]>>);

  const handleSelectItem = (itemId: string) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(itemId)) {
      newSelection.delete(itemId);
    } else {
      newSelection.add(itemId);
    }
    setSelectedItems(newSelection);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(new Set(filteredData.filter(item => item.status === 'unordered').map(item => item.id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'unordered':
        return (
          <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            {language === 'ja' ? '未発注' : 'Unordered'}
          </span>
        );
      case 'scheduled':
        return (
          <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            {language === 'ja' ? '納品予定' : 'Scheduled'}
          </span>
        );
      case 'delivered':
        return (
          <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            {language === 'ja' ? '納品済' : 'Delivered'}
          </span>
        );
      default:
        return null;
    }
  };

  const calculateTotal = () => {
    return Array.from(selectedItems).reduce((total, itemId) => {
      const item = mockProcurementData.find(i => i.id === itemId);
      return total + (item?.totalPrice || 0);
    }, 0);
  };

  const getMaxLeadTime = () => {
    const selectedData = Array.from(selectedItems).map(itemId =>
      mockProcurementData.find(i => i.id === itemId)
    ).filter(Boolean) as ProcurementItem[];

    if (selectedData.length === 0) return 0;
    return Math.max(...selectedData.map(item => item.deliveryDays));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('back')}
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">
        {language === 'ja' ? '手配品リスト' : 'Procurement List'}
      </h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'ja' ? 'プロジェクト' : 'Project'}
            </label>
            <select
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">{language === 'ja' ? 'すべて' : 'All'}</option>
              {projects.map(project => (
                <option key={project} value={project}>{project}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'ja' ? 'ステータス' : 'Status'}
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">{language === 'ja' ? 'すべて' : 'All'}</option>
              <option value="unordered">{language === 'ja' ? '未発注' : 'Unordered'}</option>
              <option value="scheduled">{language === 'ja' ? '納品予定' : 'Scheduled'}</option>
              <option value="delivered">{language === 'ja' ? '納品済' : 'Delivered'}</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              {language === 'ja' ? 'PDFで出力' : 'Export PDF'}
            </button>
          </div>
        </div>
      </div>

      {/* Summary */}
      {selectedItems.size > 0 && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-sm text-blue-900">
                {language === 'ja' ? `選択中: ${selectedItems.size}件` : `Selected: ${selectedItems.size} items`}
              </p>
              <p className="text-lg font-semibold text-blue-900">
                {language === 'ja' ? '合計金額: ' : 'Total: '}
                ¥{calculateTotal().toLocaleString()}
              </p>
              <p className="text-sm text-blue-700">
                {language === 'ja' ? `最長納期: ${getMaxLeadTime()}日` : `Max Lead Time: ${getMaxLeadTime()} days`}
              </p>
            </div>
            <button className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              <ShoppingCart className="w-4 h-4 mr-2" />
              {language === 'ja' ? 'カートに追加' : 'Add to Cart'}
            </button>
          </div>
        </div>
      )}

      {/* Data Table */}
      {Object.entries(groupedData).map(([projectName, units]) => (
        <div key={projectName} className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {projectName}
          </h2>

          {Object.entries(units).map(([unitName, items]) => (
            <div key={unitName} className="mb-6">
              <h3 className="text-lg font-medium mb-3 text-gray-700 bg-gray-50 p-2 rounded">
                {unitName}
              </h3>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3">
                          <input
                            type="checkbox"
                            onChange={(e) => handleSelectAll(e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {language === 'ja' ? '型番' : 'Part Number'}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {language === 'ja' ? '部品名' : 'Part Name'}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {language === 'ja' ? 'サプライヤー' : 'Supplier'}
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {language === 'ja' ? '数量' : 'Qty'}
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {language === 'ja' ? '金額' : 'Amount'}
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {language === 'ja' ? '納期' : 'Delivery'}
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {language === 'ja' ? 'ステータス' : 'Status'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {items.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <input
                              type="checkbox"
                              checked={selectedItems.has(item.id)}
                              onChange={() => handleSelectItem(item.id)}
                              disabled={item.status !== 'unordered'}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.partNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.partName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.supplier}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                            ¥{item.totalPrice.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                            {item.status === 'delivered' ?
                              item.orderDate :
                              item.status === 'scheduled' ?
                                item.estimatedDelivery :
                                `${item.deliveryDays}${language === 'ja' ? '日' : 'd'}`
                            }
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {getStatusBadge(item.status)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
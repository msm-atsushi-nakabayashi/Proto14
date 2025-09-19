'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { ArrowLeft, Upload, FileText, Calculator, Package2, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface CustomPartRequest {
  id: number;
  name: string;
  material: string;
  quantity: number;
  drawings: string[];
  specifications: string;
  status: 'draft' | 'quoting' | 'quoted' | 'ordered';
  estimatedPrice?: number;
  leadTime?: number;
}

export default function CustomPartsPage() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    material: '',
    quantity: 1,
    specifications: '',
    surface: '',
    tolerance: '',
  });

  const materials = [
    'SS400 (一般構造用鋼)',
    'S45C (機械構造用炭素鋼)',
    'SUS304 (ステンレス鋼)',
    'A5052 (アルミニウム合金)',
    'A2017 (ジュラルミン)',
    'C1100 (純銅)',
    'POM (ポリアセタール)',
    'MC901 (MCナイロン)',
  ];

  const surfaceTreatments = [
    'なし',
    '黒染め',
    'ユニクロメッキ',
    'クロメート',
    'アルマイト（シルバー）',
    'アルマイト（黒）',
    '塗装',
  ];

  const mockHistory: CustomPartRequest[] = [
    {
      id: 1,
      name: 'カスタムブラケット A-001',
      material: 'A5052',
      quantity: 10,
      drawings: ['bracket_a001.pdf'],
      specifications: '表面処理：アルマイト（シルバー）',
      status: 'quoted',
      estimatedPrice: 45000,
      leadTime: 7,
    },
    {
      id: 2,
      name: 'シャフトホルダー SH-002',
      material: 'SUS304',
      quantity: 5,
      drawings: ['shaft_holder.pdf'],
      specifications: '研磨仕上げ',
      status: 'ordered',
      estimatedPrice: 28000,
      leadTime: 5,
    },
    {
      id: 3,
      name: 'カスタムギア G-101',
      material: 'S45C',
      quantity: 20,
      drawings: ['gear_g101.pdf'],
      specifications: '熱処理：高周波焼入れ',
      status: 'quoting',
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      draft: { label: language === 'ja' ? '下書き' : 'Draft', class: 'bg-gray-100 text-gray-800' },
      quoting: { label: language === 'ja' ? '見積中' : 'Quoting', class: 'bg-yellow-100 text-yellow-800' },
      quoted: { label: language === 'ja' ? '見積済' : 'Quoted', class: 'bg-blue-100 text-blue-800' },
      ordered: { label: language === 'ja' ? '発注済' : 'Ordered', class: 'bg-green-100 text-green-800' },
    };
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusInfo.class}`}>
        {statusInfo.label}
      </span>
    );
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
        {language === 'ja' ? '加工品見積依頼' : 'Custom Parts Quote Request'}
      </h1>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('new')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'new'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {language === 'ja' ? '新規見積依頼' : 'New Quote Request'}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'history'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {language === 'ja' ? '依頼履歴' : 'Request History'}
          </button>
        </nav>
      </div>

      {activeTab === 'new' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">
                {language === 'ja' ? '部品情報' : 'Part Information'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'ja' ? '部品名' : 'Part Name'}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder={language === 'ja' ? '例：カスタムブラケット' : 'e.g., Custom Bracket'}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'ja' ? '材質' : 'Material'}
                    </label>
                    <select
                      value={formData.material}
                      onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">{language === 'ja' ? '選択してください' : 'Please select'}</option>
                      {materials.map(material => (
                        <option key={material} value={material}>{material}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'ja' ? '数量' : 'Quantity'}
                    </label>
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      min="1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'ja' ? '表面処理' : 'Surface Treatment'}
                    </label>
                    <select
                      value={formData.surface}
                      onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">{language === 'ja' ? '選択してください' : 'Please select'}</option>
                      {surfaceTreatments.map(treatment => (
                        <option key={treatment} value={treatment}>{treatment}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'ja' ? '公差' : 'Tolerance'}
                    </label>
                    <select
                      value={formData.tolerance}
                      onChange={(e) => setFormData({ ...formData, tolerance: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">{language === 'ja' ? '選択してください' : 'Please select'}</option>
                      <option value="general">一般公差</option>
                      <option value="precision">精密公差（±0.05）</option>
                      <option value="high-precision">高精度（±0.01）</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'ja' ? '追加仕様' : 'Additional Specifications'}
                  </label>
                  <textarea
                    value={formData.specifications}
                    onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder={language === 'ja' ? '特殊な要求事項があれば記入してください' : 'Enter any special requirements'}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">
                {language === 'ja' ? '図面アップロード' : 'Drawing Upload'}
              </h2>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.dxf,.dwg,.step,.iges"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    {language === 'ja' ? 'クリックまたはドラッグして図面をアップロード' : 'Click or drag to upload drawings'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, DXF, DWG, STEP, IGES
                  </p>
                </label>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4">
                {language === 'ja' ? '見積依頼サマリー' : 'Quote Request Summary'}
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{language === 'ja' ? '部品数' : 'Parts'}</span>
                  <span>1</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{language === 'ja' ? '合計数量' : 'Total Qty'}</span>
                  <span>{formData.quantity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{language === 'ja' ? '図面' : 'Drawings'}</span>
                  <span>{uploadedFiles.length} {language === 'ja' ? 'ファイル' : 'files'}</span>
                </div>
              </div>

              <button className="w-full mt-6 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                {language === 'ja' ? '見積依頼を送信' : 'Submit Quote Request'}
              </button>

              <p className="text-xs text-gray-500 mt-4">
                {language === 'ja'
                  ? '※通常1-2営業日以内に見積回答いたします'
                  : '* Usually quoted within 1-2 business days'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'ja' ? '依頼日' : 'Request Date'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'ja' ? '部品名' : 'Part Name'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'ja' ? '材質' : 'Material'}
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'ja' ? '数量' : 'Quantity'}
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'ja' ? 'ステータス' : 'Status'}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'ja' ? '見積金額' : 'Quote Amount'}
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'ja' ? '納期' : 'Lead Time'}
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'ja' ? 'アクション' : 'Action'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockHistory.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      2025-09-{15 - request.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {request.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.material}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {request.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {request.estimatedPrice ? `¥${request.estimatedPrice.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {request.leadTime ? `${request.leadTime}${language === 'ja' ? '日' : 'd'}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button className="text-blue-600 hover:text-blue-800">
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
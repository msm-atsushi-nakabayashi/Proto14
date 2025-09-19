'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { generateMockParts } from '@/lib/data/mockData';
import { ArrowLeft, UploadCloud, FileCheck2, Search, Download } from 'lucide-react';
import Link from 'next/link';
import { Part } from '@/lib/types';

export default function BOMPage() {
  const { t, language } = useLanguage();
  const [currentView, setCurrentView] = useState<'upload' | 'results'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [parts, setParts] = useState<Part[]>([]);
  const [filteredParts, setFilteredParts] = useState<Part[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [selectedParts, setSelectedParts] = useState<Set<number>>(new Set());

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const processBOM = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const mockParts = generateMockParts(250);
      setParts(mockParts);
      setFilteredParts(mockParts);
      setIsProcessing(false);
      setCurrentView('results');
    }, 1500);
  };

  const paginatedParts = filteredParts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredParts.length / itemsPerPage);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      paginatedParts.forEach(part => selectedParts.add(part.id));
    } else {
      paginatedParts.forEach(part => selectedParts.delete(part.id));
    }
    setSelectedParts(new Set(selectedParts));
  };

  const handleSelectPart = (partId: number, checked: boolean) => {
    if (checked) {
      selectedParts.add(partId);
    } else {
      selectedParts.delete(partId);
    }
    setSelectedParts(new Set(selectedParts));
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

      {currentView === 'upload' ? (
        <div className="text-center py-10">
          <h2 className="text-3xl font-bold mb-4">{t('bom_upload_title')}</h2>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById('file-input')?.click()}
            className="mt-8 mx-auto max-w-2xl border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 bg-white transition-colors"
          >
            <input
              id="file-input"
              type="file"
              className="hidden"
              accept=".xlsx,.xls,.csv"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            />

            {!selectedFile ? (
              <>
                <UploadCloud className="mx-auto h-16 w-16 text-gray-400" />
                <p className="mt-4 text-gray-500">{t('upload_instruction')}</p>
                <p className="text-sm text-gray-500">{t('upload_or_click')}</p>
                <p className="text-xs text-gray-400 mt-1">{t('upload_supported_files')}</p>
              </>
            ) : (
              <>
                <FileCheck2 className="mx-auto h-16 w-16 text-green-500" />
                <p className="mt-4 text-gray-700 font-medium">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">{t('upload_ready_message')}</p>
              </>
            )}
          </div>

          {selectedFile && (
            <div className="mt-6 text-right max-w-2xl mx-auto">
              <button
                onClick={processBOM}
                disabled={isProcessing}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
              >
                {isProcessing ? t('upload_processing') : t('process_bom_button')}
              </button>
            </div>
          )}

          {isProcessing && (
            <div className="mt-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">{t('upload_processing')}</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* Results Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-8">
                <div>
                  <p className="text-sm text-gray-500">合計金額</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ¥{parts.reduce((sum, p) => sum + p.price * p.quantity, 0).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">最長納期</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.max(...parts.map(p => p.leadTime))} 日
                  </p>
                </div>
              </div>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <Download className="mr-2 h-4 w-4" />
                PDFで出力
              </button>
            </div>
          </div>

          {/* Parts Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th className="p-4">
                      <input
                        type="checkbox"
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-3">型番</th>
                    <th className="px-6 py-3">数量</th>
                    <th className="px-6 py-3">価格</th>
                    <th className="px-6 py-3">納期</th>
                    <th className="px-6 py-3">サプライヤー</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedParts.map((part) => (
                    <tr
                      key={part.id}
                      className={`bg-white border-b hover:bg-gray-50 ${
                        part.matchStatus === 'Not Matched' ? 'bg-red-50 text-red-700' : ''
                      }`}
                    >
                      <td className="w-4 p-4">
                        <input
                          type="checkbox"
                          checked={selectedParts.has(part.id)}
                          onChange={(e) => handleSelectPart(part.id, e.target.checked)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 font-medium">
                        <div className="flex items-center">
                          <span>{part.partNumber}</span>
                          <button className="ml-2 text-gray-400 hover:text-blue-600">
                            <Search className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">{part.quantity}</td>
                      <td className="px-6 py-4">
                        {part.price > 0 ? `¥${part.price.toLocaleString()}` : '-'}
                      </td>
                      <td className="px-6 py-4">
                        {part.leadTime > 0 ? `${part.leadTime} ${language === 'ja' ? '日' : 'Days'}` : '-'}
                      </td>
                      <td className="px-6 py-4">{part.supplier}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              {filteredParts.length}件中 {(currentPage - 1) * itemsPerPage + 1}〜
              {Math.min(currentPage * itemsPerPage, filteredParts.length)}件を表示
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                前へ
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                次へ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
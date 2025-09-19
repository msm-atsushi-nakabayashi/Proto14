'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { ArrowLeft, Search, Filter, ShoppingCart, Package, Clock } from 'lucide-react';
import Link from 'next/link';

// Mock data for standard parts
const standardParts = [
  { id: 1, partNumber: 'M3X10-SUS', name: 'ステンレス六角ボルト M3x10', category: 'ボルト', price: 15, stock: 1000, leadTime: 1, manufacturer: 'MISUMI' },
  { id: 2, partNumber: 'NBR-O-25', name: 'NBR Oリング 25mm', category: 'シール', price: 50, stock: 500, leadTime: 1, manufacturer: 'NOK' },
  { id: 3, partNumber: 'LM6UU', name: 'リニアベアリング 6mm', category: 'ベアリング', price: 480, stock: 200, leadTime: 2, manufacturer: 'THK' },
  { id: 4, partNumber: 'SS400-PL-6', name: 'SS400 鋼板 6mm', category: '素材', price: 2500, stock: 50, leadTime: 3, manufacturer: '新日鉄' },
  { id: 5, partNumber: 'A2017-RD-10', name: 'アルミ丸棒 A2017 φ10', category: '素材', price: 350, stock: 100, leadTime: 2, manufacturer: 'UACJ' },
  { id: 6, partNumber: 'SKF-6201', name: '深溝玉軸受 6201', category: 'ベアリング', price: 580, stock: 150, leadTime: 1, manufacturer: 'SKF' },
  { id: 7, partNumber: 'M4-NUT-SUS', name: 'ステンレス六角ナット M4', category: 'ナット', price: 8, stock: 2000, leadTime: 1, manufacturer: 'MISUMI' },
  { id: 8, partNumber: 'TIMING-GT2-200', name: 'タイミングベルト GT2 200mm', category: 'ベルト', price: 780, stock: 80, leadTime: 5, manufacturer: '三ツ星' },
];

const categories = ['すべて', 'ボルト', 'ナット', 'ベアリング', 'シール', '素材', 'ベルト'];

export default function StandardPartsPage() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [cart, setCart] = useState<Set<number>>(new Set());
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const filteredParts = standardParts.filter(part => {
    const matchesSearch = part.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          part.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'すべて' || part.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (partId: number) => {
    const newCart = new Set(cart);
    if (newCart.has(partId)) {
      newCart.delete(partId);
    } else {
      newCart.add(partId);
      if (!quantities[partId]) {
        setQuantities({ ...quantities, [partId]: 1 });
      }
    }
    setCart(newCart);
  };

  const handleQuantityChange = (partId: number, quantity: number) => {
    setQuantities({ ...quantities, [partId]: quantity });
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
        {language === 'ja' ? '規格品検索' : 'Standard Parts Search'}
      </h1>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ja' ? '型番または商品名で検索...' : 'Search by part number or name...'}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Parts List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ja' ? '型番' : 'Part Number'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ja' ? '商品名' : 'Name'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ja' ? 'カテゴリ' : 'Category'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ja' ? 'メーカー' : 'Manufacturer'}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ja' ? '単価' : 'Unit Price'}
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ja' ? '在庫' : 'Stock'}
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ja' ? '納期' : 'Lead Time'}
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ja' ? '数量' : 'Quantity'}
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ja' ? 'カート' : 'Cart'}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredParts.map((part) => (
                <tr key={part.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {part.partNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {part.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {part.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {part.manufacturer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    ¥{part.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <div className="flex items-center justify-center">
                      <Package className="h-4 w-4 text-green-500 mr-1" />
                      <span className={part.stock > 100 ? 'text-green-600' : 'text-yellow-600'}>
                        {part.stock}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <div className="flex items-center justify-center">
                      <Clock className="h-4 w-4 text-blue-500 mr-1" />
                      <span>{part.leadTime}{language === 'ja' ? '日' : 'd'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <input
                      type="number"
                      min="1"
                      value={quantities[part.id] || 1}
                      onChange={(e) => handleQuantityChange(part.id, parseInt(e.target.value) || 1)}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleAddToCart(part.id)}
                      className={`p-2 rounded-full transition-colors ${
                        cart.has(part.id)
                          ? 'bg-green-100 text-green-600 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600'
                      }`}
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cart Summary */}
      {cart.size > 0 && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-lg font-semibold text-blue-900">
                {language === 'ja' ? `カート内: ${cart.size}種類` : `In Cart: ${cart.size} items`}
              </span>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              {language === 'ja' ? '見積書作成' : 'Create Quote'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
'use client'
import { useState } from 'react'
import QuestionFlow from '@/components/QuestionFlow'

interface PersonInfo {
  name: string
  age: string
  personality: string
}

export default function Home() {
  const [isStarted, setIsStarted] = useState(false)
  const [person1, setPerson1] = useState<PersonInfo>({
    name: '',
    age: '',
    personality: ''
  })
  const [person2, setPerson2] = useState<PersonInfo>({
    name: '',
    age: '',
    personality: ''
  })
  
  const handleStart = () => {
    if (!person1.name || !person1.age || !person1.personality ||
        !person2.name || !person2.age || !person2.personality) {
      alert('请填写完整信息')
      return
    }
    setIsStarted(true)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 to-pink-100">
      {!isStarted ? (
        <div className="w-full max-w-lg p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">AI 恋爱契合度测试</h1>
            <p className="text-gray-600">通过先进的AI算法，测试你们的恋爱契合程度</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-medium mb-4">第一位</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">姓名</label>
                  <input
                    type="text"
                    value={person1.name}
                    onChange={e => setPerson1({...person1, name: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="请输入姓名"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">年龄</label>
                  <input
                    type="number"
                    value={person1.age}
                    onChange={e => setPerson1({...person1, age: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="请输入年龄"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">性格特点</label>
                  <select
                    value={person1.personality}
                    onChange={e => setPerson1({...person1, personality: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">请选择性格特点</option>
                    <option value="外向">外向开朗</option>
                    <option value="内向">内向安静</option>
                    <option value="中性">性格中性</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-medium mb-4">第二位</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">姓名</label>
                  <input
                    type="text"
                    value={person2.name}
                    onChange={e => setPerson2({...person2, name: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="请输入姓名"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">年龄</label>
                  <input
                    type="number"
                    value={person2.age}
                    onChange={e => setPerson2({...person2, age: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="请输入年龄"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">性格特点</label>
                  <select
                    value={person2.personality}
                    onChange={e => setPerson2({...person2, personality: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">请选择性格特点</option>
                    <option value="外向">外向开朗</option>
                    <option value="内向">内向安静</option>
                    <option value="中性">性格中性</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={handleStart}
            className="w-full mt-8 px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
          >
            开始测试
          </button>
        </div>
      ) : (
        <QuestionFlow person1={person1} person2={person2} />
      )}
    </main>
  )
}
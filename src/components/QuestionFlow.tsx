'use client'
import { useState, useEffect } from 'react'

const questions = [
  {
    id: 1,
    question: "你们在一起多久了？",
    options: [
      "不到3个月",
      "3-6个月",
      "6个月到1年",
      "1年以上"
    ]
  },
  {
    id: 2,
    question: "你们平均每天会交流多长时间？",
    options: [
      "很少联系",
      "1-2小时",
      "2-4小时",
      "几乎一整天都在联系"
    ]
  },
  {
    id: 3,
    question: "对于未来的规划，你们的想法是？",
    options: [
      "没怎么谈过",
      "想法很不一样",
      "有一些共同想法",
      "对未来有共同规划"
    ]
  },
  {
    id: 4,
    question: "在发生分歧时，你们通常会？",
    options: [
      "争吵或冷战",
      "一方妥协",
      "平和讨论",
      "互相理解并寻求解决方案"
    ]
  },
  {
    id: 5,
    question: "对于彼此的生活习惯，你们是？",
    options: [
      "经常有矛盾",
      "有些不适应",
      "基本能接受",
      "非常合拍"
    ]
  }
]

// 定义每个问题的权重
const questionWeights = {
  1: 1,  // 时间长短权重较低
  2: 1.5,  // 日常交流很重要
  3: 2,  // 未来规划最重要
  4: 1.8,  // 沟通方式很重要
  5: 1.2   // 生活习惯中等重要
}

interface PersonInfo {
  name: string
  age: string
  personality: string
}

interface QuestionFlowProps {
  person1: PersonInfo
  person2: PersonInfo
}

export default function QuestionFlow({ person1, person2 }: QuestionFlowProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<number>(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const calculateResult = () => {
    let totalScore = 0
    let maxPossibleScore = 0
    
    // 计算问题得分
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === Number(questionId))
      if (!question) return

      const weight = questionWeights[question.id as keyof typeof questionWeights]
      const optionIndex = question.options.indexOf(answer)
      const score = (optionIndex + 1) * 25 * weight
      totalScore += score
      maxPossibleScore += 100 * weight
    })

    // 计算年龄差异影响
    const ageDiff = Math.abs(parseInt(person1.age) - parseInt(person2.age))
    let ageScore = 100
    if (ageDiff > 10) {
      ageScore = 70
    } else if (ageDiff > 5) {
      ageScore = 85
    }

    // 计算性格匹配度
    let personalityScore = 100
    if (person1.personality === person2.personality) {
      if (person1.personality === "中性") {
        personalityScore = 90
      } else {
        personalityScore = 80  // 太相似可能不太好
      }
    } else if (
      (person1.personality === "外向" && person2.personality === "内向") ||
      (person1.personality === "内向" && person2.personality === "外向")
    ) {
      personalityScore = 95  // 互补性格加分
    }

    // 综合计算最终得分
    const baseScore = Math.round((totalScore / maxPossibleScore) * 100)
    const finalScore = Math.round((baseScore * 0.6 + ageScore * 0.2 + personalityScore * 0.2))
    setResult(finalScore)
    setShowResult(true)
  }

  const handleAnswer = (answer: string) => {
    setIsTransitioning(true)
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }))
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
      } else {
        calculateResult()
      }
      setIsTransitioning(false)
    }, 300)
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentQuestion(prev => prev - 1)
        setIsTransitioning(false)
      }, 300)
    }
  }

  const getResultMessage = (score: number) => {
    const message = score >= 90 
      ? "天生一对！你们的契合度非常高，继续保持这份美好的感情吧！"
      : score >= 75 
      ? "你们是很般配的一对，虽然有小分歧，但都在努力维护这段感情。"
      : score >= 60 
      ? "你们还需要更多沟通和理解，但有付出就会有收获。"
      : "建议你们多花时间了解彼此，感情需要双方的努力和经营。"

    return `${person1.name} 和 ${person2.name}：${message}`
  }

  // 添加键盘事件支持
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (showResult) return
      
      // 数字键1-4选择选项
      if (e.key >= '1' && e.key <= '4') {
        const optionIndex = parseInt(e.key) - 1
        if (optionIndex < questions[currentQuestion].options.length) {
          handleAnswer(questions[currentQuestion].options[optionIndex])
        }
      }
      
      // 左箭头返回上一题
      if (e.key === 'ArrowLeft' && currentQuestion > 0) {
        handlePrevious()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentQuestion, showResult])

  const handleShare = async () => {
    const shareText = `我在AI恋爱契合度测试中获得了 ${result} 分！\n${getResultMessage(result)}\n快来测试你们的契合度吧！`
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'AI恋爱契合度测试结果',
          text: shareText,
          url: window.location.href
        })
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText)
        alert('结果已复制到剪贴板！')
      } else {
        alert('您的浏览��不支持分享功能')
      }
    } catch (error) {
      console.error('分享失败:', error)
    }
  }

  if (showResult) {
    return (
      <div className="w-full max-w-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">测试结果</h2>
        <div className="mb-6">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-pink-100"></div>
            <div 
              className="absolute inset-0 rounded-full border-4 border-pink-500 transition-all duration-1000"
              style={{
                clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                transform: `rotate(${result * 3.6}deg)`
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-3xl font-bold text-pink-500">{result}</p>
            </div>
          </div>
          <div className="mb-6">
            <div className="text-gray-600 mb-4">
              <p>{person1.name} 与 {person2.name}</p>
              <p>年龄：{person1.age}岁 vs {person2.age}岁</p>
              <p>性格：{person1.personality} vs {person2.personality}</p>
            </div>
            <p className="text-lg text-gray-600">{getResultMessage(result)}</p>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => window.location.reload()}
              className="w-full px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
            >
              重新测试
            </button>
            <button
              onClick={handleShare}
              className="w-full px-6 py-2 border border-pink-500 text-pink-500 rounded-full hover:bg-pink-50 transition-colors"
            >
              分享结果
            </button>
          </div>
        </div>
        
        {/* 添加详细分析 */}
        <div className="mt-8 text-left">
          <h3 className="text-lg font-medium mb-4">详细分析</h3>
          <div className="space-y-4">
            {Object.entries(answers).map(([questionId, answer]) => {
              const question = questions.find(q => q.id === Number(questionId))
              if (!question) return null
              
              const optionIndex = question.options.indexOf(answer)
              const score = (optionIndex + 1) * 25
              
              return (
                <div key={questionId} className="border-b pb-4">
                  <p className="text-gray-600">{question.question}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-pink-500">{answer}</span>
                    <span className="text-gray-500">{score}分</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-lg p-6">
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>进度</span>
          <span>{currentQuestion + 1}/{questions.length}</span>
        </div>
        <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-pink-500 transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="mb-4">
          <h2 className="text-xl font-medium">{questions[currentQuestion].question}</h2>
        </div>
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full p-3 text-left border rounded-lg hover:bg-pink-50 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {currentQuestion > 0 && (
        <button
          onClick={handlePrevious}
          className="mt-6 text-gray-500 hover:text-pink-500 transition-colors"
        >
          ← 返回上一题
        </button>
      )}

      {/* 添加键盘操作提示 */}
      <div className="mt-6 text-sm text-gray-500">
        <p>键盘操作：</p>
        <ul className="list-disc list-inside">
          <li>数字键 1-4 选择选项</li>
          <li>← 返回上一题</li>
        </ul>
      </div>
    </div>
  )
} 
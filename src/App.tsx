import { useState, useEffect, useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  ArrowUpRight, Mail, Phone, MessageCircle,
  Terminal, Code2, Brain,
  Users, Target, Zap, Trophy,
  Sparkles
} from 'lucide-react'

/* ═══════════════════════════════════════
   Noise Texture Component
   ═══════════════════════════════════════ */
function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.025] mix-blend-overlay"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
    />
  )
}

/* ═══════════════════════════════════════
   SpotlightCard — Mouse-following glow
   Inspired by BobZhang0216/personal-homepage
   ═══════════════════════════════════════ */
function SpotlightCard({ children, className = '', onClick, spotlightColor = 'rgba(255,255,255,0.12)' }: {
  children: ReactNode
  className?: string
  onClick?: () => void
  spotlightColor?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 30, stiffness: 250 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const spotlightBg = useTransform(
    [smoothX, smoothY],
    ([x, y]) => `radial-gradient(500px circle at ${x}px ${y}px, ${spotlightColor}, transparent 40%)`
  )

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-white/[0.12] ${className}`}
    >
      {/* Spotlight layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: spotlightBg }}
      />
      {/* Noise on card */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay rounded-2xl" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════
   Scroll Reveal with Framer Motion
   ═══════════════════════════════════════ */
function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════
   Data
   ═══════════════════════════════════════ */
const experiences = [
  { period: '2025.7 - 2025.9', title: '西南财经大学 · 中国家庭金融大调查 项目督导', desc: '带队赴成都、宜宾、大连等5座城市开展调研，协调5人团队完成1200+份有效问卷，数据准确率98%。项目覆盖29省355区县，样本量超40000户。' },
  { period: '2025.10 - 2026.1', title: 'VIVO 官方校园大使', desc: '策划"vivo新品校园体验日"活动，统筹场地布置、流程设计、海报设计、短视频剪辑。吸引300+学生参与，活动曝光量超5000次。' },
  { period: '2025.1 - 2025.2', title: '北京银行 · 零售部/电商实习生', desc: '参与3款面向县域客户的理财产品设计；独立负责助农直播带货全流程，单场观看量超5000人，带动农产品销售额提升20%。' },
]

const awards = [
  { title: '中国国际大学生创新创业大赛（互联网+）', level: '国家级三等奖', icon: Trophy },
  { title: '新文科大赛', level: '全国二等奖', icon: Sparkles },
  { title: '"正大杯"全国大学生市场调查与分析大赛', level: '省一等奖', icon: Target },
  { title: '"三创赛"电子商务创新创意创业挑战赛', level: '省二等奖', icon: Zap },
  { title: '"挑战杯"全国大学生创业计划竞赛', level: '省三等奖', icon: Users },
]

const projects = [
  { title: '冷却塔智能温控系统', desc: '带队实地调研山东7家企业，83%企业急需节能升级。使用Ward聚类与ILP优化建模，获互联网+国铜。', tag: '互联网+国铜', gradient: 'from-blue-500/15 via-blue-400/5 to-transparent' },
  { title: '数学建模竞赛（山东省C题）', desc: '构建多目标优化模型，完成热力图、龙卷风图、Pareto前沿等5个核心可视化图表。', tag: '省级竞赛', gradient: 'from-violet-500/15 via-violet-400/5 to-transparent' },
  { title: '奕奕中纹 · 文化传播', desc: '以纹饰本身为核心传播对象，聚焦山东地区，推动传统纹饰文化数字化传播与推广。', tag: '志愿服务', gradient: 'from-cyan-500/15 via-cyan-400/5 to-transparent' },
]

const techSkills = ['Python', 'R', 'Tableau', 'MySQL', 'React + Vite', 'Tailwind CSS', 'Claude Code', 'Codex CLI', 'WorkBuddy']
const softSkills = ['HR招聘全流程', '数据分析与可视化', '营销策略制定', '直播运营', '项目管理', '团队协作', 'GEO撰写', '私域运营']

/* ═══════════════════════════════════════
   Nav
   ═══════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.04] shadow-lg shadow-black/20' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
        <a href="#" className="text-white/90 font-semibold tracking-wide text-sm">马英航</a>
        <div className="hidden md:flex items-center gap-8">
          {['经历', '技能', '荣誉', '项目', '联系'].map(l => (
            <a key={l} href={`#${l}`} className="text-[13px] text-white/35 hover:text-white/75 transition-colors duration-300">{l}</a>
          ))}
        </div>
        <motion.a
          href="mailto:1171322585@qq.com"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="text-[13px] text-blue-300/70 hover:text-blue-300 transition-colors border border-blue-400/15 px-4 py-1.5 rounded-full hover:border-blue-400/30 hover:bg-blue-400/5 transition-all"
        >
          联系我
        </motion.a>
      </div>
    </motion.nav>
  )
}

/* ═══════════════════════════════════════
   Hero — with mouse parallax
   ═══════════════════════════════════════ */
function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0d1017] to-[#0a0a0a]" />

      {/* Animated color orbs — move with mouse */}
      <motion.div
        animate={{ x: mousePos.x * -15, y: mousePos.y * -10 }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-blue-500/[0.04] blur-[100px]"
      />
      <motion.div
        animate={{ x: mousePos.x * 10, y: mousePos.y * 12 }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        className="absolute bottom-0 -left-32 w-[340px] h-[340px] rounded-full bg-violet-500/[0.03] blur-[90px]"
      />
      <motion.div
        animate={{ x: mousePos.x * 8, y: mousePos.y * -8 }}
        transition={{ type: 'spring', stiffness: 60, damping: 28 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-cyan-500/[0.02] blur-[80px]"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 py-32">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          {/* Left: Text */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
              </span>
              <span className="text-[13px] text-blue-300/50">可立即到岗 · 实习稳定5个月+</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight"
            >
              马英航
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-lg text-white/40 mb-10"
            >
              山东财经大学 · 市场营销专业 ·{' '}
              <span className="text-blue-400/60">Web Coding</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-8 mb-12"
            >
              {[
                { num: '15+', label: '竞赛奖项' },
                { num: '50+', label: '实地调研' },
                { num: '1200+', label: '问卷收集' },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.55 + i * 0.08 }}
                >
                  <span className="text-3xl font-bold bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">{s.num}</span>
                  <span className="block text-[12px] text-white/25 mt-1 tracking-wide">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-6"
            >
              {[
                { icon: Mail, text: '1171322585@qq.com', href: 'mailto:1171322585@qq.com' },
                { icon: Phone, text: '13810310476', href: 'tel:13810310476' },
                { icon: MessageCircle, text: '微信同号', href: '#' },
              ].map(c => (
                <a key={c.text} href={c.href} className="group inline-flex items-center gap-2 text-[14px] text-white/35 hover:text-white/70 transition-colors duration-300">
                  <c.icon className="w-4 h-4" />
                  {c.text}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right: Photo with parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0"
          >
            <motion.div
              animate={{ x: mousePos.x * 6, y: mousePos.y * 6 }}
              transition={{ type: 'spring', stiffness: 60, damping: 25 }}
              className="relative"
            >
              {/* Gradient ring */}
              <div className="w-60 h-60 md:w-72 md:h-72 rounded-full overflow-hidden p-[2px] bg-gradient-to-br from-blue-400/50 via-violet-400/30 to-cyan-400/20 shadow-2xl shadow-blue-500/15">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0a0a]">
                  <img src="/photo.jpg" alt="马英航" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Floating "Web Coding" tag */}
              <motion.div
                animate={{ x: mousePos.x * -3, y: mousePos.y * -3 }}
                transition={{ type: 'spring', stiffness: 60, damping: 25 }}
                className="absolute -bottom-4 -right-4 px-4 py-2 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.08] shadow-lg"
              >
                <span className="text-[12px] text-blue-300/70 font-medium">Web Coding</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════
   Section Heading
   ═══════════════════════════════════════ */
function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <Reveal>
      <div className="mb-12 flex items-end gap-4">
        <div>
          <span className="text-[11px] font-semibold text-blue-400/35 uppercase tracking-[0.2em]">{label}</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 tracking-tight">{title}</h2>
        </div>
        <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-white/[0.06] to-transparent" />
      </div>
    </Reveal>
  )
}

/* ═══════════════════════════════════════
   Experience — timeline with animated bar
   ═══════════════════════════════════════ */
function Experience() {
  return (
    <section id="经历" className="py-28 px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="Experience" title="实习与项目经历" />

        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <Reveal key={exp.title} delay={i * 80}>
              <div className="group relative py-8 border-b border-white/[0.04] last:border-0 cursor-default">
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                  <span className="text-[13px] text-white/25 font-mono shrink-0 md:w-48 pt-0.5">{exp.period}</span>
                  <div className="flex-1">
                    <h3 className="text-[16px] font-semibold text-white/80 group-hover:text-blue-300/80 transition-colors duration-300">{exp.title}</h3>
                    <p className="text-[14px] text-white/30 leading-relaxed mt-2.5 max-w-2xl group-hover:text-white/45 transition-colors duration-300">{exp.desc}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/0 group-hover:text-blue-400/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 mt-1" />
                </div>
                {/* Animated divider on hover */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-blue-400/30 via-violet-400/20 to-transparent origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════
   Skills — Bento Grid with SpotlightCards
   ═══════════════════════════════════════ */
function Skills() {
  return (
    <section id="技能" className="py-28 px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="Skills" title="技能" />

        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {/* Tech Skills — large card */}
          <SpotlightCard className="p-7 md:col-span-2" spotlightColor="rgba(59,130,246,0.08)">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/[0.08] border border-blue-400/10 flex items-center justify-center">
                <Code2 className="w-4 h-4 text-blue-300/50" />
              </div>
              <span className="text-[11px] font-semibold text-blue-400/35 uppercase tracking-[0.15em]">技术工具</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {techSkills.map(s => (
                <motion.span
                  key={s}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-3.5 py-1.5 rounded-lg border border-white/[0.06] text-[13px] text-white/45 bg-white/[0.02] hover:bg-blue-400/[0.06] hover:text-blue-300/70 hover:border-blue-400/15 transition-all duration-300 cursor-default"
                >
                  {s}
                </motion.span>
              ))}
            </div>
            {/* Animated accent bar */}
            <div className="mt-6 h-px bg-white/[0.04] group-hover:bg-gradient-to-r group-hover:from-blue-400/20 group-hover:to-transparent transition-all duration-700" />
          </SpotlightCard>

          {/* Soft Skills */}
          <SpotlightCard className="p-7" spotlightColor="rgba(139,92,246,0.08)">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-violet-500/[0.08] border border-violet-400/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-violet-300/50" />
              </div>
              <span className="text-[11px] font-semibold text-violet-400/35 uppercase tracking-[0.15em]">专业能力</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {softSkills.map(s => (
                <motion.span
                  key={s}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-3.5 py-1.5 rounded-lg border border-white/[0.06] text-[13px] text-white/45 bg-white/[0.02] hover:bg-violet-400/[0.06] hover:text-violet-300/70 hover:border-violet-400/15 transition-all duration-300 cursor-default"
                >
                  {s}
                </motion.span>
              ))}
            </div>
            <div className="mt-6 h-px bg-white/[0.04] group-hover:bg-gradient-to-r group-hover:from-violet-400/20 group-hover:to-transparent transition-all duration-700" />
          </SpotlightCard>

          {/* AI Tools Chain */}
          <SpotlightCard className="p-7 md:col-span-3" spotlightColor="rgba(34,211,238,0.06)">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/[0.08] border border-cyan-400/10 flex items-center justify-center">
                <Brain className="w-4 h-4 text-cyan-300/50" />
              </div>
              <span className="text-[11px] font-semibold text-cyan-400/35 uppercase tracking-[0.15em]">AI 工具链</span>
            </div>
            <div className="flex flex-wrap gap-5">
              {[
                { name: 'Claude Code', desc: 'AI编程助手', icon: Terminal, color: 'blue' },
                { name: 'Codex CLI', desc: '命令行编程工具', icon: Code2, color: 'violet' },
                { name: 'WorkBuddy', desc: '多Agent AI工作台', icon: Brain, color: 'cyan' },
              ].map(tool => (
                <motion.div
                  key={tool.name}
                  whileHover={{ scale: 1.04, y: -3 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex items-center gap-4 group cursor-default"
                >
                  <div className={`w-10 h-10 rounded-xl bg-${tool.color}-500/[0.07] border border-${tool.color}-400/10 flex items-center justify-center group-hover:bg-${tool.color}-500/[0.14] transition-all duration-300`}>
                    <tool.icon className={`w-4.5 h-4.5 text-${tool.color}-300/50 group-hover:text-${tool.color}-300/80 transition-colors duration-300`} />
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-white/60 group-hover:text-white/85 transition-colors duration-300">{tool.name}</div>
                    <div className="text-[11px] text-white/20 group-hover:text-white/35 transition-colors duration-300">{tool.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════
   Awards — Grid cards with hover expand
   ═══════════════════════════════════════ */
function Awards() {
  return (
    <section id="荣誉" className="py-28 px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="Awards" title="竞赛荣誉 · 累计15+项省/国级" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {awards.map((award, i) => (
            <Reveal key={award.title} delay={i * 60}>
              <SpotlightCard className="p-6" spotlightColor="rgba(59,130,246,0.06)">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/[0.06] border border-blue-400/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/[0.12] transition-all duration-500">
                    <award.icon className="w-4 h-4 text-blue-300/40 group-hover:text-blue-300/70 transition-colors duration-500" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[14px] font-semibold text-white/70 group-hover:text-white/90 transition-colors duration-300 leading-snug">{award.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[11px] font-semibold text-blue-400/50 bg-blue-400/[0.06] px-2 py-0.5 rounded-md">{award.level}</span>
                    </div>
                    {/* Animated bar */}
                    <div className="mt-4 h-px w-8 bg-white/[0.06] group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-blue-400/25 group-hover:via-violet-400/15 group-hover:to-transparent transition-all duration-700 rounded-full" />
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════
   Projects — SpotlightCards with gradients
   ═══════════════════════════════════════ */
function Projects() {
  return (
    <section id="项目" className="py-28 px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="Projects" title="项目经历" />
        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <SpotlightCard className="h-full" spotlightColor={p.gradient.includes('blue') ? 'rgba(59,130,246,0.1)' : p.gradient.includes('violet') ? 'rgba(139,92,246,0.1)' : 'rgba(34,211,238,0.1)'}>
                {/* Gradient bg */}
                <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl`} />

                <div className="relative z-10 p-7 flex flex-col h-full">
                  <span className="text-[10px] font-semibold text-blue-400/50 bg-blue-400/[0.06] px-2.5 py-1 rounded-md self-start uppercase tracking-wider">{p.tag}</span>
                  <h3 className="text-[17px] font-bold text-white/80 mt-4 mb-2.5 group-hover:text-white transition-colors duration-300">{p.title}</h3>
                  <p className="text-[13px] text-white/30 leading-relaxed flex-1 group-hover:text-white/45 transition-colors duration-300">{p.desc}</p>

                  {/* Bottom action */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.04]">
                    <span className="text-[10px] font-mono text-white/15 tracking-widest uppercase">Project</span>
                    <motion.span
                      className="text-white/20 group-hover:text-white/50 text-[12px] inline-flex items-center gap-1 transition-colors duration-300"
                      whileHover={{ x: 4 }}
                    >
                      查看详情 <ArrowUpRight className="w-3 h-3" />
                    </motion.span>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════
   Education
   ═══════════════════════════════════════ */
function Education() {
  return (
    <section className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="rounded-2xl border border-white/[0.04] bg-white/[0.01] p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
              <span className="text-[13px] text-white/25 font-mono shrink-0 md:w-48">2024.9 - 2028.6</span>
              <div>
                <h3 className="text-[16px] font-semibold text-white/80">山东财经大学 · 工商管理学院 · 市场营销</h3>
                <p className="text-[13px] text-white/25 mt-2 leading-relaxed">核心课程：市场营销学、人力资源、品牌数智化、管理学、宏观经济、数据分析、MySQL</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════
   Contact CTA
   ═══════════════════════════════════════ */
function Contact() {
  return (
    <section id="联系" className="py-28 px-8">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center py-20">
            <p className="text-[14px] text-white/30 mb-5 tracking-wide">正在寻找HR招聘方向的实习机会</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white/90 mb-10 tracking-tight">
              期待与您的
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-violet-400 bg-clip-text text-transparent">交流</span>
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.a
                href="mailto:1171322585@qq.com"
                whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(59,130,246,0.25)' }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-[14px] font-semibold rounded-full transition-all"
              >
                <Mail className="w-4 h-4" /> 发送邮件
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
              <motion.a
                href="tel:13810310476"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-white/10 text-white/60 text-[14px] font-medium rounded-full hover:border-blue-400/25 hover:text-blue-300/80 hover:bg-blue-400/[0.03] transition-all duration-300"
              >
                <Phone className="w-4 h-4" /> 电话联系
              </motion.a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════
   Footer
   ═══════════════════════════════════════ */
function Footer() {
  return (
    <footer className="border-t border-white/[0.03] py-8 px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="text-[12px] text-white/15">&copy; 2025 马英航</span>
        <span className="text-[12px] text-white/10">
          Built with <span className="text-blue-400/25">React</span> + <span className="text-violet-400/25">Tailwind</span> + <span className="text-cyan-400/25">Framer Motion</span>
        </span>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════
   App
   ═══════════════════════════════════════ */
export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white/80">
      <NoiseOverlay />
      <Nav />
      <Hero />
      <Experience />
      <Skills />
      <Awards />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </div>
  )
}

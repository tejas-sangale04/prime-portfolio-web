# RGB Animation & Theme Guide

## 🎨 RGB Gradient Theme

This portfolio uses a vibrant RGB gradient color scheme with full animation libraries.

### Color Palette
- **Primary**: Electric Blue (`#3b82f6`)
- **RGB Colors**:
  - Red: `#ef4444`
  - Yellow: `#f59e0b`
  - Green: `#10b981`
  - Cyan: `#06b6d4`
  - Blue: `#3b82f6`
  - Purple: `#a855f7`
  - Pink: `#ec4899`
- **Background**: Deep Dark (`#0a0a0f`)
- **Destructive**: Red (`#ef4444`)

### Using Theme Colors in Tailwind

```tsx
// RGB Text colors
<h1 className="text-rgb-blue">Blue Text</h1>
<p className="text-rgb-green">Green Text</p>
<span className="text-rgb-purple">Purple Text</span>

// RGB Background colors
<div className="bg-rgb-red">Red Background</div>
<div className="bg-rgb-cyan">Cyan Background</div>

// RGB Border colors
<div className="border-rgb-pink">Pink Border</div>
```

## 📦 Installed Animation Libraries

- **Framer Motion** - Production-ready React animation library
- **React Intersection Observer** - Trigger animations on scroll
- **React Spring** - Physics-based animations
- **GSAP** - Professional animation toolkit

## ✨ RGB Custom Utilities

### RGB Gradient Text
```tsx
<h1 className="rgb-gradient-text">
  Full spectrum rainbow gradient text
</h1>
```

### Glow Text (Animated RGB)
```tsx
<h1 className="glow-text">
  Animated multi-color gradient text
</h1>
```

### RGB Border
```tsx
<div className="rgb-border">
  Animated rainbow border
</div>
```

### RGB Glow
```tsx
<div className="rgb-glow">
  Multi-color pulsing glow effect
</div>
```

### RGB Aurora Background
```tsx
<section className="rgb-aurora">
  Four-color animated aurora background
</section>
```

## 🎬 React Animation Components

### Animated Text Component
```tsx
import { AnimatedText, RGBGradientText, GlowText } from "@/components/site/animated-text";

// Stagger animation per word
<AnimatedText 
  text="Welcome to my portfolio" 
  className="text-4xl font-bold"
  delay={0.2}
/>

// RGB gradient animated text
<RGBGradientText className="text-5xl font-bold">
  Rainbow Text
</RGBGradientText>

// Glow effect text
<GlowText className="text-6xl font-bold">
  Glowing Text
</GlowText>
```

### Animated Card Component
```tsx
import { AnimatedCard, RGBCard, GlowCard } from "@/components/site/animated-card";

// Multiple animation variants
<AnimatedCard variant="slide" delay={0.1}>
  <h3>Card Content</h3>
</AnimatedCard>

<AnimatedCard variant="scale" delay={0.2}>
  <p>Scales in</p>
</AnimatedCard>

<AnimatedCard variant="flip" delay={0.3}>
  <p>Flips in</p>
</AnimatedCard>

// RGB gradient border card
<RGBCard>
  <h3>Project Title</h3>
  <p>Description</p>
</RGBCard>

// Multi-color glowing card
<GlowCard>
  <h3>Spotlight Effect</h3>
</GlowCard>
```

### Animated Badge
```tsx
import { AnimatedBadge } from "@/components/site/animated-card";

<div className="flex gap-2">
  <AnimatedBadge delay={0}>React</AnimatedBadge>
  <AnimatedBadge delay={0.1}>TypeScript</AnimatedBadge>
  <AnimatedBadge delay={0.2}>Tailwind</AnimatedBadge>
</div>
```

### Button Components
```tsx
import { 
  AnimatedButton, 
  RGBButton, 
  GlowButton, 
  PulseButton 
} from "@/components/site/animated-button";

// Standard animated button
<AnimatedButton variant="primary" onClick={() => {}}>
  Click Me
</AnimatedButton>

// RGB gradient flowing button
<RGBButton onClick={() => {}}>
  Rainbow Button
</RGBButton>

// Glow pulsing button
<GlowButton onClick={() => {}}>
  Glowing Button
</GlowButton>

// Pulse effect button
<PulseButton onClick={() => {}}>
  Pulse Button
</PulseButton>
```

### RGB Effects Components
```tsx
import { 
  RGBAurora, 
  FloatingRGBOrbs, 
  RGBTypingEffect,
  ParticleField,
  RGBProgressBar,
  RGBSpinner,
  WaveText
} from "@/components/site/rgb-effects";

// Aurora background wrapper
<RGBAurora>
  <h1>Content with RGB aurora</h1>
</RGBAurora>

// Floating colored orbs
<div className="relative">
  <FloatingRGBOrbs />
  <YourContent />
</div>

// Typing animation with gradient
<RGBTypingEffect 
  text="Software Engineer | Full Stack Developer" 
  className="text-2xl"
/>

// Particle field effect
<div className="relative">
  <ParticleField />
  <YourContent />
</div>

// RGB progress bar
<RGBProgressBar progress={75} className="w-full" />

// RGB loading spinner
<RGBSpinner size={50} />

// Wave text animation
<WaveText text="Hello World" className="text-4xl font-bold" />
```

## ✨ Custom Animation Utilities

### Glass Morphism
```tsx
<div className="glass">
  Glassmorphism card with backdrop blur
</div>
```

### Gradient Text
```tsx
<h1 className="glow-text">
  Gradient text with primary colors
</h1>
```

### Reveal on Scroll
```tsx
<div className="reveal" data-visible="true">
  Fades in from bottom when visible
</div>
```

### Animated Gradient Border
```tsx
<div className="gradient-border">
  Rotating gradient border animation
</div>
```

### Shine Effect
```tsx
<div className="shine">
  Periodic light sweep across element
</div>
```

### Text Glow Animation
```tsx
<h1 className="text-glow">
  Pulsing glow effect on text
</h1>
```

### Aurora Background
```tsx
<section className="aurora-bg">
  Animated gradient background
</section>
```

### Cyberpunk Glow
```tsx
<div className="cyberpunk-glow">
  Neon glow with hover enhancement
</div>
```

### Neon Border
```tsx
<div className="neon-border">
  Animated neon border pulse
</div>
```

### Holographic Effect
```tsx
<div className="holographic">
  Shifting holographic colors
</div>
```

### Pulse Glow
```tsx
<div className="pulse-glow">
  Gentle pulsing glow animation
</div>
```

### Noise Overlay
```tsx
<div className="noise-overlay">
  Subtle noise texture overlay
</div>
```

### Magnetic Hover
```tsx
<button className="magnetic-hover">
  Lifts up on hover
</button>
```

### Spotlight Effect
```tsx
<div className="spotlight">
  Interactive spotlight follows cursor
</div>
```

### Glitch Effect
```tsx
<h1 className="glitch" data-text="Glitch Text">
  Glitch Text
</h1>
```

## 🎬 Tailwind Animation Classes

### Entrance Animations

```tsx
// Slide from bottom
<div className="animate-slide-in-bottom">Content</div>

// Slide from top
<div className="animate-slide-in-top">Content</div>

// Slide from left
<div className="animate-slide-in-left">Content</div>

// Slide from right
<div className="animate-slide-in-right">Content</div>

// Scale in
<div className="animate-scale-in">Content</div>

// Fade in
<div className="animate-fade-in">Content</div>

// Bounce in
<div className="animate-bounce-in">Content</div>

// Rotate in
<div className="animate-rotate-in">Content</div>

// Flip in
<div className="animate-flip-in">Content</div>
```

### Continuous Animations

```tsx
// Floating orb
<div className="animate-float-orb">Floating Element</div>

// Gradient rotation
<div className="animate-gradient-rotate">Rotating Gradient</div>

// Shine sweep
<div className="animate-shine-sweep">Shining Element</div>

// Text pulse glow
<h1 className="animate-text-pulse-glow">Glowing Text</h1>

// Aurora shift
<div className="animate-aurora-shift">Aurora Background</div>

// Neon pulse
<div className="animate-neon-pulse">Neon Element</div>

// Holographic shift
<div className="animate-holographic-shift">Holographic Effect</div>

// Pulse glow
<div className="animate-pulse-glow">Pulsing Glow</div>

// Blinking caret
<span className="animate-blink-caret">|</span>
```

## 🎯 Animation Delay & Duration

Combine with Tailwind utilities:

```tsx
// Delay animation
<div className="animate-slide-in-bottom delay-100">Content</div>
<div className="animate-fade-in delay-300">Content</div>

// Custom duration
<div className="animate-pulse-glow duration-1000">Content</div>

// Animation play state
<div className="animate-float-orb hover:animation-pause">Content</div>
```

## 🔄 Stagger Multiple Elements

```tsx
{items.map((item, index) => (
  <div
    key={item.id}
    className="animate-slide-in-bottom"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    {item.content}
  </div>
))}
```

## 🎨 Combining Effects

```tsx
// Glass card with gradient border and hover effects
<div className="glass gradient-border magnetic-hover spotlight">
  <h2 className="glow-text">Amazing Card</h2>
  <p className="text-muted-foreground">With multiple effects</p>
</div>

// Cyberpunk button
<button className="bg-primary text-primary-foreground cyberpunk-glow shine">
  Click Me
</button>

// Holographic card with entrance animation
<div className="holographic neon-border animate-scale-in">
  <h3>Holographic Card</h3>
</div>
```

## 🎪 Complete Example Sections

### Hero Section with RGB Effects
```tsx
import { RGBAurora, FloatingRGBOrbs } from "@/components/site/rgb-effects";
import { RGBGradientText } from "@/components/site/animated-text";
import { RGBButton } from "@/components/site/animated-button";

<section className="relative min-h-screen flex items-center justify-center">
  <RGBAurora className="absolute inset-0">
    <FloatingRGBOrbs />
  </RGBAurora>
  
  <div className="relative z-10 text-center">
    <RGBGradientText className="text-7xl font-bold mb-4">
      John Doe
    </RGBGradientText>
    <RGBTypingEffect 
      text="Software Engineer | Full Stack Developer" 
      className="text-2xl mb-8"
    />
    <div className="flex gap-4 justify-center">
      <RGBButton onClick={() => {}}>View Projects</RGBButton>
      <GlowButton onClick={() => {}}>Contact Me</GlowButton>
    </div>
  </div>
</section>
```

### Projects Section with Animated Cards
```tsx
import { AnimatedCard, RGBCard } from "@/components/site/animated-card";
import { AnimatedBadge } from "@/components/site/animated-card";

<section className="py-20 px-4">
  <AnimatedText text="My Projects" className="text-5xl font-bold text-center mb-12" />
  
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {projects.map((project, i) => (
      <RGBCard key={project.id}>
        <div className="shine">
          <img src={project.image} alt={project.title} className="rounded-lg" />
        </div>
        <h3 className="text-2xl font-bold mt-4 glow-text">{project.title}</h3>
        <p className="text-muted-foreground mt-2">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.technologies.map((tech, j) => (
            <AnimatedBadge key={tech} delay={i * 0.1 + j * 0.05}>
              {tech}
            </AnimatedBadge>
          ))}
        </div>
      </RGBCard>
    ))}
  </div>
</section>
```

### Skills Section with Progress Bars
```tsx
import { AnimatedCard } from "@/components/site/animated-card";
import { RGBProgressBar } from "@/components/site/rgb-effects";

<section className="py-20 px-4">
  <AnimatedText text="Skills" className="text-5xl font-bold text-center mb-12" />
  
  <div className="max-w-4xl mx-auto space-y-6">
    {skills.map((skill, i) => (
      <AnimatedCard key={skill.name} variant="slide" delay={i * 0.1}>
        <div className="glass p-6 rounded-xl">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">{skill.name}</span>
            <span className="text-muted-foreground">{skill.level}%</span>
          </div>
          <RGBProgressBar progress={skill.level} />
        </div>
      </AnimatedCard>
    ))}
  </div>
</section>
```

### Contact Section
```tsx
import { GlowCard } from "@/components/site/animated-card";
import { AnimatedButton } from "@/components/site/animated-button";

<section className="py-20 px-4 rgb-aurora">
  <div className="max-w-2xl mx-auto">
    <GlowCard>
      <h2 className="text-4xl font-bold mb-6 rgb-gradient-text">Get In Touch</h2>
      <form className="space-y-4">
        <input 
          type="text" 
          placeholder="Name" 
          className="w-full p-3 rounded-lg bg-muted border border-border"
        />
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-3 rounded-lg bg-muted border border-border"
        />
        <textarea 
          placeholder="Message" 
          rows={5}
          className="w-full p-3 rounded-lg bg-muted border border-border"
        />
        <AnimatedButton variant="rgb" className="w-full">
          Send Message
        </AnimatedButton>
      </form>
    </GlowCard>
  </div>
</section>
```

## 🎮 Interactive Elements

```tsx
// Glitch effect on hover
<h1 
  className="glitch" 
  data-text="Portfolio"
  onMouseEnter={(e) => e.currentTarget.classList.add('animate-glitch-1')}
>
  Portfolio
</h1>

// Spotlight that follows mouse
<div 
  className="spotlight"
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }}
>
  Content
</div>
```

## 📱 Responsive Considerations

```tsx
// Reduce animations on mobile
<div className="animate-float-orb md:animate-none">
  Mobile-friendly content
</div>

// Stronger effects on desktop
<div className="cyberpunk-glow md:animate-neon-pulse">
  Desktop enhancement
</div>
```

## ♿ Accessibility

All animations respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```

Users with motion sensitivity will see minimal animation while maintaining all functionality.

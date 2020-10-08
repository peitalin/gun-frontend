
const easingOutQuint = (x, t, b, c, d) =>
  c * ((t = t / d - 1) * t * t * t * t + 1) + b

const smoothScrollPolyfill = (node, key, target) => {
  const startTime = Date.now()
  const offset = node[key]
  const gap = target - offset
  const duration = 500
  let interrupt = false

  const step = () => {
    const elapsed = Date.now() - startTime
    const percentage = elapsed / duration

    if (interrupt) {
      return
    }

    if (percentage > 1) {
      cleanup()
      return
    }

    node[key] = easingOutQuint(0, elapsed, offset, gap, duration)
    requestAnimationFrame(step)
  }

  const cancel = () => {
    interrupt = true
    cleanup()
  }

  const cleanup = () => {
    node.removeEventListener('wheel', cancel)
    node.removeEventListener('touchstart', cancel)
  }

  node.addEventListener('wheel', cancel, { passive: true })
  node.addEventListener('touchstart', cancel, { passive: true })

  step()

  return cancel
}

const hasNativeSmoothScroll = () => {
  let supports = false
  try {
    let div = document.createElement('div')
    div.scrollTo({
      top: 0,
      get behavior () {
        supports = true
        return 'smooth' as ScrollBehavior
      }
    })
  } catch (err) {} // Edge throws an error
  return supports
}

export const smoothScroll = (node: Element) => (by: number) => {
  let hasScroll = hasNativeSmoothScroll()
  if (hasScroll) {
    return node.scrollTo({
      "left": by,
      behavior: 'smooth'
    })
  } else {
    return smoothScrollPolyfill(node, 'scrollLeft', by)
  }
}
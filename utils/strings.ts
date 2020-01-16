
export const toCamelCase = (s: string): string => {
  return s.replace(/(\_\w)/g, (w) => w[1].toUpperCase())
}

export const objectToCamelCase = <T>(row: T): T => {
  // Mutates keys to camelCase keys
  Object.keys(row).map(key => {
    let camelKey = toCamelCase(key);
    if (camelKey !== key) {
      row[camelKey] = row[key];
      delete row[key];
    }
  });
  return row;
}

export const rowsToCamelCase = <T>(rows: T[]): T[] => {
  // Renames all keys in an array of objects as camelCase
  return rows.map(row => objectToCamelCase(row));
}

export const setEquals = <T>(set1: Set<T>, set2: Set<T>): boolean => {
  if (set1.size !== set2.size) {
    return false
  }
  for (var a of set1) {
    if (!set2.has(a)) {
      return false;
    }
  }
  return true
}

export const getYouTubeVimeoImagePreview = (youTubeVimeoEmbedLink: string): string => {
  if (youTubeVimeoEmbedLink && youTubeVimeoEmbedLink.includes('youtube.com')) {
    let videoId = youTubeVimeoEmbedLink.split('v=').pop()
    return `https://img.youtube.com/vi/${videoId}/0.jpg`
    // https://img.youtube.com/vi/[video-id]/[thumbnail-number].jpg
  } else if (youTubeVimeoEmbedLink && youTubeVimeoEmbedLink.includes('vimeo.com')) {
    let videoId = youTubeVimeoEmbedLink.split('/').pop()
    return `https://i.vimeocdn.com/video/${videoId}.jpg`
    // https://i.vimeocdn.com/video/288596286.jpg
  } else {
    return ""
  }
}

export const generateYouTubeVimeoEmbedLink = (videoUrl: string): string => {

  if (videoUrl.includes('youtube.com/watch?v=')) {
    videoUrl = videoUrl.split('v=').pop()
    return `https://www.youtube.com/embed/${videoUrl}`
      + "?autoplay=false"
      + "&rel=false"
      + "&modestbranding=1"
      + "&playsinline=1"
      + "&enablejsapi=1"
      + "&color=white"

  } else if (videoUrl.includes("youtube.com/embed")) {
    return videoUrl

  } else if (videoUrl.includes('vimeo.com')) {
    // Vimeo
    return `https://player.vimeo.com/video/${videoUrl.split('/').pop()}`;

  } else {
    console.warn("Not a YouTube or Vimeo link")
    return videoUrl

  }
}


export const trimTitle = (title: string, maxLength?: number) => {
  if (!title) {
    return ""
  }
  const mlength = maxLength || 48;
  return title.length > mlength
    ? title.slice(0, mlength) + '...'
    : title
}
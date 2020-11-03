import { Product, Store } from "typings/gqlTypes";
import { oc as option } from "ts-optchain";


export const isYouTubeVimeoLink = (link: string) => {

  // console.log('YouTubeVimeo link: ', link)
  if (!link) {
    return false
  }

  if (
    !link.includes("youtube.com") &&
    !link.includes("youtu.be") &&
    !link.includes("vimeo.com")
  ) {
    console.log(`not a YouTube or Vimeo link: ${link}`)
    return false
  } else {
    return true
  }
}


export const extractYoutubePreview = ({
  videoUrl,
  autoplay,
  rel,
  modest,
}: {
  videoUrl: string,
  autoplay: boolean,
  rel: boolean,
  modest: number | boolean,
}) => {

  let videoSrc = "";
  let videoId = extractYoutubeVimeoId(videoUrl);

  // Youtube
  if (
    videoUrl.includes('youtube.com/watch?v=') ||
    videoUrl.includes('youtu.be')
  ) {
    videoSrc = `https://www.youtube.com/embed/${videoId}`
      + "?autoplay=" + autoplay
      + "&rel=" + rel
      + "&modestbranding=" + modest
      + "&color=white"
  }

  // Vimeo
  if (videoUrl.includes('vimeo.com')) {
    videoSrc = `https://player.vimeo.com/video/${videoId}`;
  }

  return videoSrc
}


export const extractYoutubeVimeoId = (videoUrl: string) => {
  if (videoUrl.includes("watch?v=")) {
    // this needs to be above "youtu.be" for links like:
    // https://www.youtube.com/watch?v=BPzqTaSjbRg&feature=youtu.be
    //
    // which will return:
    // ERROR:
    // https://img.youtube.com/vi/watch?v=BPzqTaSjbRg&feature=youtu.be/0.jpg
    // CORRECT VERSION:
    // https://img.youtube.com/vi/BPzqTaSjbRg/0.jpg
    return videoUrl.split("?v=").pop().split('&')[0]
  } else if (videoUrl.includes("youtu.be")) {
    return videoUrl.split("/").pop().split('&')[0]
  } else if (videoUrl.includes('vimeo.com')) {
    return videoUrl.split("/").pop().split('&')[0]
  } else {
    return ""
  }
}


export const generateYouTubeVimeoEmbedLink = (videoUrl: string): string => {

  let videoId = extractYoutubeVimeoId(videoUrl);

  if (
    videoUrl.includes('youtube.com/watch?v=') ||
    videoUrl.includes('youtu.be')
  ) {
    return `https://www.youtube.com/embed/${videoId}`
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
    return `https://player.vimeo.com/video/${videoId}`;

  } else {
    console.warn("Not a YouTube or Vimeo link")
    return videoUrl

  }
}


export const getYouTubeVimeoImagePreview = (youTubeVimeoEmbedLink: string): string => {

  let ylink = youTubeVimeoEmbedLink;
  // console.log("ylink: ", ylink)

  if (
    ylink && ylink.includes('youtube.com') ||
    ylink && ylink.includes('youtu.be')
  ) {
    if (ylink.includes("?v=")) {
      let videoId = extractYoutubeVimeoId(ylink);
      return `https://img.youtube.com/vi/${videoId}/0.jpg`

    } else if (
      ylink.includes('/embed/')
      && !ylink.includes("?")
    ) {
      let videoId = extractYoutubeVimeoId(ylink);
      return `https://img.youtube.com/vi/${videoId}/0.jpg`

    } else if (ylink.includes('youtu.be')) {
      let videoId = extractYoutubeVimeoId(ylink);
      return `https://img.youtube.com/vi/${videoId}/0.jpg`

    } else {
      console.log("unknown youtube link format: ", ylink)
      // let vSplit = ylink.split('/');
      // let imageJpg = vSplit.pop();
      // let videoId = vSplit.pop()
      let videoId = extractYoutubeVimeoId(ylink);
      return `https://img.youtube.com/vi/${videoId}/0.jpg`
    }
    // https://img.youtube.com/vi/[video-id]/[thumbnail-number].jpg

  } else if (ylink && ylink.includes('vimeo.com')) {
    let videoId = extractYoutubeVimeoId(ylink);
    return `https://i.vimeocdn.com/video/${videoId}.jpg`
    // https://i.vimeocdn.com/video/288596286.jpg
  } else {
    return ""
  }
}

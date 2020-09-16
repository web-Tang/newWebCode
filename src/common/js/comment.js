

export function commentItem(avatar, username, content, time) {
  let item = {}

  item.avatar = avatar
  item.username = username
  item.contentitem = content
  item.time = time

  return item
}

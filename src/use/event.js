import EventEmitter from 'eventemitter3'

const event = new EventEmitter()
event.success = data => {
  if (typeof data == 'string') data = {type: 'success', text: data}
  event.emit('alert', data)
}
event.warning = data => {
  if (typeof data == 'string') data = {type: 'warning', text: data}
  if (data.type != 'warning') data.type = 'warning'
  event.emit('alert', data)
}
event.error = data => {
  if (typeof data == 'string') data = {type: 'error', text: data}
  else if (data.message || data instanceof Error) data = {error: data}
  else data = {type: 'error', ...data}
  return event.emit('alert', data)
}

export function useEvent() {
  return event
}
import { Buffer } from 'node:buffer';

const toBase64 = (bytes) => Buffer.from(bytes).toString('base64');

const guessMimeType = (value) => {
  if (!value) return 'application/octet-stream';

  if (typeof value.type === 'string' && value.type.length > 0) {
    return value.type;
  }

  if (typeof value.mimeType === 'string' && value.mimeType.length > 0) {
    return value.mimeType;
  }

  if (typeof value.mimetype === 'string' && value.mimetype.length > 0) {
    return value.mimetype;
  }

  return 'application/octet-stream';
};

const normalizeToDataUri = async (value) => {
  if (typeof value === 'string') {
    if (value.startsWith('data:')) {
      return value;
    }

    return value;
  }

  if (value instanceof ArrayBuffer) {
    const base64 = toBase64(new Uint8Array(value));
    return `data:application/octet-stream;base64,${base64}`;
  }

  if (ArrayBuffer.isView(value)) {
    const base64 = toBase64(value);
    return `data:application/octet-stream;base64,${base64}`;
  }

  if (value && typeof value.arrayBuffer === 'function') {
    const mimeType = guessMimeType(value);
    const arrayBuffer = await value.arrayBuffer();
    const base64 = toBase64(new Uint8Array(arrayBuffer));
    return `data:${mimeType};base64,${base64}`;
  }

  if (value && typeof value === 'object') {
    const maybeBase64 = value.base64 ?? value.data ?? value.buffer;
    if (typeof maybeBase64 === 'string' && maybeBase64.length > 0) {
      if (maybeBase64.startsWith('data:')) {
        return maybeBase64;
      }

      const mimeType = guessMimeType(value);
      return `data:${mimeType};base64,${maybeBase64}`;
    }

    const maybeBytes = value.bytes ?? value.byteArray;
    if (maybeBytes && ArrayBuffer.isView(maybeBytes)) {
      const mimeType = guessMimeType(value);
      const base64 = toBase64(maybeBytes);
      return `data:${mimeType};base64,${base64}`;
    }

    if (maybeBytes instanceof ArrayBuffer) {
      const mimeType = guessMimeType(value);
      const base64 = toBase64(new Uint8Array(maybeBytes));
      return `data:${mimeType};base64,${base64}`;
    }
  }

  return value;
};

export const avatarToDataUri = (field = 'avatar') => {
  return async (context) => {
    const data = context.data;
    if (!data || typeof data !== 'object') {
      return context;
    }

    if (!(field in data)) {
      return context;
    }

    const current = data[field];
    if (current === undefined || current === null) {
      return context;
    }

    data[field] = await normalizeToDataUri(current);

    return context;
  };
};

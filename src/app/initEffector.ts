// lib/initEffector.ts
import { fork, serialize, Scope } from 'effector';

let clientScope: Scope;

export function initializeEffectorScope(initialData = {}) {
  // Проверяем, выполняется ли на стороне сервера или клиента
  const isServer = typeof window === 'undefined';

  if (isServer) {
    // Создаем новый scope для каждого запроса на сервере
    return fork({ values: initialData });
  } else {
    // Используем один и тот же scope на клиенте
    if (!clientScope) {
      clientScope = fork({ values: initialData });
    }
    return clientScope;
  }
}

export function serializeEffectorScope(scope: Scope) {
  return serialize(scope);
}

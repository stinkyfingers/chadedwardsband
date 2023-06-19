const key = 'session';

const useSession = () => {
	const session = localStorage.getItem(key) || Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  localStorage.setItem(key, session);
  return session;
};

export default useSession;

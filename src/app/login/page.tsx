'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { setToken } from '@/lib/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    setToken(email);
    router.push('/products');
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <h2 className="text-xl font-semibold mb-3">Connexion</h2>
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="label">Email</label>
            <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div>
            <label className="label">Mot de passe</label>
            <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button className="btn btn-primary" type="submit">Se connecter</button>
        </form>
      </div>
      <div className="card text-sm text-gray-600 dark:text-gray-300">
        Auth façade (pas d’API). Ajoutez une redirection automatique si pas de token pour /products, /orders, /metrics.
      </div>
    </div>
  );
}
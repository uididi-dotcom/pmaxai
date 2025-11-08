-- Criar tabela de perfis de usuários
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  nome text,
  plano text default 'free' check (plano in ('free', 'mensal', 'trimestral')),
  data_criacao timestamp with time zone default now(),
  data_atualizacao timestamp with time zone default now()
);

-- Criar tabela de campanhas
create table if not exists public.campanhas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  nome text not null,
  objetivo text not null,
  tipo_campanha text not null,
  redes jsonb,
  locais jsonb,
  idiomas jsonb,
  metrica_lance text,
  cpa_desejado numeric,
  palavras_chave jsonb,
  url_final text,
  produtos_servicos text,
  titulos jsonb,
  descricoes jsonb,
  sitelinks jsonb,
  data_criacao timestamp with time zone default now()
);

-- Habilitar RLS
alter table public.profiles enable row level security;
alter table public.campanhas enable row level security;

-- Políticas RLS para profiles
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "profiles_delete_own"
  on public.profiles for delete
  using (auth.uid() = id);

-- Políticas RLS para campanhas
create policy "campanhas_select_own"
  on public.campanhas for select
  using (auth.uid() = user_id);

create policy "campanhas_insert_own"
  on public.campanhas for insert
  with check (auth.uid() = user_id);

create policy "campanhas_update_own"
  on public.campanhas for update
  using (auth.uid() = user_id);

create policy "campanhas_delete_own"
  on public.campanhas for delete
  using (auth.uid() = user_id);

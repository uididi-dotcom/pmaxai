-- Adicionar novos campos para a tabela de campanhas
alter table public.campanhas 
  add column if not exists insights jsonb,
  add column if not exists segmentos_publico jsonb,
  add column if not exists configuracao_segmentacao jsonb,
  add column if not exists caminho_exibicao text,
  add column if not exists frases_destaque jsonb,
  add column if not exists snippets_estruturados jsonb,
  add column if not exists aquisicao_cliente text,
  add column if not exists justificativa_lance text;

-- Atualizar comentários das colunas
comment on column public.campanhas.insights is 'Insights gerados pela IA sobre a campanha';
comment on column public.campanhas.segmentos_publico is 'Segmentos de público-alvo detalhados';
comment on column public.campanhas.configuracao_segmentacao is 'Configurações de segmentação da campanha';
comment on column public.campanhas.caminho_exibicao is 'Caminho de exibição do anúncio';
comment on column public.campanhas.frases_destaque is 'Frases de destaque para o anúncio';
comment on column public.campanhas.snippets_estruturados is 'Snippets estruturados do anúncio';
comment on column public.campanhas.aquisicao_cliente is 'Estratégia de aquisição de cliente';
comment on column public.campanhas.justificativa_lance is 'Justificativa da métrica de lance escolhida';

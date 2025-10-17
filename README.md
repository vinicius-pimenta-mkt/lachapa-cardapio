# La Chapa - Cardápio Digital

Cardápio digital moderno e responsivo para a La Chapa Hamburgueria, desenvolvido com React, Tailwind CSS e shadcn/ui.

## 🚀 Características

- **Layout Responsivo**: Design inspirado no menu.brendi.com.br com imagens ao lado dos itens
- **Carrinho de Compras**: Sistema completo de carrinho com gerenciamento de quantidades
- **Adicionais Personalizáveis**: Seleção de adicionais para cada produto (exceto bebidas)
- **Observações**: Campo para observações especiais em cada pedido
- **Busca**: Sistema de busca por nome ou descrição dos produtos
- **Cores Modernas**: Preços em verde claro (#22c55e) e tema vermelho (#C41E3A) do La Chapa

## 📦 Tecnologias

- React 18
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide Icons

## 🛠️ Instalação

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm run dev

# Build para produção
pnpm run build
```

## 📱 Estrutura do Projeto

```
lachapa-menu-novo/
├── src/
│   ├── assets/
│   │   └── images/          # Imagens dos produtos
│   ├── components/
│   │   ├── ui/              # Componentes shadcn/ui
│   │   └── ProductDialog.jsx # Diálogo de produto com adicionais
│   ├── lib/
│   │   └── menuData.js      # Dados do cardápio
│   ├── App.jsx              # Componente principal
│   └── App.css              # Estilos globais
├── public/
└── package.json
```

## 🎨 Funcionalidades

### Produtos
- Burgers Artesanais
- Tradicionais
- Passaportes
- Bebidas

### Adicionais Disponíveis
- Molho Barbecue (R$ 3,00)
- Cheddar (R$ 3,00)
- Catupiry (R$ 3,00)
- Presunto (R$ 2,00)
- Mussarela (R$ 2,00)
- Bacon (R$ 3,00)
- Calabresa (R$ 3,00)
- Queijo Coalho (R$ 4,00)
- Azeitona (R$ 2,00)
- Milho (R$ 2,00)
- Ovo (R$ 1,50)

## 📝 Melhorias Implementadas

1. **Layout Horizontal**: Imagens ao lado dos itens em vez de acima
2. **Espaçamento Otimizado**: Margens laterais amplas para melhor legibilidade
3. **Cores Consistentes**: Todos os preços em verde claro (#22c55e)
4. **Responsividade**: Design adaptável para mobile e desktop
5. **Diálogo de Produto**: Interface moderna para seleção de adicionais
6. **Carrinho Lateral**: Sidebar deslizante com resumo do pedido

## 🌟 Diferenciais

- Interface limpa e moderna
- Fácil navegação
- Sistema de busca integrado
- Cálculo automático de totais com adicionais
- Feedback visual em todas as interações
- Transições suaves e animações

## 📄 Licença

Este projeto foi desenvolvido para a La Chapa Hamburgueria.


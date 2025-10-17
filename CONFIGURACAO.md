# Configuração do Cardápio Digital La Chapa

## 📱 Configurar Número do WhatsApp

Para configurar o número do WhatsApp que receberá os pedidos:

1. Abra o arquivo `src/App.jsx`
2. Na linha 12, localize a constante `WHATSAPP_NUMBER`
3. Substitua o número de exemplo pelo número real do restaurante

```javascript
// Formato: código do país + DDD + número (sem espaços, hífens ou parênteses)
const WHATSAPP_NUMBER = '5527999999999'; // Exemplo: 55 27 99999-9999
```

### Formato do Número

- **Brasil**: `55` (código do país) + `27` (DDD) + `999999999` (número com 9 dígitos)
- **Exemplo completo**: `5527999887766`
- **Não use**: espaços, hífens, parênteses ou qualquer outro caractere especial

### Como Obter o Número Correto

1. Pegue o número de WhatsApp do restaurante
2. Remova todos os caracteres especiais (espaços, hífens, parênteses)
3. Adicione o código do país (55 para Brasil) no início
4. O resultado deve ter 13 dígitos (55 + 2 do DDD + 9 do número)

### Exemplo de Conversão

- **Número original**: (27) 99988-7766
- **Número formatado**: 5527999887766

## 🎨 Personalizar Cores

As cores principais do cardápio estão definidas no arquivo `src/App.jsx`:

- **Vermelho principal (header e botões)**: `#C41E3A`
- **Vermelho hover**: `#A01828`
- **Verde (preços)**: `#22c55e`

Para alterar as cores, busque por esses códigos hexadecimais no arquivo e substitua pelos desejados.

## 📦 Instalar e Executar

```bash
# Instalar dependências
pnpm install

# Executar em desenvolvimento
pnpm run dev

# Build para produção
pnpm run build
```

## 🚀 Deploy

Após fazer o build, você pode fazer deploy da pasta `dist` em qualquer serviço de hospedagem estática:

- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## 📝 Atualizar Cardápio

Para adicionar, remover ou editar produtos do cardápio, edite o arquivo `src/lib/menuData.js`.

Cada produto tem a seguinte estrutura:

```javascript
{
  id: 'produto-id',
  name: 'Nome do Produto',
  description: 'Descrição detalhada do produto',
  price: 24.00,
  category: 'burgers-artesanais', // ou 'tradicionais', 'passaportes', 'bebidas'
  image: '/images/produto.png'
}
```

## ⚙️ Funcionalidades

- ✅ Carrinho de compras
- ✅ Adicionais personalizáveis (exceto bebidas)
- ✅ Campo de observações
- ✅ Busca de produtos
- ✅ Envio de pedido pelo WhatsApp
- ✅ Layout responsivo
- ✅ Design moderno e profissional


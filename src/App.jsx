import { useState } from 'react';
import { ShoppingCart, Search, X, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import logoImg from './assets/images/logo.png';
import { categories, products } from './lib/menuData.js';
import { ProductDialog } from './components/ProductDialog.jsx';
import './App.css';

// Número do WhatsApp do restaurante (formato: 5527999999999)
const WHATSAPP_NUMBER = '5528992546359'; // Altere para o número real do restaurante

function App() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addToCart = (productData) => {
    setCart(prevCart => {
      // Para produtos com adicionais, sempre adicionar como novo item
      if (productData.selectedAdditionals && productData.selectedAdditionals.length > 0) {
        return [...prevCart, { ...productData, cartId: Date.now() }];
      }
      
      // Para produtos simples, verificar se já existe
      const existingItem = prevCart.find(item => 
        item.id === productData.id && 
        (!item.selectedAdditionals || item.selectedAdditionals.length === 0)
      );
      
      if (existingItem) {
        return prevCart.map(item =>
          item.cartId === existingItem.cartId
            ? { ...item, quantity: item.quantity + productData.quantity }
            : item
        );
      }
      
      return [...prevCart, { ...productData, cartId: Date.now() }];
    });
  };

  const removeFromCart = (cartId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.cartId === cartId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevCart.filter(item => item.cartId !== cartId);
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const itemTotal = item.totalPrice || (item.price * item.quantity);
      return total + itemTotal;
    }, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleFinishOrder = () => {
    if (cart.length === 0) return;

    // Montar mensagem do pedido
    let message = '*🍔 PEDIDO - LA CHAPA HAMBURGUERIA*\n\n';
    
    cart.forEach((item, index) => {
      message += `*${index + 1}. ${item.name}* (${item.quantity}x)\n`;
      message += `   💰 R$ ${(item.totalPrice || (item.price * item.quantity)).toFixed(2)}\n`;
      
      if (item.selectedAdditionals && item.selectedAdditionals.length > 0) {
        message += `   *Adicionais:*\n`;
        item.selectedAdditionals.forEach(additional => {
          message += `   • ${additional.name} (+R$ ${additional.price.toFixed(2)})\n`;
        });
      }
      
      if (item.observations) {
        message += `   📝 *Obs:* ${item.observations}\n`;
      }
      
      message += '\n';
    });
    
    message += `*TOTAL: R$ ${getCartTotal().toFixed(2)}*\n\n`;
    message += '_Aguardando confirmação do pedido!_';

    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Abrir WhatsApp
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (product) => {
    if (product.category === 'bebidas') {
      // Bebidas não têm adicionais, adicionar direto
      addToCart({ ...product, quantity: 1 });
    } else {
      setSelectedProduct(product);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#C41E3A] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logoImg} alt="La Chapa" className="h-19 w-19 object-contain" />
              <div>
                <h1 className="text-3xl font-bold">LA CHAPA</h1>
                <p className="text-sm text-white/90">Hamburgueria Artesanal</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {getCartItemCount() > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-yellow-400 text-black hover:bg-yellow-500">
                  {getCartItemCount()}
                </Badge>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white border-b sticky top-[88px] z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar na loja"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {categories.map(category => {
          const categoryProducts = filteredProducts.filter(p => p.category === category.id);
          
          if (categoryProducts.length === 0) return null;

          return (
            <section key={category.id} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{category.name}</h2>
              <div className="space-y-4">
                {categoryProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex gap-4"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-[#22c55e]">
                          R$ {product.price.toFixed(2)}
                        </span>
                        <Button
                          onClick={() => handleProductClick(product)}
                          className="bg-[#C41E3A] hover:bg-[#A01828] text-white"
                        >
                          Adicionar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {/* Product Dialog */}
      {selectedProduct && (
        <ProductDialog
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsCartOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-bold">Carrinho</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                    <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p>Seu carrinho está vazio</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.cartId} className="flex gap-4 bg-gray-50 p-3 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{item.name}</h3>
                          {item.selectedAdditionals && item.selectedAdditionals.length > 0 && (
                            <p className="text-xs text-gray-600 mt-1">
                              + {item.selectedAdditionals.map(a => a.name).join(', ')}
                            </p>
                          )}
                          {item.observations && (
                            <p className="text-xs text-gray-600 mt-1 italic">
                              Obs: {item.observations}
                            </p>
                          )}
                          <p className="text-[#22c55e] font-bold mt-1">
                            R$ {(item.totalPrice || (item.price * item.quantity)).toFixed(2)}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => removeFromCart(item.cartId)}
                              className="p-1 bg-white border rounded hover:bg-gray-100"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => addToCart({ ...item, quantity: 1 })}
                              className="p-1 bg-white border rounded hover:bg-gray-100"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t p-4 space-y-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#22c55e]">R$ {getCartTotal().toFixed(2)}</span>
                  </div>
                  <Button 
                    onClick={handleFinishOrder}
                    className="w-full bg-[#C41E3A] hover:bg-[#A01828] text-white py-6 text-lg"
                  >
                    Finalizar Pedido
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;


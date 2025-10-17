import { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Checkbox } from '@/components/ui/checkbox.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { additionals } from '../lib/menuData.js';

export function ProductDialog({ product, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedAdditionals, setSelectedAdditionals] = useState([]);
  const [observations, setObservations] = useState('');

  const toggleAdditional = (additionalId) => {
    setSelectedAdditionals(prev => {
      if (prev.includes(additionalId)) {
        return prev.filter(id => id !== additionalId);
      }
      return [...prev, additionalId];
    });
  };

  const calculateTotal = () => {
    const basePrice = product.price * quantity;
    const additionalsPrice = selectedAdditionals.reduce((total, id) => {
      const additional = additionals.find(a => a.id === id);
      return total + (additional ? additional.price * quantity : 0);
    }, 0);
    return basePrice + additionalsPrice;
  };

  const handleAddToCart = () => {
    const selectedAdditionalsData = selectedAdditionals.map(id => 
      additionals.find(a => a.id === id)
    );
    
    onAddToCart({
      ...product,
      quantity,
      selectedAdditionals: selectedAdditionalsData,
      observations,
      totalPrice: calculateTotal()
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-32 h-32 object-cover rounded-lg mb-4"
          />
          
          <p className="text-gray-600 mb-4">{product.description}</p>

          {product.category !== 'bebidas' && (
            <>
              <h3 className="text-lg font-semibold mb-3">Adicionais</h3>
              <div className="space-y-2 mb-6">
                {additionals.map(additional => (
                  <div key={additional.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
                    <Checkbox
                      id={additional.id}
                      checked={selectedAdditionals.includes(additional.id)}
                      onCheckedChange={() => toggleAdditional(additional.id)}
                    />
                    <label
                      htmlFor={additional.id}
                      className="flex-1 cursor-pointer text-sm"
                    >
                      {additional.name} - <span className="text-[#22c55e] font-semibold">R$ {additional.price.toFixed(2)}</span>
                    </label>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Observações</label>
            <Textarea
              placeholder="Ex: Sem cebola, molho à parte, etc."
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              className="w-full"
              rows={3}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Quantidade</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="text-xl font-bold w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold text-[#22c55e]">
              R$ {calculateTotal().toFixed(2)}
            </span>
          </div>

          <Button
            onClick={handleAddToCart}
            className="w-full bg-[#C41E3A] hover:bg-[#A01828] text-white py-6 text-lg"
          >
            Adicionar ao Carrinho
          </Button>
        </div>
      </div>
    </div>
  );
}


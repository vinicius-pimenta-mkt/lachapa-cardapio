import { useState } from 'react';
import { X, CreditCard, DollarSign, Smartphone, Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';

export function CheckoutDialog({ cart, totalPrice, onClose, onFinishOrder }) {
  const [formData, setFormData] = useState({
    clientName: '',
    street: '',
    neighborhood: '',
    number: '',
    reference: '',
  });

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [changeAmount, setChangeAmount] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
    if (method !== 'dinheiro') {
      setChangeAmount('');
    }
  };

  const isFormValid = () => {
    const addressComplete = formData.clientName && formData.street && formData.neighborhood && formData.number;
    const paymentSelected = paymentMethod !== null;
    const changeValid = paymentMethod === 'dinheiro' ? changeAmount !== '' : true;
    return addressComplete && paymentSelected && changeValid;
  };

  const handleFinishOrder = () => {
    if (!isFormValid()) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    onFinishOrder({
      address: formData,
      paymentMethod,
      changeAmount: paymentMethod === 'dinheiro' ? changeAmount : null
    });
  };

  const paymentMethods = [
    { id: 'pix', name: 'Pix', icon: Smartphone, color: 'bg-blue-100 border-blue-300' },
    { id: 'dinheiro', name: 'Dinheiro', icon: DollarSign, color: 'bg-green-100 border-green-300' },
    { id: 'debito', name: 'Débito', icon: CreditCard, color: 'bg-purple-100 border-purple-300' },
    { id: 'credito', name: 'Crédito', icon: Banknote, color: 'bg-orange-100 border-orange-300' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Finalizar Pedido</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Seção de Endereço */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Dados de Entrega</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Cliente *
                </label>
                <Input
                  type="text"
                  name="clientName"
                  placeholder="Seu nome completo"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rua *
                </label>
                <Input
                  type="text"
                  name="street"
                  placeholder="Nome da rua"
                  value={formData.street}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bairro *
                  </label>
                  <Input
                    type="text"
                    name="neighborhood"
                    placeholder="Bairro"
                    value={formData.neighborhood}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número *
                  </label>
                  <Input
                    type="text"
                    name="number"
                    placeholder="Número"
                    value={formData.number}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ponto de Referência
                </label>
                <Input
                  type="text"
                  name="reference"
                  placeholder="Ex: Próximo ao mercado"
                  value={formData.reference}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Seção de Forma de Pagamento */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Forma de Pagamento</h3>
            <div className="grid grid-cols-2 gap-3">
              {paymentMethods.map(method => {
                const IconComponent = method.icon;
                const isSelected = paymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => handlePaymentChange(method.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? `${method.color} border-current`
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 justify-center">
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={isSelected}
                        onChange={() => {}}
                        className="w-4 h-4"
                      />
                      <IconComponent className="h-5 w-5" />
                      <span className="font-medium text-sm">{method.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Campo de Troco para Dinheiro */}
          {paymentMethod === 'dinheiro' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor do Troco *
              </label>
              <Input
                type="number"
                placeholder="Ex: 100.00"
                value={changeAmount}
                onChange={(e) => setChangeAmount(e.target.value)}
                className="w-full"
                step="0.01"
                min="0"
              />
              <p className="text-xs text-gray-600 mt-2">
                Insira o valor em dinheiro que você pagará
              </p>
            </div>
          )}

          {/* Resumo do Pedido */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Resumo do Pedido</h4>
            <div className="space-y-2 text-sm mb-3 max-h-32 overflow-y-auto">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between text-gray-700">
                  <span>{item.name} x{item.quantity}</span>
                  <span>R$ {(item.totalPrice || (item.price * item.quantity)).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-[#22c55e]">R$ {totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Botão de Finalizar */}
          <Button
            onClick={handleFinishOrder}
            disabled={!isFormValid()}
            className="w-full bg-[#C41E3A] hover:bg-[#A01828] text-white py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Finalizar Pedido
          </Button>
        </div>
      </div>
    </div>
  );
}


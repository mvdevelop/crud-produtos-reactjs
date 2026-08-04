import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { ErrorBoundary, ErrorFallback } from './components/ErrorBoundary';
import { LoadingSpinner } from './components/LoadingSpinner';

import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

/**
 * Main Application Component
 *
 * This is the core component of the CRUD Products application.
 * Manages product state, handles API operations, and coordinates UI interactions.
 *
 * Key Features:
 * - Error boundaries for application stability
 * - Loading states with spinners
 * - Product CRUD operations (Create, Read, Update, Delete)
 * - Form validation and data management
 * - Responsive UI with modern React patterns
 *
 * @returns {JSX.Element} The main application interface
 */
function App() {

  // Initial product template
  const initialProduto: Produto = {
    codigo: 0,
    nome: '',
    marca: ''
  };

  // Component state management
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [btnCadastrar, setBtnCadastrar] = useState<boolean>(true);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [objProduto, setObjProduto] = useState<Produto>(initialProduto);

  /**
   * Fetch initial product data on component mount
   * Uses useEffect hook with empty dependency array for single execution
   */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8080/listar");
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /**
   * Handle form input changes
   * Updates product object with current input values
   *
   * @param {React.ChangeEvent} e - The input change event
   */
  const aoDigitar = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setObjProduto(prevProduto => ({
      ...prevProduto,
      [e.target.name]: e.target.value
    }));
  }, []);

  /**
   * Handle product submission
   * Sends new product data to the API and updates local state
   */
  const cadastrar = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8080/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(objProduto)
      });

      const data = await response.json();

      if (data.mensagem !== undefined) {
        alert(data.mensagem);
      } else {
        setProdutos(prevProdutos => [...prevProdutos, data]);
        alert('Produto cadastrado com sucesso!');
        limparFormulario();
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product. Please try again.');
    }
  }, [objProduto]);

  /**
   * Handle product deletion
   * Sends delete request to API and updates local state
   */
  const remover = useCallback(async () => {
    if (!objProduto.codigo) {
      alert('Please select a product to delete');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/remover/${objProduto.codigo}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const data = await response.json();
      alert(data.mensagem);

      // Remove product from local state
      setProdutos(prevProdutos =>
        prevProdutos.filter(product => product.codigo !== objProduto.codigo)
      );

      limparFormulario();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product. Please try again.');
    }
  }, [objProduto.codigo]);

  /**
   * Handle product update
   * Sends update request to API and updates local state
   */
  const alterar = useCallback(async () => {
    if (!objProduto.codigo) {
      alert('Please select a product to update');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/alterar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(objProduto)
      });

      const data = await response.json();

      if (data.mensagem !== undefined) {
        alert(data.mensagem);
      } else {
        alert('Produto alterado com sucesso!');

        // Update product in local state
        setProdutos(prevProdutos =>
          prevProdutos.map(product =>
            product.codigo === objProduto.codigo ? objProduto : product
          )
        );

        limparFormulario();
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product. Please try again.');
    }
  }, [objProduto]);

  /**
   * Reset form to initial state
   * Clears form data and switches to create mode
   */
  const limparFormulario = useCallback(() => {
    setObjProduto(initialProduto);
    setBtnCadastrar(true);
  }, []);

  /**
   * Handle product selection from table
   * Populates form with selected product data
   *
   * @param {number} indice - Index of selected product in the products array
   */
  const selecionarProduto = useCallback((indice: number) => {
    if (produtos[indice]) {
      setObjProduto(produtos[indice]);
      setBtnCadastrar(false);
    }
  }, [produtos]);

  return (
    <div className='p-2 app-container'>
      <header className='app-header'>
        <h2 className='text-center pt-4'>CRUD Produtos</h2>
      </header>

      <main className='app-main'>
        {isLoading && (
          <div className="text-center p-4">
            <LoadingSpinner text="Loading products..." size="large" />
          </div>
        )}

        {!isLoading && (
          <ErrorBoundary>
            <Formulario
              botao={btnCadastrar}
              eventoTeclado={aoDigitar}
              cadastrar={cadastrar}
              obj={objProduto}
              cancelar={limparFormulario}
              remover={remover}
              alterar={alterar}
            />
            <Tabela vetor={produtos} selecionar={selecionarProduto} />
          </ErrorBoundary>
        )}
      </main>
    </div>
  );
}

export default App;
export type { Produto };
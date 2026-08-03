
import React from 'react';

/**
 * Formulario Component
 *
 * A reusable form component for adding, editing, and deleting products
 * Provides different buttons based on whether in create or edit mode
 *
 * @param {boolean} botao - Determines if form is in create mode (true) or edit mode (false)
 * @param {function} eventoTeclado - Event handler for input changes
 * @param {function} cadastrar - Handler for product submission
 * @param {Object} obj - Product object containing form data (nome, marca)
 * @param {function} cancelar - Handler for cancel action
 * @param {function} remover - Handler for delete action
 * @param {function} alterar - Handler for update action
 * @returns {JSX.Element} Form component
 */
export default function Formulario({botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar}) {
  return (
    <form className="form-container">
        <div className="form-group">
            <input
                type="text"
                value={obj.nome}
                onChange={eventoTeclado}
                name='nome'
                placeholder='Nome'
                className='form-control'
                required
            />
        </div>
        <div className="form-group">
            <input
                type="text"
                value={obj.marca}
                onChange={eventoTeclado}
                name='marca'
                placeholder='Marca'
                className='form-control'
                required
            />
        </div>

        {
          botao
          ?
          <input type="button" value='Cadastrar' onClick={cadastrar} className='btn btn-primary btn-block' />
          :
          <div className="button-group">
            <input type="button" value='Alterar' onClick={alterar} className='btn btn-warning' />
            <input type="button" value='Remover' onClick={remover} className='btn btn-danger' />
            <input type="button" value='Cancelar' onClick={cancelar} className='btn btn-secondary' />
          </div>
        }
    </form>
  );
}

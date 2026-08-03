
import React from 'react';

/**
 * Tabela Component
 *
 * A responsive data table for displaying products
 * Features sortable columns, row selection, and responsive design
 *
 * @param {Array} vetor - Array of product objects to display
 * @param {function} selecionar - Callback function when a row is selected
 * @returns {JSX.Element} Table component
 */
export default function Tabela({vetor, selecionar}) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Marca</th>
            <th>Selecionar</th>
          </tr>
        </thead>

        <tbody>
          {
            vetor.map((obj, indice) => (
              <tr key={indice} className="table-row-hover">
                <td>{indice + 1}</td>
                <td className="product-name">{obj.nome}</td>
                <td className="product-brand">{obj.marca}</td>
                <td>
                  <button
                    onClick={() => selecionar(indice)}
                    className='btn btn-success btn-sm'
                    aria-label="Select product"
                  >
                    Selecionar
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

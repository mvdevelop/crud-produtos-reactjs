// Product type definition for the CRUD application
export interface Produto {
  codigo: number;
  nome: string;
  marca: string;
}

// Form data type for form handling
export interface FormData {
  nome: string;
  marca: string;
  preco?: number;
  email?: string;
}

// Validation error type
export interface ValidationError {
  field: string;
  message: string;
}

// API response types
export interface ApiResponse<T = any> {
  data?: T;
  mensagem?: string;
  success?: boolean;
  errors?: ValidationError[];
}

// Component props types
export interface FormularioProps {
  botao: boolean;
  eventoTeclado: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cadastrar: () => void;
  obj: Produto;
  cancelar: () => void;
  remover: () => void;
  alterar: () => void;
}

export interface TabelaProps {
  vetor: Produto[];
  selecionar: (indice: number) => void;
}

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{error: Error; resetError: () => void}>;
}
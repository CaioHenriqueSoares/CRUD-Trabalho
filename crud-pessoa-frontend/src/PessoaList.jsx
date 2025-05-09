import React, { useEffect, useState } from "react";
import axios from "axios";

function PessoaList() {
  const [pessoas, setPessoas] = useState([]);
  const [formData, setFormData] = useState({ nome: "", cpf: "", telefone: "" });
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:8080/pessoas";

  useEffect(() => {
    fetchPessoas();
  }, []);

  const fetchPessoas = () => {
    axios.get(API_URL).then((response) => {
      setPessoas(response.data);
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      axios.put(`${API_URL}/${editingId}`, formData).then(() => {
        fetchPessoas();
        setFormData({ nome: "", cpf: "", telefone: "" });
        setEditingId(null);
      });
    } else {
      axios.post(API_URL, formData).then(() => {
        fetchPessoas();
        setFormData({ nome: "", cpf: "", telefone: "" });
      });
    }
  };

  const handleEdit = (pessoa) => {
    setFormData({ nome: pessoa.nome, cpf: pessoa.cpf, telefone: pessoa.telefone });
    setEditingId(pessoa.id);
  };

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      fetchPessoas();
    });
  };

  return (
    <div>
      <h2>Cadastro de Pessoas</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <input
          name="cpf"
          placeholder="CPF"
          value={formData.cpf}
          onChange={handleChange}
          required
        />
        <input
          name="telefone"
          placeholder="Telefone"
          value={formData.telefone}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? "Atualizar" : "Salvar"}</button>
      </form>

      <h3>Lista de Pessoas</h3>
      <ul>
        {pessoas.map((p) => (
          <li key={p.id}>
            {p.nome} | {p.cpf} | {p.telefone}
            <button onClick={() => handleEdit(p)}>Editar</button>
            <button onClick={() => handleDelete(p.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PessoaList;
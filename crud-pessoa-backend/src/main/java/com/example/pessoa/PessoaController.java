package com.example.pessoa;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/pessoas")
public class PessoaController {

    @Autowired
    private PessoaRepositorio repo;

    @GetMapping
    public List<Pessoa> listar() {
        return repo.findAll();
    }

    @PostMapping
    public Pessoa salvar(@RequestBody Pessoa pessoa) {
        return repo.save(pessoa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pessoa> atualizar(@PathVariable Long id, @RequestBody Pessoa pessoa) {
    if (!repo.existsById(id)) {
        return ResponseEntity.notFound().build();
    }
    pessoa.setId(id);
    return ResponseEntity.ok(repo.save(pessoa));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
    if (!repo.existsById(id)) {
        return ResponseEntity.notFound().build();
    }
    repo.deleteById(id);
    return ResponseEntity.noContent().build();
    }

}

package com.juanchiriera.mkd.mdbackend.repository;

import com.juanchiriera.mkd.mdbackend.model.MarkdownFile;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MarkdownFileRepository extends MongoRepository<MarkdownFile, Integer> {
    public MarkdownFile findByName(String nombre);

}

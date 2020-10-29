package com.juanchiriera.mkd.mdbackend;

import com.juanchiriera.mkd.mdbackend.model.MarkdownFile;
import com.juanchiriera.mkd.mdbackend.repository.MarkdownFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("/api")
public class AppController {
    @Autowired
    MarkdownFileRepository markdownFileRepository;

    @PostMapping("/markdownFile")
    public ResponseEntity<String> createFile(@RequestBody MarkdownFile file){
        markdownFileRepository.save(file);
        return ResponseEntity.ok("Saved successfully!");
    }

    @GetMapping("/markdownFile/{fileName}")
    public ResponseEntity<MarkdownFile> getFile(@PathVariable String fileName){
        MarkdownFile markdownFile = markdownFileRepository.findByName(fileName);
        return ResponseEntity.ok().body(markdownFile);
    }

    @GetMapping("/markdownFiles")
    public ResponseEntity<List<MarkdownFile>> getFiles(){
        List markdownFiles = markdownFileRepository.findAll();
        return ResponseEntity.ok().body(markdownFiles);
    }

    @DeleteMapping("/markdownFile/{fileName}")
    public ResponseEntity<String> deleteFile(@PathVariable String fileName){
        markdownFileRepository.delete(markdownFileRepository.findByName(fileName));
        return ResponseEntity.ok("Deleted successfully!");
    }
}

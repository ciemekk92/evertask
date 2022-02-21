package com.predu.evertask.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface BaseRepository<T, I> {

    Optional<T> findById(I id);

    List<T> findAll();

    Page<T> findAll(Pageable page);

    boolean existsById(I id);

    T save(T entity);

    void delete(T entity);

    void deleteById(I id);
}

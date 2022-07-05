package com.predu.evertask.service;

import com.predu.evertask.domain.model.Image;
import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.repository.ImageRepository;
import com.predu.evertask.util.ImageCompressor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ImageService {

    private final ImageRepository imageRepository;

    public Image findById(UUID id) {
        Image compressedImage = imageRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException(Image.class, id));

        Image decompressedImage = new Image();
        decompressedImage.setName(compressedImage.getName());
        decompressedImage.setType(compressedImage.getType());
        decompressedImage.setPicByte(ImageCompressor.decompressBytes(compressedImage.getPicByte()));

        return decompressedImage;
    }

    public Image findByName(String name) {
        Image compressedImage = imageRepository
                .findByName(name)
                .orElseThrow(() -> new NotFoundException(Image.class, name));

        Image decompressedImage = new Image();
        decompressedImage.setName(compressedImage.getName());
        decompressedImage.setType(compressedImage.getType());
        decompressedImage.setPicByte(ImageCompressor.decompressBytes(compressedImage.getPicByte()));

        return decompressedImage;
    }

    public Image saveImage(MultipartFile file) throws IOException {
        Image image = new Image();
        image.setName(file.getOriginalFilename());
        image.setType(file.getContentType());
        image.setPicByte(ImageCompressor.compressBytes(file.getBytes()));

        return imageRepository.save(image);
    }
}

package com.predu.evertask.util;

import org.apache.commons.io.FileUtils;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;

class ImageUtilTest {

    @Test
    void base64StringConversionTest() throws IOException {

        String outputFilePath = "test_image_copy.png";
        String inputFilePath = "test_image.png";
        ClassLoader classLoader = getClass().getClassLoader();

        File inputFile = new File(Objects
                .requireNonNull(classLoader
                        .getResource(inputFilePath))
                .getFile());

        byte[] fileContent = FileUtils.readFileToByteArray(inputFile);

        String encodedString = ImageUtil.toBase64(fileContent);

        File outputFile = new File(inputFile
                .getParentFile()
                .getAbsolutePath() + File.pathSeparator + outputFilePath);

        byte[] decodedBytes = ImageUtil.fromBase64(encodedString);

        FileUtils.writeByteArrayToFile(outputFile, decodedBytes);

        assertTrue(FileUtils.contentEquals(inputFile, outputFile));
    }
}
package com.example.students_management.model;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeParseException;

@Entity
@Table(name="student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, name ="name")
    private String name;

    @Column(nullable = false, name ="dateOfBirth")
    private String dateOfBirth;

    public Student(Long id, String name, String dateOfBirth) {
        this.id = id;
        this.name = name;
        //this.dateOfBirth = dateOfBirth;
        try {
            LocalDate dob = LocalDate.parse(dateOfBirth);
            LocalDate now = LocalDate.now();
            Period age = Period.between(dob, now);
            if (dob.isAfter(now) || age.getYears() < 10) {
                throw new IllegalArgumentException("Invalid date of birth or age");
            }
            this.dateOfBirth = dateOfBirth;
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Invalid date format");
        }
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    @ManyToOne
    @JoinColumn(name="university_class_id")
    private UniversityClass universityClass;

    public Student(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public UniversityClass getUniversityClass() {
        return universityClass;
    }

    public void setUniversityClass(UniversityClass universityClass) {
        this.universityClass = universityClass;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        String str = "";
        str += "Primary ID:" + getId();
        str += "Name:" + getName();
        return str;
    }
}

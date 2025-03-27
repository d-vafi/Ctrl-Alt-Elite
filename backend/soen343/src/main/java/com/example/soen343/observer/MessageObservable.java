package com.example.soen343.observer;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

@Service
public final class MessageObservable {
    private ArrayList<Observer> observers = new ArrayList<>();

    public void addObserver(Observer observer) {
        if (!observers.contains(observer)) {
            observers.add(observer);
        }
    }

    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    public void notifyObservers(Object data) {
        for (Observer observer : observers) {
            observer.update(data);
        }
    }
}

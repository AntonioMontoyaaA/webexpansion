package com.tiendas.neto.vo;

import java.io.Serializable;

public class MensajeVo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String to;
	private int status;
	private float network;
	/**
	 * @return the to
	 */
	public String getTo() {
		return to;
	}
	/**
	 * @param to the to to set
	 */
	public void setTo(String to) {
		this.to = to;
	}
	/**
	 * @return the status
	 */
	public int getStatus() {
		return status;
	}
	/**
	 * @param status the status to set
	 */
	public void setStatus(int status) {
		this.status = status;
	}
	/**
	 * @return the network
	 */
	public float getNetwork() {
		return network;
	}
	/**
	 * @param network the network to set
	 */
	public void setNetwork(float network) {
		this.network = network;
	}
	
	
}
